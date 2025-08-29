// Simple Express server for future backend functionality
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app in production
app.use(express.static(join(__dirname, '../dist')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Example API endpoint that could be used for algorithm data
app.get('/api/algorithms', (req, res) => {
  const algorithms = [
    {
      id: 'bubble',
      name: 'Bubble Sort',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    {
      id: 'insertion',
      name: 'Insertion Sort',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      description: 'Builds the sorted array one item at a time, taking each element from the input data and inserting it into its correct position.'
    },
    {
      id: 'selection',
      name: 'Selection Sort',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      description: 'Divides the input list into two parts: a sorted sublist and an unsorted sublist, repeatedly finding the minimum element from the unsorted sublist and moving it to the end of the sorted sublist.'
    }
  ];
  
  res.json(algorithms);
});

// Handle React routing in production
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/`);
});
