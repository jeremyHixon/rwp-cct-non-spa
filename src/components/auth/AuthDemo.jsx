import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, RotateCcw } from 'lucide-react';

const AuthDemo = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo only - no actual functionality
    console.log(`${activeForm} form submitted:`, formData);
  };

  const FormTabs = () => (
    <div className="flex space-x-1 bg-dark-900 p-1 rounded-lg mb-8">
      <button
        onClick={() => setActiveForm('login')}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeForm === 'login'
            ? 'bg-primary-600 text-white'
            : 'text-dark-400 hover:text-white hover:bg-dark-800'
        }`}
      >
        <LogIn className="w-4 h-4 inline mr-2" />
        Login
      </button>
      <button
        onClick={() => setActiveForm('register')}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeForm === 'register'
            ? 'bg-primary-600 text-white'
            : 'text-dark-400 hover:text-white hover:bg-dark-800'
        }`}
      >
        <UserPlus className="w-4 h-4 inline mr-2" />
        Register
      </button>
      <button
        onClick={() => setActiveForm('reset')}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeForm === 'reset'
            ? 'bg-primary-600 text-white'
            : 'text-dark-400 hover:text-white hover:bg-dark-800'
        }`}
      >
        <RotateCcw className="w-4 h-4 inline mr-2" />
        Reset
      </button>
    </div>
  );

  const LoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="rwp-cct-form-title">
        <LogIn className="w-6 h-6 inline mr-2" />
        Welcome Back
      </h2>
      <p className="rwp-cct-form-subtitle">Sign in to your account</p>

      <div className="rwp-cct-form-group">
        <label htmlFor="email" className="rwp-cct-label">
          <Mail className="w-4 h-4 inline mr-2" />
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="rwp-cct-input"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="rwp-cct-form-group">
        <label htmlFor="password" className="rwp-cct-label">
          <Lock className="w-4 h-4 inline mr-2" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rwp-cct-input pr-12"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2 rounded border-dark-600 bg-dark-900 text-primary-600" />
          <span className="text-sm text-dark-400">Remember me</span>
        </label>
        <a href="#" className="rwp-cct-link text-sm">Forgot password?</a>
      </div>

      <button type="submit" className="rwp-cct-button">
        Sign In
      </button>

      <p className="text-center text-dark-400 text-sm">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => setActiveForm('register')}
          className="rwp-cct-link"
        >
          Sign up
        </button>
      </p>
    </form>
  );

  const RegisterForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="rwp-cct-form-title">
        <UserPlus className="w-6 h-6 inline mr-2" />
        Create Account
      </h2>
      <p className="rwp-cct-form-subtitle">Join our community today</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rwp-cct-form-group">
          <label htmlFor="firstName" className="rwp-cct-label">
            <User className="w-4 h-4 inline mr-2" />
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="rwp-cct-input"
            placeholder="First name"
            required
          />
        </div>
        <div className="rwp-cct-form-group">
          <label htmlFor="lastName" className="rwp-cct-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="rwp-cct-input"
            placeholder="Last name"
            required
          />
        </div>
      </div>

      <div className="rwp-cct-form-group">
        <label htmlFor="email" className="rwp-cct-label">
          <Mail className="w-4 h-4 inline mr-2" />
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="rwp-cct-input"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="rwp-cct-form-group">
        <label htmlFor="password" className="rwp-cct-label">
          <Lock className="w-4 h-4 inline mr-2" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rwp-cct-input pr-12"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="rwp-cct-form-group">
        <label htmlFor="confirmPassword" className="rwp-cct-label">
          <Lock className="w-4 h-4 inline mr-2" />
          Confirm Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="rwp-cct-input"
          placeholder="Confirm your password"
          required
        />
      </div>

      <div className="flex items-center">
        <input type="checkbox" className="mr-2 rounded border-dark-600 bg-dark-900 text-primary-600" required />
        <span className="text-sm text-dark-400">
          I agree to the{' '}
          <a href="#" className="rwp-cct-link">Terms of Service</a> and{' '}
          <a href="#" className="rwp-cct-link">Privacy Policy</a>
        </span>
      </div>

      <button type="submit" className="rwp-cct-button">
        Create Account
      </button>

      <p className="text-center text-dark-400 text-sm">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setActiveForm('login')}
          className="rwp-cct-link"
        >
          Sign in
        </button>
      </p>
    </form>
  );

  const ResetForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="rwp-cct-form-title">
        <RotateCcw className="w-6 h-6 inline mr-2" />
        Reset Password
      </h2>
      <p className="rwp-cct-form-subtitle">Enter your email to receive reset instructions</p>

      <div className="rwp-cct-form-group">
        <label htmlFor="email" className="rwp-cct-label">
          <Mail className="w-4 h-4 inline mr-2" />
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="rwp-cct-input"
          placeholder="Enter your email"
          required
        />
      </div>

      <button type="submit" className="rwp-cct-button">
        Send Reset Instructions
      </button>

      <button
        type="button"
        onClick={() => setActiveForm('login')}
        className="rwp-cct-button-secondary"
      >
        Back to Login
      </button>

      <p className="text-center text-dark-400 text-sm">
        Remember your password?{' '}
        <button
          type="button"
          onClick={() => setActiveForm('login')}
          className="rwp-cct-link"
        >
          Sign in
        </button>
      </p>
    </form>
  );

  return (
    <div className="rwp-cct-container">
      <div className="rwp-cct-form">
        <FormTabs />
        {activeForm === 'login' && <LoginForm />}
        {activeForm === 'register' && <RegisterForm />}
        {activeForm === 'reset' && <ResetForm />}
      </div>
    </div>
  );
};

export default AuthDemo;