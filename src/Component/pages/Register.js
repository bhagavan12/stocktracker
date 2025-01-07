import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signup({ username, email, password })).unwrap();
      if (result) {
        navigate('/'); // Redirect to login after successful signup
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* <div className="card shadow-lg" style={{ maxWidth: '400px', width: '90%' }}> */}
        <div className="card-body">
          {/* <h2 className="card-title text-center mb-4">Register</h2> */}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registering...
                </>
              ) : 'Register'}
            </button>
          </form>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-primary text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Register;
