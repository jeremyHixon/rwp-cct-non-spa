import React, { useState, useEffect } from 'react';
import { User, LogOut, Mail, Shield, LogIn, UserPlus } from 'lucide-react';

const HeaderUserElement = ({ container }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    // Listen for auth state changes
    window.addEventListener('rwp-cct-auth-success', handleAuthSuccess);
    window.addEventListener('rwp-cct-auth-logout', handleLogout);

    return () => {
      window.removeEventListener('rwp-cct-auth-success', handleAuthSuccess);
      window.removeEventListener('rwp-cct-auth-logout', handleLogout);
    };
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);

    try {
      // First check localStorage for JWT token
      const token = localStorage.getItem('rwp_cct_token');

      if (token) {
        // Verify token with API
        const response = await fetch(`${window.rwpCctGlobalAuth.apiUrl}auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token invalid, remove it
          localStorage.removeItem('rwp_cct_token');
          setUser(null);
        }
      } else {
        // Check if user is logged in via WordPress
        if (window.rwpCctGlobalAuth.currentUser?.isLoggedIn) {
          setUser(window.rwpCctGlobalAuth.currentUser);
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (event) => {
    const { user: userData, token } = event.detail;
    setUser(userData);

    // Store token in localStorage
    if (token) {
      localStorage.setItem('rwp_cct_token', token);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear JWT token
      localStorage.removeItem('rwp_cct_token');

      // If using WordPress session, redirect to logout URL
      if (window.rwpCctGlobalAuth.currentUser?.isLoggedIn) {
        window.location.href = window.rwpCctGlobalAuth.logoutUrl;
        return;
      }

      setUser(null);

      // Dispatch logout event
      window.dispatchEvent(new CustomEvent('rwp-cct-auth-logout'));

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const openModal = (formType = 'login') => {
    console.log('openModal called with formType:', formType);

    const event = new CustomEvent('rwp-cct-open-auth-modal', {
      detail: { formType }
    });

    console.log('Dispatching event:', event);
    window.dispatchEvent(event);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'administrator':
        return 'bg-gray-700 text-gray-200';
      case 'editor':
        return 'bg-purple-600 text-white';
      case 'author':
        return 'bg-green-600 text-white';
      case 'contributor':
        return 'bg-blue-600 text-white';
      case 'subscriber':
      default:
        return 'bg-gray-600 text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center text-gray-400">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-sm">Loading...</span>
      </div>
    );
  }

  if (user) {
    // Authenticated state
    return (
      <div className="flex items-center gap-3 text-white">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{user.email}</span>
          </div>

          {user.role && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
              <Shield className="w-3 h-3 inline mr-1" />
              {user.role}
            </span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-1 border border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 rounded-md text-sm transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  // Unauthenticated state
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          console.log('Login button clicked', e);
          openModal('login');
        }}
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button>
      <button
        onClick={(e) => {
          console.log('Register button clicked', e);
          openModal('register');
        }}
        className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span>Register</span>
      </button>
    </div>
  );
};

export default HeaderUserElement;