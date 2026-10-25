import { useState } from "react";
import {
  Camera,
  UserRound,
  Plus,
  X,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const EditProfile = ({ user, onUpdate }) => {
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    skills: user?.skills || [],
    photoUrl: user?.photoUrl || "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = (e) => {
    e.preventDefault();

    const skill = skillInput.trim();

    if (
      !skill ||
      form.skills.some((item) => item.toLowerCase() === skill.toLowerCase())
    ) {
      return;
    }

    updateField("skills", [...form.skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    updateField(
      "skills",
      form.skills.filter((skill) => skill !== skillToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Pass updated profile data to your API handler.
      await onUpdate(form);
      setSuccess("Your profile has been updated!");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim() || "Your Name";

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar placeholder">
            <div className="bg-primary/10 text-primary rounded-xl w-12">
              <UserRound size={24} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Edit profile</h2>
            <p className="text-sm text-base-content/60">
              Make your profile yours.
            </p>
          </div>
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

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Profile photo */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Profile photo</span>
            </label>

            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-20 h-20 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                  {form.photoUrl ? (
                    <img
                      src={form.photoUrl}
                      alt="Profile preview"
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex items-center justify-center">
                      <UserRound size={32} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <p className="font-semibold">{fullName}</p>
                <p className="text-xs text-base-content/60 mb-2">
                  Use a publicly accessible image URL.
                </p>

                <label className="input input-bordered input-sm flex items-center gap-2">
                  <Camera size={16} className="shrink-0" />
                  <input
                    type="url"
                    className="grow"
                    placeholder="https://example.com/photo.jpg"
                    value={form.photoUrl}
                    onChange={(e) => updateField("photoUrl", e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="divider my-1" />

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">First name</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                required
                maxLength={50}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Last name</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                required
                maxLength={50}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Bio</span>
              <span className="label-text-alt">{form.about.length}/160</span>
            </label>

            <textarea
              className="textarea textarea-bordered w-full min-h-28 resize-y"
              placeholder="Tell people a little about yourself..."
              value={form.about}
              onChange={(e) => updateField("about", e.target.value)}
              maxLength={160}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Skills & interests</span>
              <span className="label-text-alt">{form.skills.length} added</span>
            </label>

            <div className="flex gap-2">
              <input
                className="input input-bordered w-full"
                placeholder="e.g. React, UI Design"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addSkill(e);
                }}
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={addSkill}
                aria-label="Add skill"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-lg gap-2 py-4 bg-primary/10 text-primary border-0"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="hover:text-error"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            {form.skills.length === 0 && (
              <p className="text-sm text-base-content/50 mt-2">
                Add skills to help people discover your profile.
              </p>
            )}
          </div>

          <div className="divider my-1" />

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
