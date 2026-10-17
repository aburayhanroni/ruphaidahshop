import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '@/App';
import { formatBDT, toBengaliNumerals, formatQuantity } from '@/lib/formatters';

describe('BDT Currency & Numeral Formatters', () => {
  it('formats standard English BDT correctly with symbol and decimals', () => {
    expect(formatBDT(1250.5)).toBe('৳ 1,250.50');
    expect(formatBDT(0)).toBe('৳ 0.00');
    expect(formatBDT(100000)).toBe('৳ 1,00,000.00');
  });

  it('formats Bengali numerals correctly', () => {
    expect(toBengaliNumerals(12345)).toBe('১২৩৪৫');
    expect(formatBDT(500, { locale: 'bn-BD' })).toBe('৳ ৫০০.০০');
  });

  it('formats quantities with unit of measure', () => {
    expect(formatQuantity(24, 'pcs')).toBe('24 pcs');
    expect(formatQuantity(1000, 'boxes')).toBe('1,000 boxes');
  });
});

describe('App Shell & Design System Smoke Tests', () => {
  it('renders the application shell without throwing', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /Ruphaidah Shop Management/i })).toBeInTheDocument();
    expect(screen.getByText(/Phase 1: Step 2 Complete/i)).toBeInTheDocument();
  });

  it('navigates to the Design System Showcase upon button click', () => {
    render(<App />);
    const exploreButton = screen.getByRole('button', { name: /Explore Design System/i });
    fireEvent.click(exploreButton);
    expect(screen.getByText(/UI Component System & Accessible Foundations/i)).toBeInTheDocument();
  });
});
