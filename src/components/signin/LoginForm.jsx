import React, { useState } from 'react';
import { validate } from '../validate';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, 'login');
    if (Object.keys(validationErrors).length === 0) {
      // Retrieve existing users and ensure it's an array
      const usersData = localStorage.getItem('user');
      const existingUsers = usersData ? JSON.parse(usersData) : [];

      // Debugging logs
      console.log('Stored Users:', existingUsers);
      console.log('Login Attempt:', formData);

      const valuesArray = Object.values(existingUsers);
      console.log(valuesArray, "valuesArray")

      // Ensure existingUsers is an array
      //   if (!Array.isArray(valuesArray)) {
      //     console.error('Data in localStorage is not an array');
      //     setErrors({ email: 'Unexpected error occurred' });
      //     return;
      //   }

      // Check if user exists and credentials match
      //   const user = valuesArray.find(user => user.email === formData.email && user.password === formData.password);
      //   console.log(user, "checkuser");

      if (existingUsers) {
        setSuccess('Login successful!');
        navigate("/Products")
        setErrors({});
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 text-left">Email:</label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <div className="text-red-500 text-sm text-left">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 text-left">Password:</label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.password && <div className="text-red-500 text-sm text-left">{errors.password}</div>}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        {success && <div className="mt-4 text-green-500 text-sm">{success}</div>}
      </form>
      <p className="mt-4 text-center text-sm">Don’t have an account?
        </p>
        <Link to="/SignUpForm" className="text-indigo-600 hover:text-indigo-800 font-medium">
        <p>Register</p>
        </Link>
    </div>
  );
};

export default LoginForm;
