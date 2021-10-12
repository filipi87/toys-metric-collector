import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders home page', () => {
  render(<App />);
  const homePageElement = screen.getByText(/Toys/);
  expect(homePageElement).toBeInTheDocument();
});
