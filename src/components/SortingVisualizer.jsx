import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const SortingVisualizer = () => {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(20)
  const [speed, setSpeed] = useState(50)
  const [isSorting, setIsSorting] = useState(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble')

  useEffect(() => {
    generateArray()
  }, [arraySize])

  const generateArray = () => {
    const newArray = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const bubbleSort = async () => {
    setIsSorting(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await sleep(speed)
        }
      }
    }
    setIsSorting(false)
    toast.success('Bubble Sort completed!')
  }

  const selectionSort = async () => {
    setIsSorting(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        setArray([...arr])
        await sleep(speed)
      }
    }
    setIsSorting(false)
    toast.success('Selection Sort completed!')
  }

  const insertionSort = async () => {
    setIsSorting(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 1; i < n; i++) {
      let key = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        j--
        setArray([...arr])
        await sleep(speed)
      }
      arr[j + 1] = key
      setArray([...arr])
      await sleep(speed)
    }
    setIsSorting(false)
    toast.success('Insertion Sort completed!')
  }

  const handleAlgorithmChange = (algorithm) => {
    if (isSorting) {
      toast.error('Please wait for current sort to complete')
      return
    }
    setCurrentAlgorithm(algorithm)
  }

  const handleSort = () => {
    if (isSorting) {
      toast.error('Sorting in progress')
      return
    }
    switch (currentAlgorithm) {
      case 'bubble':
        bubbleSort()
        break
      case 'selection':
        selectionSort()
        break
      case 'insertion':
        insertionSort()
        break
      default:
        bubbleSort()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sorting Visualizer</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Array Size</label>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{arraySize}</span>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Speed</label>
            <input
              type="range"
              min="10"
              max="200"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isSorting}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{speed}ms</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => handleAlgorithmChange('bubble')}
            className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              currentAlgorithm === 'bubble'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={isSorting}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => handleAlgorithmChange('selection')}
            className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              currentAlgorithm === 'selection'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={isSorting}
          >
            Selection Sort
          </button>
          <button
            onClick={() => handleAlgorithmChange('insertion')}
            className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              currentAlgorithm === 'insertion'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={isSorting}
          >
            Insertion Sort
          </button>
          <button
            onClick={handleSort}
            disabled={isSorting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            {isSorting ? 'Sorting...' : 'Start Sorting'}
          </button>
          <button
            onClick={generateArray}
            disabled={isSorting}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Generate New Array
          </button>
        </div>

        <div className="relative h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4">
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1">
            {array.map((value, index) => (
              <motion.div
                key={index}
                className="w-8 bg-indigo-500 rounded-t-lg"
                style={{
                  height: `${value * 3}px`,
                  backgroundColor: isSorting ? '#4f46e5' : '#6366f1'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortingVisualizer
