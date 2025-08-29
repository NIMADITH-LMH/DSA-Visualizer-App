import React, { useState, useEffect } from 'react';
import { fetchAlgorithms, checkServerStatus } from '../services/api';

/**
 * Component to demonstrate frontend-backend communication with hot reloading
 */
const AlgorithmList = () => {
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Check if the server is running
        const isServerRunning = await checkServerStatus();
        setServerStatus(isServerRunning);
        
        // Fetch algorithms
        const data = await fetchAlgorithms();
        setAlgorithms(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load algorithms:', err);
        setError('Failed to load algorithms. See console for details.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh data every 10 seconds to demonstrate hot reloading
    const intervalId = setInterval(loadData, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Algorithm Information</h2>
        <div className="flex items-center">
          <span className="mr-2">Server Status:</span>
          <span className={`inline-block w-3 h-3 rounded-full ${serverStatus ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="ml-2">{serverStatus ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.map(algo => (
            <div key={algo.id} className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">{algo.name}</h3>
              <div className="mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Time Complexity:</div>
                <div className="font-mono">{algo.complexity?.time || 'N/A'}</div>
              </div>
              <div className="mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Space Complexity:</div>
                <div className="font-mono">{algo.complexity?.space || 'N/A'}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{algo.description}</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>This component demonstrates hot reloading with backend communication. Try editing the server's algorithm data!</p>
      </div>
    </div>
  );
};

export default AlgorithmList;
