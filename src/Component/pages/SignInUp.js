import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('login'); // Track active tab

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: '500px', width: '90%' }}>
        <div className="card-body">
          <ul className="nav nav-tabs mb-4" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
                type="button"
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
                type="button"
              >
                Register
              </button>
            </li>
          </ul>

          {/* Conditional Rendering of Tabs */}
          {activeTab === 'login' && <Login />}
          {activeTab === 'register' && <Register />}
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
