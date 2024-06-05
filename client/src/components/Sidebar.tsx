import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <div>
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform lg:transform-none transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} h-full lg:h-screen`}>
        <div className="p-4 font-bold text-lg border-b border-gray-700">Учет визитов</div>
        <ul className="p-4 space-y-2">
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>Панель управления</Link>
          </li>
          {user?.roleId == 1 && (
            <li>
              <Link to="/visits" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>Визиты</Link>
            </li>
          )}
          
          <li>
            <Link to="/clinics" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>Клиники</Link>
          </li>
          <li>
            <Link to="/contacts" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>Контактные лица</Link>
          </li>
          {user?.roleId == 2 && (
            <>
              <li>
                <Link to="/employees" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>Сотрудники</Link>
              </li>
              <li>
                <Link to="/reports" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>Отчеты</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
