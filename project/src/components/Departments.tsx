import React from 'react';
import { BookOpen, Cpu, Wrench, MapPin } from 'lucide-react';

interface DepartmentsProps {
  top?: boolean;
}

const Departments: React.FC<DepartmentsProps> = ({ top = false }) => {
  const departments = [
    {
      icon: BookOpen,
      title: 'Отделение общеобразовательных дисциплин',
      slug: 'obsh',
      color: 'bg-blue-500'
    },
    {
      icon: Cpu,
      title: 'Отделение информационных технологий',
      slug: 'it',
      
      color: 'bg-green-500'
    },
    {
      icon: Wrench,
      title: 'Отделение технических дисциплин',
      slug: 'technical',
      
      color: 'bg-purple-500'
    },
    {
      icon: MapPin,
      title: 'Балыкчинское отделение',
      slug: 'balykchy',
      
      color: 'bg-orange-500'
    }
  ];

  if (typeof window !== 'undefined') {
    
    console.log('Departments mounted, items:', departments.length);
  }

  return (
    <div
      id="departments"
      data-section-priority={top ? 'top' : 'default'}
      className={`py-20 bg-gray-50 ${top ? 'priority-top' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Отделения колледжа
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите направление, которое поможет вам построить успешную карьеру
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => {
            
            const Icon = dept.icon as React.ComponentType<any>;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
              >
                
                <div className={`${dept.color} p-6 text-white`}>
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dept.title}</h3>
                </div>
                
                <div className="p-6">
                  
                  {Array.isArray(dept.features) && dept.features.length > 0 && (
                    <ul className="space-y-2">
                      {dept.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className={`inline-block w-2 h-2 ${dept.color} rounded-full mr-3 flex-shrink-0`} />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {dept.slug === 'obsh' ? (
                    <a
                      href="/src/department/generaleducation/obsh.html"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        window.location.href = "/src/department/generaleducation/obsh.html";
                      }}
                      className="w-full inline-block mt-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg text-center transition-all duration-300"
                    >
                      Подробнее
                    </a>
                  ) : dept.slug === 'it' ? (
                    <a
                      href="/src/department/informational/it.html"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        window.location.href = "/src/department/informational/it.html";
                      }}
                      className="w-full inline-block mt-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg text-center transition-all duration-300"
                    >
                      Подробнее
                    </a>
                  ) : dept.slug === 'technical' ? (
                    <a
                      href="/src/department/technical/technical.html"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        window.location.href = "/src/department/technical/technical.html";
                      }}
                      className="w-full inline-block mt-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg text-center transition-all duration-300"
                    >
                      Подробнее
                    </a>
                  ) : dept.slug === 'balykchy' ? (
                    <a
                      href="/src/department/balykchinskoe/balykchy.html"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        window.location.href = "/src/department/balykchinskoe/balykchy.html";
                      }}
                      className="w-full inline-block mt-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg text-center transition-all duration-300"
                    >
                      Подробнее
                    </a>
                  ) : (
                    <a
                      href={`/src/department/${dept.slug}/${dept.slug}.html`}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        window.location.href = `/src/department/${dept.slug}/${dept.slug}.html`;
                      }}
                      className="w-full inline-block mt-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg text-center transition-all duration-300"
                    >
                      Подробнее
                    </a>
                  )}
                </div>
              </div>
            );
          })}
         </div>
       </div>
     </div>
   );
 };
 
 export default Departments;