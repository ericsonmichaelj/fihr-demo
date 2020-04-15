import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn the app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/1Up Health Demo/i);
  expect(linkElement).toBeInTheDocument();
});
