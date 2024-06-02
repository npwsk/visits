import React from 'react';
import Sidebar from '../components/Sidebar';

const Employees: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <p>Here you can manage employees.</p>
        {/* Здесь будет размещена таблица или список сотрудников */}
      </div>
    </div>
  );
};

export default Employees;
