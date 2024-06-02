import React from 'react';
import Sidebar from '../components/Sidebar';

const Visits: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Visits</h1>
        <p>Here you can manage your visits.</p>
        {/* Здесь будет размещена таблица или список визитов */}
      </div>
    </div>
  );
};

export default Visits;
