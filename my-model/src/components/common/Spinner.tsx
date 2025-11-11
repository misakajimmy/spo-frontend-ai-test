import React from 'react';

const Spinner: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '1rem' }}>
    <svg width="48" height="48" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" r="45" stroke="#1890ff" strokeWidth="10" fill="none" strokeDasharray="283" strokeDashoffset="75"></circle>
    </svg>
  </div>
);

export default Spinner;