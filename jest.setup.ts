import '@testing-library/jest-dom';

// Estender os matchers do Jest para incluir toBeInTheDocument
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
} 