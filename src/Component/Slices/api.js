import axios from 'axios';

const baseapi = process.env.REACT_APP_DB_HOST;

// Create a common Axios instance
const api = axios.create({
  baseURL: `${baseapi}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to log in a user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/api/users/signin', { username, password });
    return response.data;
  } catch (error) {
    throw error; // Pass the error for handling in asyncThunk
  }
};

// Function to sign up a new user
export const signupUser = async (username, email, password) => {
  try {
    const response = await api.post('/api/users/register', {
        email,
        password,
        username
    });
    return response.data;
  } catch (error) {
    throw error; // Pass the error for handling in asyncThunk
  }
};
export const fetchStocksFromBackend = async (userId) => {
    try {
      const response = await api.get(`api/stocks/portfolio/${userId}`);
      console.log("userId",userId);
      return response.data;
    } catch (error) {
      throw error; // Will be handled in asyncThunk
    }
  };
  
  // Add a new stock for a user
  export const addStockToBackend = async (userId, stock) => {
    try {
      const response = await api.post(`api/stocks/add/${userId}`, stock);
      return response.data;
    } catch (error) {
      throw error; // Will be handled in asyncThunk
    }
  };
  
  // Update an existing stock for a user
  export const updateStockInBackend = async (userId, stockId, stock) => {
    try {
      const response = await api.put(`api/stocks/update/${userId}/${stockId}`, stock);
      return response.data;
    } catch (error) {
      throw error; // Will be handled in asyncThunk
    }
  };
  
  // Delete a stock for a user
  export const deleteStockFromBackend = async (userId, stockId) => {
    try {
      await api.delete(`api/stocks/delete/${userId}/${stockId}`);
      return stockId; // Just return the stockId for easy removal
    } catch (error) {
      throw error; // Will be handled in asyncThunk
    }
  };
