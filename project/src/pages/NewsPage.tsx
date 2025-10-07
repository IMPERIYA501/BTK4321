import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { newsItems } from '../components/News';
import VideoPlayer from '../components/VideoPlayer';

const NewsPage: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.slice(1);

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });


          const video = el.querySelector('video') as HTMLVideoElement | null;
          if (video) {
            try {

              const prevMuted = video.muted;
              video.muted = true;
              const p = video.play();
              if (p && typeof p.then === 'function') {
                p.then(() => {

                }).catch(() => {

                  video.muted = prevMuted;
                });
              } else {

                video.muted = prevMuted;
              }
            } catch {

            }
          }
        }
      }, 200);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-700 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-8 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">Все новости</h1>

        <div className="space-y-6">
          {newsItems.map(item => {
            
            const hasVideo =
              (Array.isArray((item as any).videoSources) && (item as any).videoSources.length > 0);

            return (
              <article
                
                id={`news-${item.id}`} 
                key={item.id}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <h2 className="text-xl md:text-2xl font-semibold">{item.title}</h2>
                  <time className="text-sm text-blue-100">
                    {new Date((item as any).datetime || (item as any).date).toLocaleString('ru-RU', {
                      dateStyle: 'long',
                      timeStyle: 'short'
                    })}
                  </time>
                </div>

                {}
                {hasVideo ? (
                  <div className="mt-4">
                    <VideoPlayer
                      sources={(item as any).videoSources}
                      videoUrl={(item as any).videoUrl} 
                      poster={item.image}
                    />
                  </div>
                ) : (
                    
                    <div className="mt-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                )}

                <p className="mt-3 text-blue-100/90">{item.summary}</p>

                <div className="mt-4 flex items-center justify-between text-sm text-blue-100/80">
                  <div>Автор: <span className="font-medium">{item.author}</span></div>
                  <div className="hidden sm:block">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-sm">{item.category}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default NewsPage;