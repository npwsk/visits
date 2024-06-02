import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-dark-blue p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link to="/">MedRep System</Link>
        </div>
        <button
          className="text-white lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className="space-x-4 hidden lg:block">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
              <button onClick={logout} className="text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/register" className="text-white hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
