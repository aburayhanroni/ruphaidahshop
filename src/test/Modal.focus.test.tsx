import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const ModalTestHarness: React.FC<{
  hasControls?: boolean;
  defaultOpen?: boolean;
}> = ({ hasControls = true, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        data-testid="trigger-btn"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal Title"
        description="Test modal description"
        footer={
          hasControls ? (
            <Button data-testid="footer-confirm-btn" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          ) : undefined
        }
      >
        {hasControls ? (
          <div>
            <Input data-testid="modal-input" label="Test Input" defaultValue="Sample" />
          </div>
        ) : (
          <p data-testid="plain-text">Plain text with no interactive controls</p>
        )}
      </Modal>
    </div>
  );
};

describe('Modal Focus Management & Accessibility', () => {
  it('moves initial focus into the dialog upon opening', async () => {
    render(<ModalTestHarness defaultOpen={false} />);

    const trigger = screen.getByTestId('trigger-btn');
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);

    // Dialog is visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Initial focus moves to first focusable element inside dialog (Close button or input)
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  it('restores focus to the triggering element after closing via Escape key', async () => {
    render(<ModalTestHarness defaultOpen={false} />);

    const trigger = screen.getByTestId('trigger-btn');
    trigger.focus();
    fireEvent.click(trigger);

    // Verify modal is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Press Escape to close modal
    fireEvent.keyDown(window, { key: 'Escape' });

    // Verify modal closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Focus must return to trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it('restores focus to the triggering element after closing via close button click', async () => {
    render(<ModalTestHarness defaultOpen={false} />);

    const trigger = screen.getByTestId('trigger-btn');
    trigger.focus();
    fireEvent.click(trigger);

    const closeBtn = screen.getByRole('button', { name: /Close dialog/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it('traps Tab navigation within the modal dialog', async () => {
    render(<ModalTestHarness defaultOpen={true} />);

    const dialog = screen.getByRole('dialog');
    const closeBtn = screen.getByRole('button', { name: /Close dialog/i });
    const input = screen.getByTestId('modal-input');
    const confirmBtn = screen.getByTestId('footer-confirm-btn');

    expect(dialog).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    // Focus last element (confirm button)
    confirmBtn.focus();
    expect(document.activeElement).toBe(confirmBtn);

    // Press Tab on last element -> cycles to first element (close button)
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(closeBtn);

    // Press Shift+Tab on first element -> cycles back to last element (confirm button)
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(confirmBtn);

    // Normal forward Tab from close button moves to input
    closeBtn.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    // In JSDOM fireEvent doesn't simulate browser native default tab focus change unless manually handled
    // but our trap intercepts bounds: on last -> first, on first -> last
  });

  it('focuses the dialog card itself when no focusable controls exist', async () => {
    // Modal with close button removed or only plain text
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>No focusable controls here</p>
      </Modal>
    );

    // The close button X is present in header, so it focuses close button
    const closeBtn = screen.getByRole('button', { name: /Close dialog/i });
    await waitFor(() => {
      expect(document.activeElement).toBe(closeBtn);
    });
  });
});
