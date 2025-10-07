import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contacts: React.FC = () => {
  return (
    <section id="contacts" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Контакты
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Свяжитесь с нами для получения консультации 
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-orange-400">Контактная информация</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Адрес</h4>
                  <p className="text-gray-300">г. Бишкек, ул. Чуй 215</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Телефон</h4>
                  <p className="text-gray-300">0 (312) 61-09-42</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-300">info@btk.kg</p>
                  <p className="text-gray-300">admissions@btk.kg</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Режим работы</h4>
                  <p className="text-gray-300">Пн-Пт: 8:00 - 17:00</p>
                  <p className="text-gray-300">Сб: Выходной</p>
                  <p className="text-gray-300">Вс: Выходной</p>
                </div>
              </div>
            </div>

            {}
            {}
          </div>

          {}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-orange-400">Отправить сообщение</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    placeholder="Ваша фамилия"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="+996 (555) 123-456"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Тема
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                >
                  <option>Поступление</option>
                  <option>Общие вопросы</option>
                  <option>Техническая поддержка</option>
                  <option>Другое</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Ваше сообщение..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;