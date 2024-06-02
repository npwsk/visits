import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="w-64 h-full bg-white shadow-md">
      <div className="p-4 font-bold text-lg border-b">MedRep System</div>
      <ul className="p-4">
        <li className="mb-2">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/visits" className="text-blue-600 hover:underline">Visits</Link>
        </li>
        <li className="mb-2">
          <Link to="/clinics" className="text-blue-600 hover:underline">Clinics</Link>
        </li>
        <li className="mb-2">
          <Link to="/contacts" className="text-blue-600 hover:underline">Contacts</Link>
        </li>
        <li className="mb-2">
          <Link to="/discounts" className="text-blue-600 hover:underline">Discounts</Link>
        </li>
        {user?.role === 'MANAGER' && (
          <>
            <li className="mb-2">
              <Link to="/employees" className="text-blue-600 hover:underline">Employees</Link>
            </li>
            <li className="mb-2">
              <Link to="/reports" className="text-blue-600 hover:underline">Reports</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
