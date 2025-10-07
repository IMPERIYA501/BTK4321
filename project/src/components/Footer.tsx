import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">БТК</span>
              </div>
              <span className="text-xl font-bold text-white">БТК</span>
            </div>
            <p className="text-gray-400 mb-6">
              Бишкекский Технический Колледж - ведущее учебное заведение, готовящее квалифицированных специалистов для современной экономики.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              Copyright © «Бишкекский Технический Колледж»
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;