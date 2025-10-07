import React from 'react';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Студентов', value: '2,500+' },
    { icon: GraduationCap, label: 'Выпускников', value: '15,000+' },
    { icon: BookOpen, label: 'Специальностей', value: '25+' },
    { icon: Award, label: 'Лет опыта', value: '30+' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-6 w-48 h-48 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-36 right-6 w-48 h-48 md:w-72 md:h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-16 left-10 w-48 h-48 md:w-72 md:h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Бишкекский Технический Колледж
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            Качественное образование, современные технологии и успешное будущее для каждого студента
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Подать заявление
            </button>
            {}
            <a
              href="/news"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Все новости
            </a>
          </div>

          {}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-orange-400" />
                <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;