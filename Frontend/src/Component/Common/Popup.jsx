import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Popup.css';

/* ─────────────────────────────────────────
   Toast (fixed top-right notification)
   Usage:  <Toast type="success" message="Done!" onClose={fn} autoClose={3000} />
   ───────────────────────────────────────── */
export const Toast = ({ type = 'info', title, message, onClose, autoClose = 4000 }) => {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onClose?.(), 300);
  }, [onClose]);

  useEffect(() => {
    if (!autoClose) return;
    const t = setTimeout(dismiss, autoClose);
    return () => clearTimeout(t);
  }, [autoClose, dismiss]);

  if (!message && !title) return null;

  const meta = {
    success: { icon: '✓', label: title || 'Success' },
    error:   { icon: '✕', label: title || 'Error' },
    warning: { icon: '!', label: title || 'Warning' },
    info:    { icon: 'i', label: title || 'Info' },
  };

  const { icon, label } = meta[type] || meta.info;

  const el = (
    <div className={`lk-toast lk-toast--${type}${exiting ? ' lk-toast--exiting' : ''}`} role="alert">
      <div className="lk-toast__icon">{icon}</div>
      <div className="lk-toast__body">
        <div className="lk-toast__title">{label}</div>
        {message && <div className="lk-toast__msg">{message}</div>}
      </div>
      <button className="lk-toast__close" onClick={dismiss} aria-label="Dismiss">✕</button>
      {autoClose && (
        <div
          className="lk-toast__progress"
          style={{ animationDuration: `${autoClose}ms` }}
        />
      )}
    </div>
  );

  // Render into a portal so it floats above everything
  const container = document.getElementById('lk-toast-root') || (() => {
    const d = document.createElement('div');
    d.id = 'lk-toast-root';
    d.className = 'lk-toast-container';
    document.body.appendChild(d);
    return d;
  })();

  return ReactDOM.createPortal(el, container);
};

/* ─────────────────────────────────────────
   Inline Popup  (inside forms / cards)
   Drop-in replacement for the old Popup
   ───────────────────────────────────────── */
const Popup = ({ type = 'info', message, onClose, autoClose }) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const t = setTimeout(onClose, autoClose);
      return () => clearTimeout(t);
    }
  }, [autoClose, onClose]);

  if (!message) return null;

  const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };

  return (
    <div className={`lk-popup lk-popup--${type}`} role="alert">
      <span className="lk-popup__icon">{icons[type]}</span>
      <span className="lk-popup__msg">{message}</span>
      {onClose && (
        <button className="lk-popup__close" onClick={onClose} aria-label="Close">✕</button>
      )}
    </div>
  );
};

export default Popup;
