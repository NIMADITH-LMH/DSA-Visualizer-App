# DSA Visualizer Web App

A React-based Data Structures and Algorithms (DSA) visualizer web application built with Vite and Tailwind CSS. This interactive tool helps users understand fundamental data structures and algorithms through clear visualizations.

![DSA Visualizer](https://via.placeholder.com/800x400?text=DSA+Visualizer)

## Features

- **Interactive Visualizations** for various data structures:
  - Stack (LIFO) operations: push, pop, peek
  - Queue (FIFO) operations: enqueue, dequeue, view front/rear
  - Sorting algorithms: bubble, insertion, selection sort

- **Educational Content**:
  - Time and space complexity information
  - Algorithm descriptions and explanations
  - Step-by-step visualization of operations

- **Responsive Design**:
  - Works on mobile, tablet, and desktop devices
  - Fluid animations and transitions
  - Glass morphism UI with modern aesthetics

- **Accessibility Features**:
  - Keyboard navigation support
  - ARIA attributes for screen readers
  - Proper focus management
  - Skip navigation link
  - Semantic HTML structure

- **Dark/Light Theme**:
  - Toggle between dark and light modes
  - Respects system preferences
  - Persists user preference
  - Smooth theme transitions

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dsa-visualizer.git
   cd dsa-visualizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```plaintext
   http://localhost:5173
   ```

## Project Structure

```plaintext
dsa-visualizer/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── QueueVisualizer.jsx
│   │   ├── SortingVisualizer.jsx
│   │   ├── StackVisualizer.jsx
│   │   └── ThemeSwitcher.jsx
│   ├── styles/             # CSS styles
│   │   └── enhancements.css
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles & Tailwind imports
│   └── main.jsx            # Application entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## Visualizers

### Stack Visualizer

The Stack Visualizer demonstrates the Last In, First Out (LIFO) principle of stacks. Users can:

- Push elements onto the stack
- Pop elements from the stack
- Peek at the top element
- Clear the entire stack

### Queue Visualizer

The Queue Visualizer demonstrates the First In, First Out (FIFO) principle of queues. Users can:

- Enqueue elements
- Dequeue elements
- View the front and rear elements
- Clear the entire queue

### Sorting Visualizer

The Sorting Visualizer demonstrates different sorting algorithms with step-by-step animation. It includes:

- Bubble Sort
- Insertion Sort
- Selection Sort
- Animation speed control
- Array size adjustment
- Different array initialization options (random, sorted, reversed)

## Accessibility

This project prioritizes accessibility with:

- Semantic HTML elements
- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus management
- Screen reader compatibility
- Responsive design for all devices

## Theme System

The application includes a robust theme system that:

- Toggles between dark and light modes
- Persists user preferences in localStorage
- Detects and applies system theme preferences
- Uses CSS variables for consistent theming
- Provides smooth transitions between themes

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing fast build tool
- All contributors who have helped improve this project
