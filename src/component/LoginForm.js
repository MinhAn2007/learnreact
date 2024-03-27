import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import List from './List';

function LoginForm() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Create navigation instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        username,
        password
      });
      const accessToken = response.data.access_token;
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      console.log('accessToken:', accessToken);
      alert('Đăng nhập thành công');

      // Trigger navigation to the List component after successful login
      navigate('/list'); // Replace with your actual route path for List

    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Tên người dùng</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default LoginForm;