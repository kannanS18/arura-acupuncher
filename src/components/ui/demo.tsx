import React from 'react';
import { StackedCards } from './glass-cards';
import '../../index.css';

// Demo component showcasing the stacked cards with clinic theme
export const DefaultDemo: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#09090b'
    }}>
      <StackedCards />
    </div>
  );
};

// Alternative demo with gradient styling
export const AlternativeDemo: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)'
    }}>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'white', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
        }}>
          Alternative Style Demo
        </h1>
        <StackedCards />
      </div>
    </div>
  );
};

export default DefaultDemo;
