import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';

describe('AppShell Keyboard Shortcut Guarding (F2 / F4)', () => {
  it('navigates to POS (F4) and Catalog (F2) when user is not editing and no dialog is open', () => {
    const handleSelectView = vi.fn();

    render(
      <AppShell currentView="dashboard" onSelectView={handleSelectView}>
        <div>Main content area</div>
      </AppShell>
    );

    // Press F4 -> opens POS
    fireEvent.keyDown(window, { key: 'F4' });
    expect(handleSelectView).toHaveBeenCalledWith('pos');

    // Press F2 -> opens Catalog
    fireEvent.keyDown(window, { key: 'F2' });
    expect(handleSelectView).toHaveBeenCalledWith('catalog');
  });

  it('does NOT navigate when focus is inside an input element', () => {
    const handleSelectView = vi.fn();

    render(
      <AppShell currentView="dashboard" onSelectView={handleSelectView}>
        <div>
          <input data-testid="test-input" type="text" placeholder="Type here..." />
        </div>
      </AppShell>
    );

    const input = screen.getByTestId('test-input');
    input.focus();

    // Trigger F4 while focused on input
    fireEvent.keyDown(input, { key: 'F4' });
    expect(handleSelectView).not.toHaveBeenCalled();

    // Trigger F2 while focused on input
    fireEvent.keyDown(input, { key: 'F2' });
    expect(handleSelectView).not.toHaveBeenCalled();
  });

  it('does NOT navigate when focus is inside a textarea element', () => {
    const handleSelectView = vi.fn();

    render(
      <AppShell currentView="dashboard" onSelectView={handleSelectView}>
        <div>
          <textarea data-testid="test-textarea" placeholder="Notes..." />
        </div>
      </AppShell>
    );

    const textarea = screen.getByTestId('test-textarea');
    textarea.focus();

    fireEvent.keyDown(textarea, { key: 'F4' });
    expect(handleSelectView).not.toHaveBeenCalled();
  });

  it('does NOT navigate when focus is inside a select element', () => {
    const handleSelectView = vi.fn();

    render(
      <AppShell currentView="dashboard" onSelectView={handleSelectView}>
        <div>
          <select data-testid="test-select">
            <option value="1">Option 1</option>
          </select>
        </div>
      </AppShell>
    );

    const select = screen.getByTestId('test-select');
    select.focus();

    fireEvent.keyDown(select, { key: 'F2' });
    expect(handleSelectView).not.toHaveBeenCalled();
  });

  it('does NOT navigate when a modal dialog is open in the DOM', () => {
    const handleSelectView = vi.fn();

    render(
      <AppShell currentView="dashboard" onSelectView={handleSelectView}>
        <div>
          {/* Simulated open modal dialog */}
          <div role="dialog" aria-modal="true">
            <button data-testid="dialog-btn">Dialog Action</button>
          </div>
        </div>
      </AppShell>
    );

    // Target is outside or inside dialog while dialog is open
    fireEvent.keyDown(window, { key: 'F4' });
    expect(handleSelectView).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: 'F2' });
    expect(handleSelectView).not.toHaveBeenCalled();
  });

  it('ignores modified keys like Alt+F4 or Ctrl+F4', () => {
    const handleSelectView = vi.fn();

    render(
      <AppShell currentView="dashboard" onSelectView={handleSelectView}>
        <div>Main content</div>
      </AppShell>
    );

    // Alt+F4 (Windows window close)
    fireEvent.keyDown(window, { key: 'F4', altKey: true });
    expect(handleSelectView).not.toHaveBeenCalled();

    // Ctrl+F4 (Tab close)
    fireEvent.keyDown(window, { key: 'F4', ctrlKey: true });
    expect(handleSelectView).not.toHaveBeenCalled();
  });
});
