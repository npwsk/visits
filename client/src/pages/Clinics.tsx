import React from 'react';
import Sidebar from '../components/Sidebar';

const Clinics: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Clinics</h1>
        <p>Here you can manage clinics.</p>
        {/* Здесь будет размещена таблица или список клиник */}
      </div>
    </div>
  );
};

export default Clinics;
