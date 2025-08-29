import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAlgorithms, checkServerStatus } from '../services/api';
import VisualizerCard from './VisualizerCard';

/**
 * Component to demonstrate frontend-backend communication with hot reloading
 * Updated to use VisualizerCard for consistent styling
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

  // Server status indicator component
  const ServerStatus = () => (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700 dark:text-gray-300">Server Status:</span>
      <span className={`inline-block w-3 h-3 rounded-full ${serverStatus ? 'bg-green-500' : 'bg-red-500'}`}></span>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{serverStatus ? 'Connected' : 'Disconnected'}</span>
    </div>
  );

  // Algorithm card component
  const AlgorithmGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {algorithms.map(algo => (
        <motion.div 
          key={algo.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
        >
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
        </motion.div>
      ))}
    </div>
  );

  const AlgorithmContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      );
    }
    
    return <AlgorithmGrid />;
  };

  return (
    <VisualizerCard
      title="Algorithm Information"
      description="Explore various algorithms with their time and space complexity details."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      }
      controls={<ServerStatus />}
    >
      <div className="visualizer-content">
        <AlgorithmContent />
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>This component demonstrates hot reloading with backend communication. Try editing the server's algorithm data!</p>
        </div>
      </div>
    </VisualizerCard>
  );
};

export default AlgorithmList;
