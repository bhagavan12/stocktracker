// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null, // Store user object (e.g., { id, name, email, preferences })
//   isAuthenticated: false, // Authentication status
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     clearUser(state) {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//     updateUserPreferences(state, action) {
//       if (state.user) {
//         state.user.preferences = action.payload;
//       }
//     },
//   },
// });

// export const { setUser, clearUser, updateUserPreferences } = userSlice.actions;

// export const selectUser = (state) => state.user.user;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './api'; 

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || { 
    username: null, 
    email: null, 
    id: null 
  },
//   token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await loginUser(username, password);
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { error: 'Something went wrong' });
    }
  }
);

// Signup thunk
export const signup = createAsyncThunk(
  'user/signup',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const data = await signupUser(username, email, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { error: 'Something went wrong' });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { username: null, email: null, id: null };
      state.token = null;
      state.error = null;
    //   localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('stocks');
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.user.id = action.payload.rid;
        state.token = action.payload.token;
        // localStorage.setItem('token', action.payload.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: action.payload.username,
            email: action.payload.email,
            id: action.payload.rid,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Login failed. Please try again.';
      })
      // Handle signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Signup failed. Please try again.';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
