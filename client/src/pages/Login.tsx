import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      login(response.data.token);
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Login failed: ' + (error.response?.data?.error || error.message));
      } else {
        alert('Login failed: ' + String(error));
      }
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-6 text-center font-bold text-dark-blue">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-light-blue"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-light-blue"
            />
          </div>
          <button type="submit" className="w-full bg-light-blue text-white p-3 rounded hover:bg-dark-blue transition">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
