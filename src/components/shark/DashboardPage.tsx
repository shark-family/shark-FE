import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">📊 Smart Aquarium Dashboard</h1>
      <iframe 
        src="http://34.64.200.25:5601/app/dashboards#/view/23d2ba98-2e99-403f-a877-df256de3c6a3?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-time-filter=true" 
        height="800" 
        width="1200"></iframe>
    </div>
  );
};

export default DashboardPage;
