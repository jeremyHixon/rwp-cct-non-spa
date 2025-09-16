import React, { useState, useEffect } from 'react';
import { CheckCircle, UserPlus, LogIn } from 'lucide-react';

const GuestConversionPrompt = ({
  toolName = "Caption Generator",
  completedAction = "Your captions are ready",
  customMessage = null
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  const getStoredToken = () => {
    return localStorage.getItem('rwp_cct_token') || localStorage.getItem('rwp_cct_jwt_token') || sessionStorage.getItem('rwp_cct_jwt_token');
  };

  // Check authentication status
  const checkAuthStatus = () => {
    const token = getStoredToken();
    setIsAuthenticated(!!token);
  };

  // Listen for authentication changes
  useEffect(() => {
    // Check initial auth status
    checkAuthStatus();

    // Listen for auth success events
    const handleAuthSuccess = () => {
      checkAuthStatus();
    };

    window.addEventListener('rwp-cct-auth-success', handleAuthSuccess);

    // Also listen for storage changes (in case token is set/removed in another tab)
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('rwp-cct-auth-success', handleAuthSuccess);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Only show to guests (non-authenticated users)
  if (isAuthenticated) {
    return null;
  }

  // Open authentication modal functions
  const openModal = (formType) => {
    window.dispatchEvent(new CustomEvent('rwp-cct-open-auth-modal', {
      detail: { formType }
    }));
  };

  const handleCreateAccount = () => {
    openModal('register');
  };

  const handleSignIn = () => {
    openModal('login');
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-8 text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-600/20 rounded-full p-3">
          <CheckCircle className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">
        {completedAction}
      </h3>

      {customMessage ? (
        <p className="text-gray-300 mb-6 leading-relaxed">
          {customMessage}
        </p>
      ) : (
        <p className="text-gray-300 mb-6 leading-relaxed">
          Sign up free to access your results.
        </p>
      )}

      {/* Benefits list */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-center space-x-3 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-gray-300">Free account</span>
        </div>
        <div className="flex items-center justify-center space-x-3 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-gray-300">No credit card required</span>
        </div>
        <div className="flex items-center justify-center space-x-3 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-gray-300">Access immediately</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleCreateAccount}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create Free Account</span>
        </button>
        <button
          onClick={handleSignIn}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      </div>

      {/* Tool-specific note */}
      <p className="text-xs text-gray-500 mt-6">
        Create an account to save and access your {toolName} results anytime
      </p>
    </div>
  );
};

export default GuestConversionPrompt;