import React from 'react';
import Sidebar from '../components/Sidebar';

const Reports: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <p>Here you can generate and view reports.</p>
        {/* Здесь будет размещена таблица или список отчетов */}
      </div>
    </div>
  );
};

export default Reports;
