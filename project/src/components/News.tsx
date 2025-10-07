import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';


const itCenterImage = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800';

export const newsItems = [
	{
		id: 1,
		title: 'Открытие нового IT-центра',
		summary: 'В колледже открылся современный центр информационных технологий с новейшим оборудованием',
		datetime: '2025-01-15T10:30:00',
		author: 'Администрация БТК',
		image: '/src/assets/media/images/it-center.jpg', 
		category: 'Новости',
		videoSources: [
			{ src: '/assets/videos/it-center-144p.mp4', label: '144p' },
			{ src: '/assets/videos/it-center-240p.mp4', label: '240p' },
			{ src: '/assets/videos/it-center-360p.mp4', label: '360p' },
			{ src: '/assets/videos/it-center-480p.mp4', label: '480p' },
			{ src: '/assets/videos/it-center-720p.mp4', label: '720p' },
			{ src: '/assets/videos/it-center-1080p.mp4', label: '1080p' },
			{ src: '/assets/videos/it-center-1440p.mp4', label: '1440p' },
			{ src: '/assets/videos/it-center-2160p.mp4', label: '2160p' }
		]
	},
	{
		id: 2,
		title: 'Студенты БТК заняли первое место',
		summary: 'Команда студентов колледжа победила в республиканском конкурсе по программированию',
		datetime: '2025-01-10T14:00:00',
		author: 'Пресс-служба',
		image: '/assets/media/images/contest-winners.jpg', 
		category: 'Достижения',
		videoSources: [] // ПУСТОЙ МАССИВ: Нет видео
	},
	{
		id: 3,
		title: 'Новые специальности 2025',
		summary: 'С нового учебного года открываются специальности по кибербезопасности и Data Science',
		datetime: '2025-01-08T11:00:00',
		author: 'Учебная часть',
		image: '/assets/media/images/data-science.jpg', 
		category: 'Образование',
		videoSources: [] // ПУСТОЙ МАССИВ: Нет видео
	}
];

const getCategoryColor = (category: string) => {
	switch (category) {
		case 'Новости': return 'bg-blue-100 text-blue-800';
		case 'Достижения': return 'bg-green-100 text-green-800';
		case 'Образование': return 'bg-purple-100 text-purple-800';
		default: return 'bg-gray-100 text-gray-800';
	}
};


const News: React.FC = () => {
	const items = newsItems;

	return (
		<>
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Новости и события
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Следите за последними новостями и событиями из жизни колледжа
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{items.map((item) => {
							// КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: hasVideo строго проверяет, что item.videoSources является массивом и его длина > 0
							const hasVideo = Array.isArray(item.videoSources) && item.videoSources.length > 0;

							return (
								<article
									key={item.id}
									className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
								>
									<div className="relative overflow-hidden">
										<img
											src={item.image}
											alt={item.title}
											className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
										/>

										{/* ИКОНКА ВОСПРОИЗВЕДЕНИЯ ПОЯВЛЯЕТСЯ ТОЛЬКО ЕСЛИ hasVideo === true */}
										{hasVideo ? (
											<a
												href={`/news#news-${item.id}`}
												className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
												aria-label={`Открыть видео: ${item.title}`}
											>
												<svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
													<path d="M8 5v14l11-7z" />
												</svg>
											</a>
										) : null}

										<div className="absolute top-4 left-4">
											<span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
												{item.category}
											</span>
										</div>
									</div>

									<div className="p-6">
										<h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
											{item.title}
										</h3>
										<p className="text-gray-600 mb-4 line-clamp-3">
											{item.summary}
										</p>

										<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
											<div className="flex items-center space-x-4">
												<div className="flex items-center">
													<Calendar className="w-4 h-4 mr-1" />
													{new Date(item.datetime).toLocaleString('ru-RU', {
														dateStyle: 'long',
														timeStyle: 'short'
													})}
												</div>
												<div className="flex items-center">
													<User className="w-4 h-4 mr-1" />
													{item.author}
												</div>
											</div>
										</div>

										<button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group">
											Читать далее
											<ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-200 group-hover:translate-x-1" />
										</button>
									</div>
								</article>
							);
						})}
					</div>
					<div className="text-center mt-12">
						<a
							href="/news"
							className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
						>
							Все новости
						</a>
					</div>
				</div>
			</section>
		</>
	);
};

export default News;