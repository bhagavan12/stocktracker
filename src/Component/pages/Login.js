import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
// import '../Styling/Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ username, password })).unwrap();
      if (result) {
        navigate('/home'); // Navigate to the home page on successful login
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <FloatLabel>
          <InputText
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%' }}
          />
          <label htmlFor="username">Username</label>
        </FloatLabel>

        <FloatLabel style={{ marginTop: '15px' }}>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            style={{ width: '100%' }}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>

        <Button
          type="submit"
          label="Login"
          className="p-button-raised p-button-primary"
          disabled={loading}
          style={{ marginTop: '20px' }}
        />
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
