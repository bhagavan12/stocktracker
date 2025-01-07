import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/pages/Login';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './Component/ProtectedRoute';
import Stockss from './Component/pages/StockPage';
import StockList from './Component/pages/StocksHome';
import Navbar from './Component/pages/Navbar';
import Portfolio from './Component/pages/Portfolio';
import Register from './Component/pages/Register';
import SignInUp from './Component/pages/SignInUp';
const App = () => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user.username;
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="">
        <Routes>
          {/* Define routes for the application */}
          {/* <Route path="/"  element=<StockList/>/> */}

          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" replace /> :<Register />} />
          {/* <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} /> */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <SignInUp />} />
          <Route path="/home" element={<ProtectedRoute element={<StockList />} />} />
          <Route path="/portfolio" element={<ProtectedRoute element={<Portfolio />} />} />
          <Route path="/stockpage/:displaySymbol" element={<ProtectedRoute element={<Stockss />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

{/* <Route path="/"  element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />  Login Page */ }
{/* <Route path="/home" element={<Home />} />  Home Page after login */ }