import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEDREP');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, role });
      login(response.data.token);
      navigate('/dashboard'); // Redirect to the dashboard or main page after successful registration
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Registration failed: ' + (error.response?.data?.error || error.message));
      } else {
        alert('Registration failed: ' + String(error));
      }
      console.error('Register failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-6 text-center font-bold text-dark-blue">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-light-blue"
            />
          </div>
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-light-blue"
            >
              <option value="MEDREP">Medical Representative</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-light-blue text-white p-3 rounded hover:bg-dark-blue transition">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
