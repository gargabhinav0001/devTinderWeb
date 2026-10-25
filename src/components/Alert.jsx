export default function Alert({ alert, onClose }) {
  if (!alert) return null;

  const styles = {
    success: {
      className: "alert-success",
      icon: "✓",
    },
    error: {
      className: "alert-error",
      icon: "✕",
    },
    warning: {
      className: "alert-warning",
      icon: "⚠",
    },
    info: {
      className: "alert-info",
      icon: "ⓘ",
    },
  };

  const current = styles[alert.type] || styles.info;

  return (
    <div className="toast toast-top toast-end z-50">
      <div role="alert" className={`alert ${current.className} shadow-lg`}>
        <span className="text-xl font-bold">{current.icon}</span>

        <span>{alert.message}</span>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onClose}
          aria-label="Close alert"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
