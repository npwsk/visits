import React from 'react';
import Sidebar from '../components/Sidebar';

const Contacts: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <p>Here you can manage contacts.</p>
        {/* Здесь будет размещена таблица или список контактов */}
      </div>
    </div>
  );
};

export default Contacts;
