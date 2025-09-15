import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthDemo from './components/auth/AuthDemo';
import './styles.css';

// Initialize React components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Find all auth demo containers
  const authDemoContainers = document.querySelectorAll('.rwp-cct-auth-demo');

  authDemoContainers.forEach(container => {
    const root = createRoot(container);
    root.render(<AuthDemo />);
  });
});