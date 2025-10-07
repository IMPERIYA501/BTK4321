import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogIn, UserPlus, BookOpen, Cpu, Wrench, MapPin } from 'lucide-react';
import emblem from '../assets/emblem-kyrgyzstan.svg';
import logo from '../assets/logo-04.svg';


type DropdownItem = string | {
  title: string;
  href?: string;
  description?: string;
  icon?: React.ElementType;
};
type MenuItem = {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
};

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);

  
  const navRef = useRef<HTMLElement | null>(null);
  
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const menuItems: MenuItem[] = [
    { name: 'Главная', href: '/' },
    { 
      name: 'О колледже', 
      href: '#about',
      dropdown: [
        'История',
        'Паспорт колледжа',
        'Структура',
        'Противодействие коррупции',
        'Наши достижения',
        'Сотрудничество'
      ]
    },
    { 
      name: 'Учебный процесс', 
      href: '#education',
      dropdown: [
        'Учебные кабинеты',
        'График учебного процесса',
        'Учебный план',
        'Расписание учебных занятий',
        'ГАК (Государственная аттестационная комиссия)',
        'Нормативные документы',
        'Электронная библиотека',
        'Новости'
      ]
    },
    { 
      name: 'Отделения', 
      href: '#departments',
      
      dropdown: [
        { 
          title: 'Отделение общеобразовательных дисциплин',
          href: '/src/department/generaleducation/obsh.html',
          description: 'Курсы по математике, языкам и естественным наукам для укрепления общей академической подготовки.',
          icon: BookOpen
        },
        { 
          title: 'Отделение информационных технологий',
          href: '/src/department/informational/it.html',
          description: 'Подготовка специалистов по программированию, веб‑разработке, сетям и информационной безопасности.',
          icon: Cpu
        },
        { 
          title: 'Отделение технических дисциплин',
          href: '/src/department/technical/technical.html',
          description: 'Обучение по механике, электротехнике, обслуживанию и наладке промышленного оборудования.',
          icon: Wrench
        },
        { 
          title: 'Балыкчинское отделение',
          href: '/src/department/balykchinskoe/balykchy.html',
          description: 'Филиал в г. Балыкчы с практическим уклоном и местными производственными стажировками.',
          icon: MapPin
        }
      ]
    },
    { 
      name: 'Специальности', 
      href: '#specialties',
      dropdown: [
        'Техническое обслуживание средств вычислительной техники и компьютерных сетей',
        'Программная инженерия',
        'Программирование в компьютерных системах',
        'Информационная безопасность автоматизированных систем',
        'Экология и энергетическая эффективность',
        'Эксплуатация транспортного электрооборудования и автоматики (по видам транспорта, за исключением водного)',
        'Строительство железных дорог, путь и путевое хозяйство',
        'Организация перевозок и управление на транспорте (по видам транспорта за исключением воздушного транспорта)',
        'Техническая эксплуатация подвижного состава железных дорог',
        'Технология машиностроения',
        'Программное обеспечение вычислительной техники и автоматизированных систем'
      ]
    },
    { 
      name: 'Абитуриентам', 
      href: '#applicants',
      dropdown: [
        'Приём 2025',
        'Буклеты и баннеры',
        'Видеоролики',
        'Дистанционное обучение AVN',
        'Анкетирование'
      ]
    },
    { 
      name: 'Студентам', 
      href: '#students',
      dropdown: [
        'Выпускникам',
        'Студенческий совет'
      ]
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
    setClickedDropdown(null);
  };

  const handleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleLoginClick = () => {
    console.log('Header: Login button clicked');
    onLoginClick();
  };

  const handleRegisterClick = () => {
    console.log('Header: Register button clicked');
    onRegisterClick();
  };

  
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        if (activeDropdown || clickedDropdown) {
          setActiveDropdown(null);
          setClickedDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [activeDropdown, clickedDropdown]);

  return (
    <>
      
      <div className="bg-blue-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              
              <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <img 
                  src={emblem}
                  alt="Эмблема Кыргызстана" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              
              <div className="text-center">
                <h1 className="text-xl md:text-2xl font-bold">
                  Бишкекский Технический Колледж
                </h1>
                <p className="text-sm md:text-base mt-1 text-white/90">
                  Кыргызского государственного технического университета им. И. Раззакова
                </p>
              </div>
              
              
              <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <img
                  src={logo}
                  alt="Логотип БТК"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <header className="bg-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex-shrink-0 flex items-center lg:hidden">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">БТК</span>
              </div>
            </div>

            
            <nav ref={navRef} className="hidden lg:flex items-center space-x-8 flex-1">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseOver={(e) => {
                    
                    if (closeTimeoutRef.current) {
                      window.clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                    if (item.dropdown) {
                      setActiveDropdown(item.name);
                    }
                  }}
                  onMouseOut={(e: React.MouseEvent) => {
                     
                     const related = e.relatedTarget as Node | null;
                     
                     if (related && (e.currentTarget as HTMLElement).contains(related)) {
                       return;
                     }
                     
                     if (clickedDropdown !== item.name) {
                      if (closeTimeoutRef.current) {
                        window.clearTimeout(closeTimeoutRef.current);
                      }
                      
                      closeTimeoutRef.current = window.setTimeout(() => {
                        setActiveDropdown(null);
                        closeTimeoutRef.current = null;
                      }, 300);
                     }
                   }}
                 >
                   <button
                     onClick={(e) => {
                       if (item.dropdown) {
                         e.preventDefault();
                         
                        if (clickedDropdown === item.name) {
                          
                          if (closeTimeoutRef.current) {
                            window.clearTimeout(closeTimeoutRef.current);
                            closeTimeoutRef.current = null;
                          }
                          setClickedDropdown(null);
                          setActiveDropdown(null);
                        } else {
                          if (closeTimeoutRef.current) {
                            window.clearTimeout(closeTimeoutRef.current);
                            closeTimeoutRef.current = null;
                          }
                          setClickedDropdown(item.name);
                          setActiveDropdown(item.name);
                        }
                       }
                     }}
                     aria-haspopup={!!item.dropdown}
                     aria-expanded={activeDropdown === item.name}
                     className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 cursor-pointer"
                   >
                     <span className="whitespace-nowrap select-none">{item.name}</span>
                     {item.dropdown && (
                       <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-blue-600' : ''}`} />
                     )}
                   </button>
 
                   
                   {item.dropdown && (
                     <div
                       className={`absolute top-full left-0 mt-1 min-w-[220px] max-w-sm w-auto bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto transform transition-all duration-200 origin-top ${
                         activeDropdown === item.name
                           ? 'opacity-100 translate-y-0 pointer-events-auto'
                           : 'opacity-0 translate-y-2 pointer-events-none'
                       }`}
                     >
                       
                       <div className="divide-y divide-gray-200">
                         {item.dropdown.map((subItem: DropdownItem) => {
                           if (typeof subItem === 'string') {
                             return (
                               <a
                                 key={subItem}
                                 href="#"
                                 className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 break-words"
                               >
                                 {subItem}
                               </a>
                             );
                           }
                           const Icon = subItem.icon as React.ElementType | undefined;
                           return (
                             <a
                               key={subItem.title}
                               href={subItem.href || '#'}
                               className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                             >
                               <div className="mr-3 mt-1">
                                 {Icon ? <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" /> : null}
                               </div>
                               <div className="min-w-0">
                                 <div className="font-medium text-gray-800">{subItem.title}</div>
                                 {}
                                 {item.name !== 'Отделения' && subItem.description ? (
                                   <div className="text-xs text-gray-500 mt-1 max-w-xs">{subItem.description}</div>
                                 ) : null}
                               </div>
                             </a>
                           );
                         })}
                       </div>
                     </div>
                   )}
                 </div>
               ))}
             </nav>
            
            
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        
        <div className="hidden md:flex justify-center border-t border-gray-100 bg-white py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>Войти</span>
            </button>
            <button
              onClick={handleRegisterClick}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <UserPlus className="w-4 h-4" />
              <span>Регистрация</span>
            </button>
          </div>
        </div>

        
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <nav className="py-4 max-h-screen overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.name}>
                <button
                  className="w-full flex items-center justify-between px-6 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => item.dropdown ? handleDropdown(item.name) : undefined}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                
                {item.dropdown && activeDropdown === item.name && (
                  <div className="bg-gray-50 border-l-4 border-blue-600">
                    {item.dropdown.map((subItem: DropdownItem) => {
                      if (typeof subItem === 'string') {
                        return (
                          <a
                            key={subItem}
                            href="#"
                            className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            {subItem}
                          </a>
                        );
                      }
                      const Icon = subItem.icon as React.ElementType | undefined;
                      return (
                        <a
                          key={subItem.title}
                          href={subItem.href || '#'}
                          className="flex items-start px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          <div className="mr-3 mt-1">
                            {Icon ? <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" /> : null}
                          </div>
                          <div>
                            <div className="font-medium">{subItem.title}</div>
                            
                            {item.name !== 'Отделения' && subItem.description ? (
                              <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                            ) : null}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            
            
            <div className="px-6 py-4 border-t border-gray-200 mt-4 space-y-2">
              <button
                onClick={handleLoginClick}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Войти</span>
              </button>
              <button
                onClick={handleRegisterClick}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <UserPlus className="w-4 h-4" />
                <span>Регистрация</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;