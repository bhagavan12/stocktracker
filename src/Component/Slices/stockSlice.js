import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStocksFromBackend, addStockToBackend, updateStockInBackend, deleteStockFromBackend } from './api';
const initialState = {
    stocks: JSON.parse(localStorage.getItem('stocks')) || [],
    currentStock: null,
    loading: false,
    error: null,
  };
  export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async (userId, thunkAPI) => {
    try {
      const data = await fetchStocksFromBackend(userId);
      localStorage.setItem('stocks', JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const addStock = createAsyncThunk('stocks/addStock', async ({ userId, stock }, thunkAPI) => {
    try {
      const data = await addStockToBackend(userId, stock);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const updateStock = createAsyncThunk('stocks/updateStock', async ({ userId, stockId, stock }, thunkAPI) => {
    try {
      const data = await updateStockInBackend(userId, stockId, stock);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const deleteStock = createAsyncThunk('stocks/deleteStock', async ({ userId, stockId }, thunkAPI) => {
    try {
      const stockIdToDelete = await deleteStockFromBackend(userId, stockId);
      return stockIdToDelete;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  // Stock Slice
  const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
      setCurrentStock(state, action) {
        state.currentStock = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch Stocks
        .addCase(fetchStocks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStocks.fulfilled, (state, action) => {
          state.loading = false;
          state.stocks = action.payload;
          localStorage.setItem('stocks', JSON.stringify(action.payload));
        })
        .addCase(fetchStocks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Add Stock
        .addCase(addStock.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addStock.fulfilled, (state, action) => {
          state.loading = false;
          state.stocks.push(action.payload);
          state.currentStock = action.payload;
          localStorage.setItem('stocks', JSON.stringify(state.stocks));
        })
        .addCase(addStock.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Update Stock
        .addCase(updateStock.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateStock.fulfilled, (state, action) => {
          state.loading = false;
          const updatedStock = action.payload;
          const index = state.stocks.findIndex((stock) => stock.id === updatedStock.id);
          if (index !== -1) {
            state.stocks[index] = updatedStock;
          }
          state.currentStock = updatedStock;
          localStorage.setItem('stocks', JSON.stringify(state.stocks));
        })
        .addCase(updateStock.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Delete Stock
        .addCase(deleteStock.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteStock.fulfilled, (state, action) => {
          state.loading = false;
          const stockId = action.payload;
          state.stocks = state.stocks.filter((stock) => stock.id !== stockId);
          localStorage.setItem('stocks', JSON.stringify(state.stocks));
        })
        .addCase(deleteStock.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { setCurrentStock } = stockSlice.actions;
  
  export const selectStocks = (state) => state.stock.stocks;
  export const selectCurrentStock = (state) => state.stock.currentStock;
  
  export default stockSlice.reducer;



// const stockSlice = createSlice({
//   name: 'stock',
//   initialState,
//   reducers: {
//     setStocks(state, action) {
//       state.stocks = action.payload;
//     },
//     addStock(state, action) {
//       state.stocks.push(action.payload);
//       state.currentStock = action.payload;
//     },
//     updateStock(state, action) {
//       const updatedStock = action.payload;
//       const index = state.stocks.findIndex((stock) => stock.id === updatedStock.id);
//       if (index !== -1) {
//         state.stocks[index] = updatedStock;
//         state.currentStock = updatedStock;
//       }
//     },
//     deleteStock(state, action) {
//       state.stocks = state.stocks.filter((stock) => stock.id !== action.payload);
//     },
//     setCurrentStock(state, action) {
//       state.currentStock = action.payload;
//     },
//   },
// });

// export const { setStocks, addStock, updateStock, deleteStock, setCurrentStock } = stockSlice.actions;

// export const selectStocks = (state) => state.stock.stocks;
// export const selectCurrentStock = (state) => state.stock.currentStock;

// export default stockSlice.reducer;
