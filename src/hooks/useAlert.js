import { useState, useCallback } from "react";

export default function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "info", duration = 3000) => {
    setAlert({
      id: Date.now(),
      message,
      type,
    });

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        setAlert((current) => (current?.message === message ? null : current));
      }, duration);
    }
  }, []);

  const success = useCallback(
    (message, duration) => showAlert(message, "success", duration),
    [showAlert],
  );

  const error = useCallback(
    (message, duration) => showAlert(message, "error", duration),
    [showAlert],
  );

  const warning = useCallback(
    (message, duration) => showAlert(message, "warning", duration),
    [showAlert],
  );

  const info = useCallback(
    (message, duration) => showAlert(message, "info", duration),
    [showAlert],
  );

  const dismiss = useCallback(() => {
    setAlert(null);
  }, []);

  return {
    alert,
    showAlert,
    success,
    error,
    warning,
    info,
    dismiss,
  };
}
