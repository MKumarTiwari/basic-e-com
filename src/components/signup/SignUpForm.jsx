import React, { useState } from 'react';
import { validate } from '../validate';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    IsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, 'signUp');
    if (Object.keys(validationErrors).length === 0) {
      // Check if email already exists
      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser && existingUser.email === formData.email) {
        setErrors({ email: 'Email is already registered' });
      } else {
        // Save new user data
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }));
        setSuccess('Sign-up successful!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          IsAccepted: false
        });
        setErrors({});
        navigate("/")
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">Sign-Up</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-3">Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && <div className="text-red-500 text-sm text-left">{errors.name}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left	mb-3">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <div className="text-red-500 text-sm text-left">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left mb-3">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && <div className="text-red-500 text-sm text-left">{errors.password}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 text-left mb-3">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.confirmPassword && <div className="text-red-500 text-sm text-left">{errors.confirmPassword}</div>}
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="IsAccepted"
          name="IsAccepted"
          checked={formData.IsAccepted}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="IsAccepted" className="ml-2 block text-sm text-gray-700">I accept the terms</label>
        {errors.IsAccepted && <div className="text-red-500 text-sm ml-2 text-left">{errors.IsAccepted}</div>}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign Up
      </button>
      {success && <div className="mt-4 text-green-500 text-sm">{success}</div>}
    </form>
  </div>
  );
};

export default SignUpForm;
