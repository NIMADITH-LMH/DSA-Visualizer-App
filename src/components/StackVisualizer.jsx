import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import VisualizerCard from './VisualizerCard';
import InfoPanel from './InfoPanel';
import Button from './Button';
import Input from './Input';
import Badge from './Badge';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);

  const maxStackSize = 10;

  // Create staggered animation effect
  useEffect(() => {
    if (stack.length > 0) {
      stack.forEach((_, index) => {
        document.documentElement.style.setProperty(`--stack-index-${index}`, stack.length - index);
      });
    }
  }, [stack]);

  const push = () => {
    if (!inputValue.trim()) {
      toast.error('Please enter a value to push');
      return;
    }
    
    if (stack.length >= maxStackSize) {
      toast.error(`Stack overflow! Maximum size is ${maxStackSize}`);
      return;
    }
    
    setIsAnimating(true);
    setLastOperation({ type: 'push', value: inputValue });
    
    // Add new item to stack
    setStack([...stack, inputValue]);
    setInputValue('');
    
    toast.success(`Pushed "${inputValue}" to stack`);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const pop = () => {
    if (stack.length === 0) {
      toast.error('Stack underflow! Cannot pop from empty stack');
      return;
    }
    
    setIsAnimating(true);
    const poppedValue = stack[stack.length - 1];
    setLastOperation({ type: 'pop', value: poppedValue });
    
    // Remove top item from stack
    setStack(stack.slice(0, -1));
    
    toast.success(`Popped "${poppedValue}" from stack`);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const peek = () => {
    if (stack.length === 0) {
      toast.error('Stack is empty! Cannot peek');
      return;
    }
    
    const topValue = stack[stack.length - 1];
    setLastOperation({ type: 'peek', value: topValue });
    
    toast.success(`Top element: "${topValue}"`);
    
    // Highlight the top element
    const topElement = document.querySelector('.stack-item:last-child');
    topElement.classList.add('glow-effect');
    setTimeout(() => topElement.classList.remove('glow-effect'), 2000);
  };

  const clear = () => {
    if (stack.length === 0) {
      toast.error('Stack is already empty');
      return;
    }
    
    setStack([]);
    setLastOperation({ type: 'clear' });
    toast.success('Stack cleared');
  };

  // Controls section component
  const StackControls = () => (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && push()}
        placeholder="Enter a value"
        maxLength={8}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        }
        aria-label="Stack value input"
      />
      
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={push}
          disabled={!inputValue.trim() || stack.length >= maxStackSize || isAnimating}
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Push to stack"
        >
          Push
        </Button>
        
        <Button 
          onClick={pop}
          disabled={stack.length === 0 || isAnimating}
          variant="secondary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Pop from stack"
        >
          Pop
        </Button>
        
        <Button 
          onClick={peek}
          disabled={stack.length === 0 || isAnimating}
          variant="success"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          }
          ariaLabel="Peek at top of stack"
        >
          Peek
        </Button>
        
        <Button 
          onClick={clear}
          disabled={stack.length === 0 || isAnimating}
          variant="light"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9z" clipRule="evenodd" />
              <path d="M7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
          }
          ariaLabel="Clear stack"
        >
          Clear
        </Button>
      </div>
    </div>
  );

  // Sidebar information panels
  const StackSidebar = () => (
    <>
      <InfoPanel 
        title="Stack Properties" 
        variant="primary"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        }
      >
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Size</span>
            <span className="font-mono">{stack.length} / {maxStackSize}</span>
          </div>
          <div className="w-full bg-slate-700/50 dark:bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(stack.length / maxStackSize) * 100}%` }}
              aria-label={`Stack is ${stack.length} out of ${maxStackSize} items full`}
              role="progressbar"
              aria-valuenow={stack.length}
              aria-valuemin={0}
              aria-valuemax={maxStackSize}
            ></div>
          </div>
        </div>
        
        <div>
          <p className="text-sm mb-1">Top Element</p>
          {stack.length > 0 ? (
            <div className="bg-indigo-900/50 p-3 rounded-lg border border-indigo-700/50">
              <span className="font-mono text-lg text-white">{stack[stack.length - 1]}</span>
            </div>
          ) : (
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <span className="text-slate-400">No elements</span>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm mb-1">Stack Status</p>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={stack.length === 0 ? "danger" : stack.length < maxStackSize ? "success" : "warning"}
              pill
            >
              {stack.length === 0 ? "Empty" : stack.length === maxStackSize ? "Full" : "Has Items"}
            </Badge>
            
            {isAnimating && <Badge variant="info" pill>Animating</Badge>}
          </div>
        </div>
      </InfoPanel>
      
      <InfoPanel 
        title="Last Operation" 
        variant={
          lastOperation?.type === 'push' ? 'success' :
          lastOperation?.type === 'pop' ? 'warning' :
          lastOperation?.type === 'peek' ? 'info' :
          lastOperation?.type === 'clear' ? 'error' : 'default'
        }
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        }
      >
        {lastOperation ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Type:</span>
              <span className="text-white font-medium capitalize">{lastOperation.type}</span>
            </div>
            {lastOperation.value && (
              <div className="flex items-center gap-2">
                <span className="text-slate-300">Value:</span>
                <span className="font-mono bg-slate-700/50 px-2 py-1 rounded text-white">{lastOperation.value}</span>
              </div>
            )}
            <div className="text-xs text-slate-400 mt-2">
              {lastOperation.type === 'push' && 'Added a new element to the top of the stack'}
              {lastOperation.type === 'pop' && 'Removed the top element from the stack'}
              {lastOperation.type === 'peek' && 'Viewed the top element without removing it'}
              {lastOperation.type === 'clear' && 'Removed all elements from the stack'}
            </div>
          </div>
        ) : (
          <p className="text-slate-400">No operations performed yet</p>
        )}
      </InfoPanel>
      
      <InfoPanel 
        title="Time Complexity" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        }
      >
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Push</Badge>
              <span>Add an element</span>
            </div>
            <span className="font-mono text-emerald-400">O(1)</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">Pop</Badge>
              <span>Remove an element</span>
            </div>
            <span className="font-mono text-emerald-400">O(1)</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm">Peek</Badge>
              <span>View top element</span>
            </div>
            <span className="font-mono text-emerald-400">O(1)</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm">Search</Badge>
              <span>Find an element</span>
            </div>
            <span className="font-mono text-amber-400">O(n)</span>
          </div>
        </div>
      </InfoPanel>
    </>
  );

  // Main visualization component
  const StackVisualization = () => (
    <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/40 p-6 rounded-xl border border-slate-700/50 shadow-xl min-h-[500px] relative flex items-center justify-center">
      <div className="stack-container w-full">
        <AnimatePresence mode="popLayout">
          {stack.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-400 flex flex-col items-center"
            >
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <p className="text-lg font-medium">Stack is empty</p>
              <p className="text-sm mt-2">Use the Push button to add elements</p>
            </motion.div>
          ) : (
            stack.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                className={`ds-item-enhanced stack-item ${index === stack.length - 1 ? 'border-2 border-indigo-400/70' : ''}`}
                style={{ '--stack-index': stack.length - index }}
                initial={{ opacity: 0, scale: 0.5, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                aria-label={`Stack item ${item}${index === stack.length - 1 ? ', top of stack' : index === 0 ? ', bottom of stack' : ''}`}
              >
                {item}
                {index === stack.length - 1 && (
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-indigo-600/90 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap">
                    Top
                  </div>
                )}
                {index === 0 && (
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-slate-600/90 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap">
                    Bottom
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {/* Platform base illustration */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="h-4 w-3/4 bg-gradient-to-r from-slate-700 via-indigo-800 to-slate-700 rounded-t-lg"></div>
      </div>
    </div>
  );

  return (
    <VisualizerCard
      title="Stack Visualizer"
      description="A stack is a LIFO (Last In, First Out) data structure. Elements are added to and removed from the top of the stack."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      }
      controls={<StackControls />}
      sidebar={<StackSidebar />}
    >
      <StackVisualization />
    </VisualizerCard>
  );
};

export default StackVisualizer;
