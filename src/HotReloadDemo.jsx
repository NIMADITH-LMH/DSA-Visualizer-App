import React from 'react';
import AlgorithmList from './components/AlgorithmList';

/**
 * HotReloadDemo page
 * This page demonstrates how hot reloading works with frontend and backend changes
 */
const HotReloadDemo = () => {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-black/10 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Hot Reload Demo</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Hot Reload Instructions</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                This page demonstrates hot module replacement (HMR) and auto-reloading in action. Try making changes to see them instantly reflect in the browser!
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800">
                <h3 className="font-semibold mb-2">Try these changes:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Edit <code className="bg-yellow-100 px-1 rounded">src/components/AlgorithmList.jsx</code> to change the UI</li>
                  <li>Edit <code className="bg-yellow-100 px-1 rounded">server/index.js</code> to modify the API response</li>
                  <li>Edit CSS in <code className="bg-yellow-100 px-1 rounded">src/index.css</code> to see style changes</li>
                </ol>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-blue-800">
                <h3 className="font-semibold mb-2">How it works:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Vite's dev server watches for frontend file changes</li>
                  <li>Nodemon watches for backend file changes</li>
                  <li>Changes are instantly reflected without full page reloads</li>
                  <li>State is preserved when possible during updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <AlgorithmList />
        </section>
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-black/10 text-center text-gray-600">
        <p>DSA Visualizer - Hot Reload Demo</p>
      </footer>
    </div>
  );
};

export default HotReloadDemo;
