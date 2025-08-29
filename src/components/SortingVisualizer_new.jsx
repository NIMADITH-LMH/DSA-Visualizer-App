import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import VisualizerCard from './VisualizerCard';
import Button from './Button';
import Input from './Input';
import InfoPanel from './InfoPanel';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble');
  const [sortInfo, setSortInfo] = useState({
    comparisons: 0,
    swaps: 0,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)'
  });

  useEffect(() => {
    generateArray();
  }, [arraySize]);

const generateArray = (type = 'random') => {
  let newArray = [];
  switch (type) {
    case 'random':
      for (let i = 0; i < arraySize; i++) {
        newArray.push(Math.floor(Math.random() * 100) + 1);
      }
      break;
    case 'sorted':
      newArray = Array.from({ length: arraySize }, (_, i) => i + 1);
      break;
    case 'reversed':
      newArray = Array.from({ length: arraySize }, (_, i) => arraySize - i);
      break;
    default:
      newArray = Array.from({ length: arraySize }, (_, i) => Math.floor(Math.random() * 100) + 1);
  }
  setArray(newArray);
  setSortInfo({
    ...sortInfo,
    comparisons: 0,
    swaps: 0
  });
  toast.success(`New ${type} array generated!`);
};

// Add new state for array type
const [arrayType, setArrayType] = useState('random');

// Update SortingControls to include array type selection
<></>
<div className="flex flex-wrap gap-3 mb-2">
  <Button 
    onClick={() => handleAlgorithmChange('bubble')}
    disabled={isSorting}
    variant={currentAlgorithm === 'bubble' ? 'primary' : 'light'}
    ariaLabel="Use Bubble Sort algorithm"
  >
    Bubble Sort
  </Button>
  
  <Button 
    onClick={() => handleAlgorithmChange('selection')}
    disabled={isSorting}
    variant={currentAlgorithm === 'selection' ? 'primary' : 'light'}
    ariaLabel="Use Selection Sort algorithm"
  >
    Selection Sort
  </Button>
  
  <Button 
    onClick={() => handleAlgorithmChange('insertion')}
    disabled={isSorting}
    variant={currentAlgorithm === 'insertion' ? 'primary' : 'light'}
    ariaLabel="Use Insertion Sort algorithm"
  >
    Insertion Sort
  </Button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">Array Size: {arraySize}</label>
    <input
      type="range"
      min="5"
      max="50"
      value={arraySize}
      onChange={(e) => setArraySize(parseInt(e.target.value))}
      disabled={isSorting}
      className="w-full"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">Animation Speed: {speed}ms</label>
    <input
      type="range"
      min="10"
      max="200"
      value={speed}
      onChange={(e) => setSpeed(parseInt(e.target.value))}
      disabled={isSorting}
      className="w-full"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">Array Type:</label>
    <select
      value={arrayType}
      onChange={(e) => setArrayType(e.target.value)}
      disabled={isSorting}
      className="w-full p-2 bg-slate-700/50 dark:bg-slate-700 text-white rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
    >
      <option value="random">Random</option>
      <option value="sorted">Sorted</option>
      <option value="reversed">Reversed</option>
    </select>
  </div>
</div>

<div className="flex flex-wrap gap-3 mt-2">
  <Button 
    onClick={() => handleSort()}
    disabled={isSorting}
    variant="success"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    }
    ariaLabel="Start sorting"
  >
    {isSorting ? 'Sorting...' : 'Start Sorting'}
  </Button>
  
  <Button 
    onClick={() => generateArray(arrayType)}
    disabled={isSorting}
    variant="secondary"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
      </svg>
    }
    ariaLabel="Generate new array"
  >
    Generate New Array
  </Button>
</div>
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          setArray([...arr]);
          setSortInfo({
            ...sortInfo,
            comparisons,
            swaps,
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)'
          });
          await sleep(speed);
        }
      }
    }
    setIsSorting(false);
    toast.success('Bubble Sort completed!');
  };

  const selectionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        setArray([...arr]);
        setSortInfo({
          ...sortInfo,
          comparisons,
          swaps,
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)'
        });
        await sleep(speed);
      }
    }
    setIsSorting(false);
    toast.success('Selection Sort completed!');
  };

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key) {
        comparisons++;
        arr[j + 1] = arr[j];
        swaps++;
        j = j - 1;
        setArray([...arr]);
        setSortInfo({
          ...sortInfo,
          comparisons,
          swaps,
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)'
        });
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }
    setIsSorting(false);
    toast.success('Insertion Sort completed!');
  };

  const handleSort = () => {
    switch (currentAlgorithm) {
      case 'bubble':
        bubbleSort();
        break;
      case 'selection':
        selectionSort();
        break;
      case 'insertion':
        insertionSort();
        break;
      default:
        bubbleSort();
    }
  };

  const handleAlgorithmChange = (algorithm) => {
    setCurrentAlgorithm(algorithm);
    
    // Update complexity info based on algorithm
    const complexityInfo = {
      bubble: { timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
      selection: { timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
      insertion: { timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' }
    };
    
    setSortInfo({
      ...sortInfo,
      ...complexityInfo[algorithm]
    });
  };

  // Controls Component
const SortingControls = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex flex-wrap gap-3 mb-2">
      <Button 
        onClick={() => handleAlgorithmChange('bubble')}
        disabled={isSorting}
        variant={currentAlgorithm === 'bubble' ? 'primary' : 'light'}
        ariaLabel="Use Bubble Sort algorithm"
      >
        Bubble Sort
      </Button>
      
      <Button 
        onClick={() => handleAlgorithmChange('selection')}
        disabled={isSorting}
        variant={currentAlgorithm === 'selection' ? 'primary' : 'light'}
        ariaLabel="Use Selection Sort algorithm"
      >
        Selection Sort
      </Button>
      
      <Button 
        onClick={() => handleAlgorithmChange('insertion')}
        disabled={isSorting}
        variant={currentAlgorithm === 'insertion' ? 'primary' : 'light'}
        ariaLabel="Use Insertion Sort algorithm"
      >
        Insertion Sort
      </Button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Array Size: {arraySize}</label>
        <input
          type="range"
          min="5"
          max="50"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          disabled={isSorting}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Animation Speed: {speed}ms</label>
        <input
          type="range"
          min="10"
          max="200"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={isSorting}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Array Type:</label>
        <select
          value={arrayType}
          onChange={(e) => setArrayType(e.target.value)}
          disabled={isSorting}
          className="w-full p-2 bg-slate-700/50 dark:bg-slate-700 text-white rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
        >
          <option value="random">Random</option>
          <option value="sorted">Sorted</option>
          <option value="reversed">Reversed</option>
        </select>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-3 mt-2">
      <Button 
        onClick={handleSort}
        disabled={isSorting}
        variant="success"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        }
        ariaLabel="Start sorting"
      >
        {isSorting ? 'Sorting...' : 'Start Sorting'}
      </Button>
      
      <Button 
        onClick={generateArray}
        disabled={isSorting}
        variant="secondary"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        }
        ariaLabel="Generate new array"
      >
        Generate New Array
      </Button>
    </div>
  </div>
);

  // Sidebar Component
  const SortingSidebar = () => (
    <InfoPanel
      items={[
        {
          title: 'Algorithm Info',
          content: (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Algorithm:</span>
                <span className="font-medium">
                  {currentAlgorithm === 'bubble' && 'Bubble Sort'}
                  {currentAlgorithm === 'selection' && 'Selection Sort'}
                  {currentAlgorithm === 'insertion' && 'Insertion Sort'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time Complexity:</span>
                <span className="font-mono">{sortInfo.timeComplexity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Space Complexity:</span>
                <span className="font-mono">{sortInfo.spaceComplexity}</span>
              </div>
            </div>
          )
        },
        {
          title: 'Current Statistics',
          content: (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Array Size:</span>
                <span className="font-mono">{arraySize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Comparisons:</span>
                <span className="font-mono">{sortInfo.comparisons}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Swaps:</span>
                <span className="font-mono">{sortInfo.swaps}</span>
              </div>
            </div>
          )
        },
        {
          title: 'Algorithm Description',
          content: (
            <div className="text-sm">
              {currentAlgorithm === 'bubble' && (
                <p>Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The process is repeated until no swaps are needed.</p>
              )}
              {currentAlgorithm === 'selection' && (
                <p>Selection Sort divides the array into a sorted and an unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.</p>
              )}
              {currentAlgorithm === 'insertion' && (
                <p>Insertion Sort builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.</p>
              )}
            </div>
          )
        }
      ]}
    />
  );

  // Visualization Component
  const SortingVisualization = () => (
    <div className="relative h-[400px] bg-gradient-to-r from-slate-800/30 to-indigo-900/20 rounded-xl overflow-hidden p-4">
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 p-4">
        {array.map((value, index) => (
          <motion.div
            key={index}
            className="sort-bar"
            style={{
              height: `${value * 3}px`,
              width: `${Math.max(100 / arraySize - 1, 4)}%`,
              background: `linear-gradient(to top, rgb(99, 102, 241), rgb(129, 140, 248))`,
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.01 }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <VisualizerCard
      title="Sorting Visualizer"
      description="Visualize different sorting algorithms and their performance."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      }
      controls={<SortingControls />}
      sidebar={<SortingSidebar />}
    >
      <SortingVisualization />
    </VisualizerCard>
  );
};

export default SortingVisualizer;
