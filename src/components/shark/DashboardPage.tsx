import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">📊 Smart Aquarium Dashboard</h1>
      <iframe
        src="http://34.47.81.172:5601/app/dashboards#/view/0cc1156c-7c34-4a89-814c-1b3b9bbd8c60?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3A'2025-01-14T23%3A58%3A42.024Z'%2Cto%3A'2025-01-15T00%3A28%3A19.292Z'))&show-time-filter=true"
        height="800"
        width="1200"
        className="border rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default DashboardPage;
