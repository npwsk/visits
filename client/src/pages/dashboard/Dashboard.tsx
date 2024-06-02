import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the Medical Representatives System!</p>
      </div>
    </div>
  );
};

export default Dashboard;
