import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slices/userSlice';
import stockReducer from '../Slices/stockSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    stock: stockReducer,
  },
});

export default store;
