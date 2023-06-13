// App.test.js

import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders Pokémon App link', async () => {
  await act(async () => {
    render(<App />);
  });
  const linkElement = screen.getByText(/Pokémon App/i);
  expect(linkElement).toBeInTheDocument();
});
