import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';

// Isolated form component for login
const LoginForm = React.memo(({ onSubmit, isLoading, error, success }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  // Load remember me preference on mount
  useEffect(() => {
    const rememberMe = localStorage.getItem('rwp_cct_remember_me') === 'true';
    if (rememberMe) {
      setFormData(prev => ({ ...prev, rememberMe: true }));
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(formData, 'login');
  }, [formData, onSubmit]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        <LogIn className="w-6 h-6 inline mr-2" />
        Welcome Back
      </h2>
      <p className="text-gray-400 text-center mb-6">Sign in to your account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            key="login-email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            <Lock className="w-4 h-4 inline mr-2" />
            Password
          </label>
          <div className="relative">
            <input
              key="login-password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-600"
            />
            <span className="text-sm text-gray-400">Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
            isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Signing In...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  );
});

// Isolated form component for registration
const RegisterForm = React.memo(({ onSubmit, isLoading, error, success }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, level: '', feedback: [] });
  const passwordStrengthTimeoutRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Debounced password strength check for registration form
    if (name === 'password') {
      // Clear existing timeout
      if (passwordStrengthTimeoutRef.current) {
        clearTimeout(passwordStrengthTimeoutRef.current);
      }

      if (value) {
        // Debounce password strength check to reduce re-renders
        passwordStrengthTimeoutRef.current = setTimeout(() => {
          checkPasswordStrength(value);
        }, 300);
      } else {
        setPasswordStrength({ score: 0, level: '', feedback: [] });
      }
    }
  }, []);

  const checkPasswordStrength = (password) => {
    // Use client-side password strength calculation
    const strength = getClientSidePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const getClientSidePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) {
      score++;
    } else {
      feedback.push('Use at least 8 characters');
    }

    if (/[a-z]/.test(password)) {
      score++;
    } else {
      feedback.push('Include lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      feedback.push('Include uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score++;
    } else {
      feedback.push('Include numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    } else {
      feedback.push('Include special characters');
    }

    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const level = levels[Math.min(score, 4)];

    return { score, level, feedback };
  };

  const getPasswordStrengthColor = (score) => {
    if (score === 0) return 'bg-gray-600';
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-yellow-500';
    if (score <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(formData, 'register');
  }, [formData, onSubmit]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (passwordStrengthTimeoutRef.current) {
        clearTimeout(passwordStrengthTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        <UserPlus className="w-6 h-6 inline mr-2" />
        Create Account
      </h2>
      <p className="text-gray-400 text-center mb-6">Start creating amazing content today</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            key="register-email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            <Lock className="w-4 h-4 inline mr-2" />
            Password
          </label>
          <div className="relative">
            <input
              key="register-password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a password (8+ characters)"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded ${
                      index < passwordStrength.score
                        ? getPasswordStrengthColor(passwordStrength.score)
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${
                  passwordStrength.score <= 1 ? 'text-red-400' :
                  passwordStrength.score <= 2 ? 'text-yellow-400' :
                  passwordStrength.score <= 3 ? 'text-blue-400' : 'text-green-400'
                }`}>
                  {passwordStrength.level}
                </span>
                {passwordStrength.feedback.length > 0 && (
                  <span className="text-xs text-gray-400">
                    {passwordStrength.feedback[0]}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
            isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
});

// Isolated form component for password reset
const ResetForm = React.memo(({ onSubmit, isLoading, error, success }) => {
  const [email, setEmail] = useState('');

  const handleInputChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit({ email }, 'reset');
  }, [email, onSubmit]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        <RotateCcw className="w-6 h-6 inline mr-2" />
        Reset Password
      </h2>
      <p className="text-gray-400 text-center mb-6">Enter your email to receive reset instructions</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            key="reset-email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
            isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Email...
            </div>
          ) : (
            'Send Reset Email'
          )}
        </button>
      </form>
    </div>
  );
});

// Main AuthModal component - only manages visibility and tab state
const AuthModal = React.memo(({ container }) => {
  console.log('🟢 AuthModal render (should only happen on visibility/tab changes)');

  const [isVisible, setIsVisible] = useState(false);
  const [activeForm, setActiveForm] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Listen for modal open events
    window.addEventListener('rwp-cct-open-auth-modal', handleOpenModal);

    // Listen for ESC key to close modal
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('rwp-cct-open-auth-modal', handleOpenModal);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update parent container classes when visibility changes
  useEffect(() => {
    if (container) {
      if (isVisible) {
        container.classList.remove('rwp-cct-modal-hidden');
        container.classList.add('rwp-cct-modal-visible');
      } else {
        container.classList.remove('rwp-cct-modal-visible');
        container.classList.add('rwp-cct-modal-hidden');
      }
    }
  }, [isVisible, container]);

  const handleOpenModal = useCallback((event) => {
    console.log('AuthModal: handleOpenModal called', event);

    const { formType } = event.detail || {};
    console.log('AuthModal: formType from event:', formType);

    if (formType) {
      setActiveForm(formType);
    }
    setIsVisible(true);
    resetForm();

    console.log('AuthModal: Modal should now be visible, isVisible:', true);
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && isVisible) {
      closeModal();
    }
  }, [isVisible]);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    resetForm();
  }, []);

  const resetForm = useCallback(() => {
    setError('');
    setSuccess('');
    setIsLoading(false);
  }, []);

  const validateForm = useCallback((formData, formType) => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formType === 'register') {
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }

      // Basic strength requirement - at least one letter and one number
      if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
        setError('Password must contain at least one letter and one number');
        return false;
      }
    }

    return true;
  }, []);

  const handleFormSubmit = useCallback(async (formData, formType) => {
    // Clear errors when user starts typing (only if there is an error)
    if (error) {
      setError('');
    }

    if (formType !== 'reset' && !validateForm(formData, formType)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (formType === 'reset') {
        // Handle password reset
        const response = await fetch(`${window.rwpCctGlobalAuth.apiUrl}auth/reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.rwpCctGlobalAuth.nonce
          },
          body: JSON.stringify({ email: formData.email })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSuccess('Password reset instructions have been sent to your email.');
          // Don't close modal for reset - let user read the message
        } else {
          setError(data.message || 'Failed to send reset email. Please try again.');
        }
      } else {
        // Handle login/register
        const endpoint = formType === 'register' ? 'auth/register' : 'auth/login';
        const payload = {
          email: formData.email,
          password: formData.password
        };

        const response = await fetch(`${window.rwpCctGlobalAuth.apiUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.rwpCctGlobalAuth.nonce
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSuccess(formType === 'register' ? 'Account created successfully! Welcome!' : 'Welcome back!');

          // Store JWT token
          localStorage.setItem('rwp_cct_token', data.token);

          // Store remember me preference for login
          if (formType === 'login' && formData.rememberMe) {
            localStorage.setItem('rwp_cct_remember_me', 'true');
          } else {
            localStorage.removeItem('rwp_cct_remember_me');
          }

          // Dispatch auth success event
          window.dispatchEvent(new CustomEvent('rwp-cct-auth-success', {
            detail: {
              user: data.user,
              token: data.token
            }
          }));

          // Close modal after short delay
          setTimeout(() => {
            closeModal();
          }, 1500);

        } else {
          setError(data.message || 'Authentication failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [error, validateForm, closeModal]);

  const FormTabs = useCallback(() => (
    <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-6">
      <button
        type="button"
        onClick={() => setActiveForm('login')}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeForm === 'login'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        <LogIn className="w-4 h-4 inline mr-2" />
        Login
      </button>
      <button
        type="button"
        onClick={() => setActiveForm('register')}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeForm === 'register'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        <UserPlus className="w-4 h-4 inline mr-2" />
        Register
      </button>
      <button
        type="button"
        onClick={() => setActiveForm('reset')}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeForm === 'reset'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        <RotateCcw className="w-4 h-4 inline mr-2" />
        Reset
      </button>
    </div>
  ), [activeForm]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  const handleResetLinkClick = useCallback(() => {
    setActiveForm('reset');
  }, []);

  const handleFormSwitchClick = useCallback((formType) => {
    setActiveForm(formType);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="absolute inset-0"
      onClick={handleBackdropClick}
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="modal-content">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
        </button>

        <FormTabs />

        <div className="space-y-6">
          {activeForm === 'login' && (
            <LoginForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          )}
          {activeForm === 'register' && (
            <RegisterForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          )}
          {activeForm === 'reset' && (
            <ResetForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-600/20 border border-red-600/30 rounded-md text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-600/20 border border-green-600/30 rounded-md text-green-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {activeForm === 'login' && (
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleResetLinkClick}
                className="text-sm text-blue-400 hover:text-blue-300 block"
                disabled={isLoading}
              >
                Forgot password?
              </button>
              <p className="text-center text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleFormSwitchClick('register')}
                  className="text-blue-400 hover:text-blue-300"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {activeForm === 'register' && (
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleFormSwitchClick('login')}
                className="text-blue-400 hover:text-blue-300"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          )}

          {activeForm === 'reset' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleFormSwitchClick('login')}
                className="text-sm text-blue-400 hover:text-blue-300"
                disabled={isLoading}
              >
                ← Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

AuthModal.displayName = 'AuthModal';
LoginForm.displayName = 'LoginForm';
RegisterForm.displayName = 'RegisterForm';
ResetForm.displayName = 'ResetForm';

export default AuthModal;