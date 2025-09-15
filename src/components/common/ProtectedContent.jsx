import React, { useState, useEffect } from 'react';

const ProtectedContent = React.memo(({
  requiredRole = 'subscriber',
  showPreview = true,
  disabledOpacity = 0.5,
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

  const hasAccess = isAuthenticated && checkRoleAccess(userRole, requiredRole);

  if (!hasAccess && showPreview) {
    return (
      <div className="relative">
        {/* Disabled preview with overlay */}
        <div
          style={{ opacity: disabledOpacity }}
          className="pointer-events-none select-none"
        >
          {children}
        </div>

        {/* Subtle overlay with access prompt */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/75 rounded">
          <div className="text-center p-4">
            {!isAuthenticated ? (
              <>
                <p className="text-gray-300 text-sm mb-2">Log in to use this feature</p>
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors"
                >
                  Log In
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-300 text-sm mb-2">Premium feature</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                  onClick={() => {
                    // TODO: Add upgrade flow
                  }}
                >
                  Upgrade
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return hasAccess ? children : null;
});

// Role hierarchy checker (duplicate for component isolation)
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

ProtectedContent.displayName = 'ProtectedContent';
export default ProtectedContent;