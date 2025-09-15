import React from 'react';
import { createRoot } from 'react-dom/client';
import HeaderUserElement from './components/auth/HeaderUserElement';
import AuthModal from './components/auth/AuthModal';
import './styles.css';

// Initialize global auth components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // Initialize Header User Elements
  const headerContainers = document.querySelectorAll('.rwp-cct-user-header');
  headerContainers.forEach(container => {
    const root = createRoot(container);
    root.render(<HeaderUserElement container={container} />);
  });

  // Initialize Auth Modals
  const modalContainers = document.querySelectorAll('.rwp-cct-auth-modal');
  modalContainers.forEach(container => {
    const root = createRoot(container);
    root.render(<AuthModal container={container} />);
  });

});