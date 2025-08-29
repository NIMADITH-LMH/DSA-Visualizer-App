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

  // Queue Controls Component
  const QueueControls = () => (
    <div className="flex flex-col space-y-4">
      <Input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && enqueue()}
        placeholder="Enter a value"
        maxLength={8}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        }
        aria-label="Queue value input"
      />
      
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={enqueue}
          disabled={!inputValue.trim() || queue.length >= 10 || isAnimating}
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Enqueue to queue"
        >
          Enqueue
        </Button>
        
        <Button 
          onClick={dequeue}
          disabled={queue.length === 0 || isAnimating}
          variant="secondary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Dequeue from queue"
        >
          Dequeue
        </Button>
        
        <Button 
          onClick={peek}
          disabled={queue.length === 0}
          variant="success"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Peek at front of queue"
        >
          Peek
        </Button>
        
        <Button 
          onClick={clear}
          disabled={queue.length === 0}
          variant="danger"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 4v-.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V6H8zm5 5a1 1 0 01-1 1H8a1 1 0 110-2h4a1 1 0 011 1z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Clear queue"
        >
          Clear
        </Button>
      </div>
    </div>
  );

  // Queue Sidebar Component
  const QueueSidebar = () => (
    <InfoPanel
      items={[
        {
          title: 'Queue Size',
          content: (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Current</span>
                <span className="font-mono">{queue.length} / 10</span>
              </div>
              <div className="w-full bg-slate-700/50 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-pink-600 to-rose-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${(queue.length / 10) * 100}%` }}
                  aria-label={`Queue is ${queue.length} out of 10 items full`}
                  role="progressbar"
                  aria-valuenow={queue.length}
                  aria-valuemin={0}
                  aria-valuemax={10}
                ></div>
              </div>
            </div>
          )
        },
        {
          title: 'Front Element',
          content: queue.length > 0 ? (
            <div className="bg-pink-900/50 p-3 rounded-lg border border-pink-700/50">
              <span className="font-mono text-lg text-white">{queue[0]}</span>
            </div>
          ) : (
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <span className="text-slate-400">No elements</span>
            </div>
          )
        },
        {
          title: 'FIFO Principle',
          content: 'First In, First Out: Elements are removed in the same order they were added.'
        }
      ]}
    />
  );

  // Queue Visualization Component
  const QueueVisualization = () => (
    <div className="relative h-64 flex items-center justify-center bg-gradient-to-r from-slate-800/30 to-pink-900/20 rounded-xl p-6 overflow-hidden">
      <div className="queue-container relative w-full">
        <AnimatePresence>
          {queue.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <p>Queue is empty</p>
              </div>
            </div>
          ) : (
            queue.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                className={`queue-item ds-item flex items-center justify-center min-w-[70px] h-16 px-4 text-white font-mono text-lg
                  ${index === 0 ? 'front' : ''} 
                  ${index === queue.length - 1 ? 'rear' : ''}`}
                style={{ '--queue-index': queue.length - index }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {item}
                {index === 0 && (
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-blue-600/90 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap">
                    Front
                  </div>
                )}
                {index === queue.length - 1 && (
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-purple-600/90 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap">
                    Rear
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {/* Platform base illustration */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="h-4 w-3/4 bg-gradient-to-r from-slate-700 via-pink-800 to-slate-700 rounded-t-lg"></div>
      </div>
    </div>
  );

  return (
    <VisualizerCard
      title="Queue Visualizer"
      description="A queue is a FIFO (First In, First Out) data structure. Elements are added at the rear and removed from the front."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      }
      controls={<QueueControls />}
      sidebar={<QueueSidebar />}
    >
      <QueueVisualization />
    </VisualizerCard>
  );
};

export default QueueVisualizer;
