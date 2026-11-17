import { render, screen } from '@testing-library/react';
import App from './App';
import { contact, projects } from './data';

test('shows the name, the offer and a way to get in touch', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/xeka\s*creative/i);
  expect(screen.getByText(/open for commissions/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /get in touch/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: contact.email })).toHaveAttribute('href', `mailto:${contact.email}`);
});

test('every edit has a poster that can be played', () => {
  render(<App />);
  projects.forEach((project) => {
    expect(screen.getAllByRole('button', { name: `Play ${project.title}` }).length).toBeGreaterThan(0);
  });
});
