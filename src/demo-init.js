import React from 'react';
import { createRoot } from 'react-dom/client';
import ProtectedDemo from './components/demo/ProtectedDemo';

document.addEventListener('DOMContentLoaded', () => {
  window.RWP_CCT_ProtectedDemo = {
    init: (containerId) => {
      const container = document.getElementById(containerId);
      if (container) {
        const root = createRoot(container);
        root.render(<ProtectedDemo />);

        // Initial status update after component renders
        setTimeout(updateAuthStatus, 100);

        document.addEventListener('rwp-cct-auth-success', updateAuthStatus);
        document.addEventListener('rwp-cct-auth-logout', updateAuthStatus);
      }
    }
  };
});

function updateAuthStatus() {
  const statusElement = document.getElementById('rwp-cct-current-status');

  if (!statusElement) {
    return;
  }

  // Check both token keys for compatibility
  const token = localStorage.getItem('rwp_cct_token') || localStorage.getItem('rwp_cct_jwt_token');
  const userRole = localStorage.getItem('rwp_cct_user_role') || 'guest';
  const isAuthenticated = !!token;

  statusElement.innerHTML = `
    <div class="space-y-1">
      <div><strong>Authenticated:</strong> ${isAuthenticated ? 'Yes' : 'No'}</div>
      <div><strong>Role:</strong> ${getRoleDisplayName(userRole)}</div>
      <div><strong>Access Level:</strong> ${getAccessLevel(userRole)}</div>
    </div>
  `;
}

function getRoleDisplayName(role) {
  const roleMap = {
    'guest': 'Guest',
    'subscriber': 'Subscriber',
    'rwp_cct_premium': 'Premium',
    'contributor': 'Admin',
    'author': 'Admin',
    'editor': 'Admin',
    'administrator': 'Admin'
  };
  return roleMap[role] || 'Unknown';
}

function getAccessLevel(role) {
  const levels = {
    'guest': 'None',
    'subscriber': 'Basic',
    'rwp_cct_premium': 'Premium',
    'contributor': 'Premium+',
    'author': 'Premium+',
    'editor': 'Premium+',
    'administrator': 'Premium+'
  };
  return levels[role] || 'Unknown';
}