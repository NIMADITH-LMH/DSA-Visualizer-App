/**
 * API service for the DSA Visualizer
 * This file provides functions to interact with the backend API
 */

// Base API URL - adjust for production as needed
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetch algorithms data from the API
 * @returns {Promise<Array>} - Array of algorithm objects
 */
export const fetchAlgorithms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    // Fallback data if API is not available
    return [
      {
        id: 'bubble',
        name: 'Bubble Sort (Fallback)',
        complexity: {
          time: 'O(n²)',
          space: 'O(1)'
        },
        description: 'Fallback data: A simple sorting algorithm that repeatedly steps through the list.'
      }
    ];
  }
};

/**
 * Check if the server is running
 * @returns {Promise<boolean>} - True if the server is running
 */
export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Server connection error:', error);
    return false;
  }
};

/**
 * API service object
 */
const apiService = {
  fetchAlgorithms,
  checkServerStatus
};

export default apiService;
