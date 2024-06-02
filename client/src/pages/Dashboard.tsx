import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the Medical Representatives System!</p>
      </div>
    </div>
  );
};

export default Dashboard;
