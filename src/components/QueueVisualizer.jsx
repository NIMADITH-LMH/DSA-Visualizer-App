import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import VisualizerCard from './VisualizerCard';
import Button from './Button';
import Input from './Input';
import InfoPanel from './InfoPanel';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const enqueue = () => {
    if (!inputValue.trim()) {
      toast.error('Please enter a value');
      return;
    }
    if (queue.length >= 10) {
      toast.error('Queue is full!');
      return;
    }
    
    setIsAnimating(true);
    setQueue([...queue, inputValue]);
    setInputValue('');
    toast.success(`Enqueued ${inputValue} to queue`);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }

  const dequeue = () => {
    if (queue.length === 0) {
      toast.error('Queue is empty!');
      return;
    }
    
    setIsAnimating(true);
    const dequeuedValue = queue[0];
    setQueue(queue.slice(1));
    toast.success(`Dequeued ${dequeuedValue} from queue`);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }

  const peek = () => {
    if (queue.length === 0) {
      toast.error('Queue is empty!');
      return;
    }
    toast.success(`Front element: ${queue[0]}`);
  }

  const clear = () => {
    if (queue.length === 0) {
      toast.error('Queue is already empty!');
      return;
    }
    setQueue([]);
    toast.success('Queue cleared');
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-6">Queue Visualizer</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enqueue()}
            placeholder="Enter value"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white shadow-sm"
          />
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            <button
              onClick={enqueue}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              disabled={!inputValue.trim() || queue.length >= 10}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Enqueue
            </button>
            <button
              onClick={dequeue}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              disabled={queue.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Dequeue
            </button>
            <button
              onClick={peek}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              disabled={queue.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Peek
            </button>
            <button
              onClick={clear}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              disabled={queue.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 4v-.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V6H8zm5 5a1 1 0 01-1 1H8a1 1 0 110-2h4a1 1 0 011 1z" clipRule="evenodd" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Queue visualization */}
        <div className="mt-8 relative p-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-inner overflow-hidden min-h-[200px]">
          <div className="absolute inset-y-0 left-0 w-1 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute inset-0 flex items-center p-8">
            <AnimatePresence>
              {queue.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-3 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  <p className="text-lg font-medium">Queue is empty</p>
                  <p className="text-sm mt-1">Use Enqueue to add elements</p>
                </div>
              ) : (
                <div className="flex items-center space-x-4 overflow-x-auto py-4 w-full">
                  {queue.map((item, index) => (
                    <motion.div
                      key={`${index}-${item}`}
                      initial={{ opacity: 0, scale: 0.8, x: -50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 50 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`h-16 w-16 ${
                        index === 0 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20' 
                          : index === queue.length - 1
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20'
                            : 'bg-gradient-to-r from-orange-400 to-amber-400'
                      } text-white rounded-lg flex items-center justify-center text-xl font-medium border border-white/20 relative flex-shrink-0`}
                    >
                      {item}
                      {index === 0 && (
                        <div className="absolute -top-8 text-sm bg-orange-900/80 text-white px-3 py-1 rounded-full">
                          Front
                        </div>
                      )}
                      {index === queue.length - 1 && (
                        <div className="absolute -bottom-8 text-sm bg-amber-900/80 text-white px-3 py-1 rounded-full">
                          Back
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Queue information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Queue Status</h3>
            <div className="flex justify-between items-center">
              <p>Queue size:</p>
              <div className="flex items-center">
                <span className="text-xl font-mono">{queue.length}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/ 10</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-orange-600 dark:bg-orange-400 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(queue.length / 10) * 100}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Front Element</h3>
            {queue.length > 0 ? (
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg flex items-center justify-center font-medium mr-3">
                  {queue[0]}
                </div>
                <span className="text-gray-700 dark:text-gray-300">Available for peek/dequeue operations</span>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No elements in queue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueVisualizer
