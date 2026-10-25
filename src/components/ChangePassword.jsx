import { useState } from "react";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const ChangePassword = ({ onUpdatePassword }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleVisibility = (field) => {
    setVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword.length < 8) {
      setError("Your new password must have at least 8 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      setError("Choose a password different from your current one.");
      return;
    }

    setLoading(true);

    try {
      await onUpdatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setSuccess("Your password has been changed successfully.");
    } catch (err) {
      setError(err.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "currentPassword",
      label: "Current password",
      placeholder: "Enter current password",
    },
    {
      name: "newPassword",
      label: "New password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm new password",
      placeholder: "Re-enter new password",
    },
  ];

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar placeholder">
            <div className="bg-success/10 text-success rounded-xl w-12">
              <ShieldCheck size={24} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Change password</h2>
            <p className="text-sm text-base-content/60">
              Keep your account secure.
            </p>
          </div>
        </div>

        <div className="alert mt-3">
          <LockKeyhole size={20} className="shrink-0" />
          <span className="text-sm">
            Use a strong, unique password that you don't use elsewhere.
          </span>
        </div>

        {error && (
          <div role="alert" className="alert alert-error mt-3">
            {error}
          </div>
        )}

        {success && (
          <div role="status" className="alert alert-success mt-3">
            <CheckCircle2 size={20} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="label">
                <span className="label-text font-medium">{field.label}</span>
              </label>

              <label className="input input-bordered flex items-center gap-2 w-full">
                <LockKeyhole
                  size={17}
                  className="text-base-content/50 shrink-0"
                />

                <input
                  type={visible[field.name] ? "text" : "password"}
                  className="grow min-w-0"
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  autoComplete={
                    field.name === "currentPassword"
                      ? "current-password"
                      : "new-password"
                  }
                  required
                  minLength={field.name !== "currentPassword" ? 8 : 1}
                />

                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={() => toggleVisibility(field.name)}
                  aria-label={
                    visible[field.name] ? "Hide password" : "Show password"
                  }
                >
                  {visible[field.name] ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </label>

              {field.name === "newPassword" && (
                <p className="text-xs text-base-content/50 mt-2">
                  Use at least 8 characters.
                </p>
              )}
            </div>
          ))}

          <div className="divider my-2" />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Updating password...
              </>
            ) : (
              "Update password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
