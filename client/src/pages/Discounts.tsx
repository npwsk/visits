import React from 'react';
import Sidebar from '../components/Sidebar';

const Discounts: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Discounts</h1>
        <p>Here you can manage discounts.</p>
        {/* Здесь будет размещена таблица или список скидок */}
      </div>
    </div>
  );
};

export default Discounts;
