import React from 'react';
import { createRoot } from 'react-dom/client';
import CaptionGenerator from './components/caption-generator/CaptionGenerator';
import './styles.css';

class RWP_CCT_CaptionGenerator {
  static init(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      const root = createRoot(container);
      root.render(<CaptionGenerator />);
    } else {
      console.error('Caption Generator container not found:', containerId);
    }
  }
}

// Make it available globally for the shortcode
window.RWP_CCT_CaptionGenerator = RWP_CCT_CaptionGenerator;