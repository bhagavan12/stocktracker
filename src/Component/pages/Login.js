// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../Slices/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import { FloatLabel } from 'primereact/floatlabel';
// // import '../Styling/Auth.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error } = useSelector((state) => state.user);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(login({ username, password })).unwrap();
//       if (result) {
//         navigate('/home'); // Navigate to the home page on successful login
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <FloatLabel>
//           <InputText
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={{ width: '100%' }}
//           />
//           <label htmlFor="username">Username</label>
//         </FloatLabel>

//         <FloatLabel style={{ marginTop: '15px' }}>
//           <Password
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             toggleMask
//             feedback={false}
//             style={{ width: '100%' }}
//           />
//           <label htmlFor="password">Password</label>
//         </FloatLabel>

//         <Button
//           type="submit"
//           label="Login"
//           className="p-button-raised p-button-primary"
//           disabled={loading}
//           style={{ marginTop: '20px' }}
//         />
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';

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
        navigate('/home');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{margin:"10px"}}>
      {/* <div className="card shadow-lg" style={{ maxWidth: '400px', width: '90%'}}> */}
        <div className="card-body">
          {/* <h2 className="card-title text-center mb-4">Login</h2> */}
          
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
                  Loading...
                </>
              ) : 'Login'}
            </button>
          </form>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Login;