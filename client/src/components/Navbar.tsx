import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="lg:hidden">
        <button onClick={() => setSidebarOpen(true)} className="text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div>
        <a href="/" className="font-bold">Учет визитов</a>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Привет, {user.firstName}</span>
            <button onClick={logout} className="bg-red-500 p-2 rounded">Выйти</button>
          </>
        ) : (
          <a href="/login" className="bg-blue-500 p-2 rounded">Войти</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
