import React, { useState, useEffect } from 'react';

const AuthGate = React.memo(({
  requiredRole = 'subscriber',
  fallbackContent = null,
  loginPrompt = "Please log in to use this feature",
  upgradePrompt = "Upgrade to Premium for access",
  children
}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    // Listen for auth state changes
    const handleAuthSuccess = (event) => {
      const { user: userData } = event.detail;
      setUser(userData);
    };

    const handleLogout = () => {
      setUser(null);
    };

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
        if (window.rwpCctGlobalAuth?.currentUser?.isLoggedIn) {
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

  const openAuthModal = (formType = 'login') => {
    const event = new CustomEvent('rwp-cct-open-auth-modal', {
      detail: { formType }
    });
    window.dispatchEvent(event);
  };

  const isAuthenticated = !!user;
  const userRole = user?.role || 'guest';

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Guest users - show fallback or login prompt
  if (!isAuthenticated) {
    return fallbackContent || (
      <div className="text-center p-4 border border-gray-600 rounded bg-gray-800/50">
        <p className="text-gray-300 text-sm mb-3">{loginPrompt}</p>
        <button
          onClick={() => openAuthModal('login')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Log In / Register
        </button>
      </div>
    );
  }

  // Check role access
  const hasAccess = checkRoleAccess(userRole, requiredRole);

  if (!hasAccess) {
    return (
      <div className="text-center p-4 border border-gray-600 rounded bg-gray-800/50">
        <p className="text-gray-300 text-sm mb-3">{upgradePrompt}</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
          onClick={() => {
            // TODO: Add upgrade flow
          }}
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  return children;
});

// Role hierarchy checker
const checkRoleAccess = (userRole, requiredRole) => {
  const roleHierarchy = {
    'guest': 0,
    'subscriber': 1,
    'rwp_cct_premium': 2,
    'contributor': 3,
    'author': 3,
    'editor': 4,
    'administrator': 5
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

AuthGate.displayName = 'AuthGate';
export default AuthGate;