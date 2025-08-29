import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import StackVisualizer from './components/StackVisualizer'
import QueueVisualizer from './components/QueueVisualizer_new'
import SortingVisualizer from './components/SortingVisualizer_new'
import AlgorithmList from './components/AlgorithmList_new'
import Layout from './components/Layout'

export default function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('dsa-visualizer-visited');
    if (!hasVisitedBefore) {
      setShowWelcomeModal(true);
      localStorage.setItem('dsa-visualizer-visited', 'true');
    }
  }, []);
  
  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  // Welcome modal component
  const WelcomeModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 w-11/12 max-w-md rounded-xl shadow-2xl p-6 transform transition-all">
        <h2 className="text-2xl font-bold mb-4 primary-gradient-text">Welcome to DSA Visualizer!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This interactive app helps you visualize and understand common data structures and algorithms.
          Explore stacks, queues, and sorting algorithms with step-by-step visualizations.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Visualize operations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Animated transitions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 4.586l1.293-1.293a1 1 0 111.414 1.414l-1.293 1.293 1.293 1.293A1 1 0 0117 8.586l-1.293-1.293L15 8.586 13.707 7.293 15 6l-1.293-1.293-1.414-1.414a1 1 0 010-1.414A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Interactive learning</span>
          </div>
        </div>
        <button 
          onClick={closeWelcomeModal}
          className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(to right, #10b981, #059669)',
              color: 'white',
              border: '1px solid #065f46',
              borderRadius: '0.5rem',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#10b981',
            },
            duration: 3000,
          },
          error: {
            style: {
              background: 'linear-gradient(to right, #ef4444, #dc2626)',
              color: 'white',
              border: '1px solid #b91c1c',
              borderRadius: '0.5rem',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#ef4444',
            },
            duration: 4000,
          },
          info: {
            style: {
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              color: 'white',
              border: '1px solid #1d4ed8',
              borderRadius: '0.5rem',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#3b82f6',
            },
            duration: 3000,
          },
          custom: {
            duration: 3000,
          },
        }}
      />

      {/* Main content area */}
      <div className="w-full max-w-6xl mx-auto px-4 pb-16 pt-6">
        <Routes>
          <Route path="/" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/algorithms" element={<AlgorithmList />} />
        </Routes>
      </div>

      {/* Welcome modal */}
      {showWelcomeModal && <WelcomeModal />}
    </Layout>
  )
}
