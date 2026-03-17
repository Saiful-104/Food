import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCalendarAlt } from 'react-icons/fa';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Sales Report - March 2024', type: 'Sales', date: '2024-03-15', size: '2.5 MB' },
    { id: 2, name: 'User Activity Report', type: 'Users', date: '2024-03-14', size: '1.8 MB' },
    { id: 3, name: 'Order Statistics - Q1 2024', type: 'Orders', date: '2024-03-10', size: '3.2 MB' },
    { id: 4, name: 'Revenue Analysis', type: 'Financial', date: '2024-03-05', size: '1.5 MB' },
    { id: 5, name: 'Restaurant Performance', type: 'Restaurants', date: '2024-03-01', size: '2.1 MB' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-6">Reports</h1>

          {/* Generate Report Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Generate New Report</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <select className="input-field">
                <option>Sales Report</option>
                <option>User Report</option>
                <option>Order Report</option>
                <option>Revenue Report</option>
              </select>
              <input type="date" className="input-field" />
              <input type="date" className="input-field" />
              <button className="btn-primary">Generate Report</button>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-semibold">Recent Reports</h2>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {reports.map((report) => (
                <div key={report.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                      <FaCalendarAlt className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-neutral-500">
                        {report.type} • {report.date} • {report.size}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-primary-500 hover:text-primary-600">
                    <FaDownload />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;