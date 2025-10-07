import React, { useRef, useState, useEffect } from 'react';


const isVideoExtension = (url?: string) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|m3u8|mpd|mov|mkv)(\?.*)?$/i.test(url);
};
const isImageExtension = (url?: string) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(jpe?g|png|gif|svg|webp|bmp)(\?.*)?$/i.test(url);
};


type Source = { src: string; label: string; resolution?: string };

type Props = {
  sources?: Source[];
  videoUrl?: string; 
  poster?: string;
  className?: string;
};

const VideoPlayer: React.FC<Props> = ({ sources, videoUrl, poster, className }) => {
  
  const rawSources: Source[] = (sources && sources.length > 0)
    ? sources
    : (videoUrl ? [{ src: videoUrl, label: 'Авто' }] : []);

  
  const videoSources = rawSources.filter(s => isVideoExtension(s.src) && !isImageExtension(s.src));

  
  // *** ГЛАВНАЯ ПРОВЕРКА: Если нет источников, то ничего не рендерим. ***
  // Возвращаем null без всяких оберток!
  if (!videoSources || videoSources.length === 0) {
    return null;
  }

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [qualityOpen, setQualityOpen] = useState(false);
  const qualityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (qualityRef.current && !qualityRef.current.contains(e.target as Node)) {
        setQualityOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick); 
  }, []);

  
  const switchQuality = (index: number) => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const wasPaused = video.paused;
    const currentTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;

    const newSrc = videoSources[index].src;
    setCurrentIndex(index);

    const onLoaded = () => {
      try {
        const duration = Number.isFinite(video.duration) ? video.duration : Infinity;
        video.currentTime = Math.min(currentTime, duration);
      } catch {}
      video.removeEventListener('loadedmetadata', onLoaded);
      if (!wasPaused) video.play().catch(() => {});
    };

    video.removeEventListener('loadedmetadata', onLoaded);
    video.addEventListener('loadedmetadata', onLoaded);

    try {
      video.pause();
      video.src = newSrc;
      video.load();
    } catch {}
  };

  
  const seek = (seconds: number) => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const duration = Number.isFinite(v.duration) ? v.duration : Infinity;
    const curr = Number.isFinite(v.currentTime) ? v.currentTime : 0;
    const target = Math.max(0, Math.min(duration, curr + seconds));
    try {
      v.currentTime = target;
    } catch {
      const onLoaded = () => {
        try { v.currentTime = target; } catch {}
        v.removeEventListener('loadedmetadata', onLoaded);
      };
      v.addEventListener('loadedmetadata', onLoaded);
    }
  };

  return (
    <div className={`w-full bg-black rounded-lg overflow-hidden ${className || ''}`}>
      <div className="relative">
        <video
          ref={videoRef}
          src={videoSources[currentIndex].src}
          poster={poster}
          controls
          className="w-full h-auto bg-black"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/60 rounded-md p-1">
          <div ref={qualityRef} className="relative">
            {}
            <button
              onClick={(e) => { e.stopPropagation(); setQualityOpen((s) => !s); }}
              className="flex items-center gap-2 px-3 py-1 bg-white/6 hover:bg-white/10 text-white text-sm rounded"
              aria-haspopup="true"
              aria-expanded={qualityOpen}
              title="Качество"
            >
              <span className="whitespace-nowrap">{videoSources[currentIndex].label}</span>
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
              </svg>
            </button>

            {qualityOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black/90 border border-white/10 rounded shadow-lg z-50">
                {videoSources.map((s, i) => (
                  <button
                    key={i}
                    onClick={(ev) => { ev.stopPropagation(); setQualityOpen(false); switchQuality(i); }}
                    className={`w-full text-left px-3 py-2 text-sm ${i === currentIndex ? 'bg-white/10' : 'hover:bg-white/5'} text-white`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {}
          <button
            onClick={() => { setIsMuted((m) => !m); if (videoRef.current) videoRef.current.muted = !isMuted; }}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${isMuted ? 'bg-white/8' : 'bg-white/12'} hover:bg-white/20`}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            aria-pressed={isMuted}
          >
            {isMuted ? (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9.5a6 6 0 010 5" stroke="currentColor" />
                <path d="M5 9v6h4l5 4V5L9 9H5z" stroke="currentColor" />
                <line x1="23" y1="1" x2="1" y2="23" stroke="currentColor" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 9v6h4l5 4V5L9 9H5z" stroke="currentColor" />
                <path d="M19 8a6 6 0 010 8" stroke="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-black/40">
        <button onClick={() => seek(-1)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">-1s</button>
        <button onClick={() => seek(-5)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">-5s</button>
        <button onClick={() => seek(-10)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">-10s</button>

        <button onClick={() => seek(1)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">+1s</button>
        <button onClick={() => seek(5)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">+5s</button>
        <button onClick={() => seek(10)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">+10s</button>

        <button onClick={() => seek(-60)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">-1m</button>
        <button onClick={() => seek(-300)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">-5m</button>
        <button onClick={() => seek(-600)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">-10m</button>

        <button onClick={() => seek(60)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">+1m</button>
        <button onClick={() => seek(300)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">+5m</button>
        <button onClick={() => seek(600)} className="px-3 py-1 rounded bg-white/10 text-sm text-white">+10m</button>

        <div className="ml-auto text-xs text-white/80">Качество: {videoSources[currentIndex].label}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;