import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  photoUrl: "",
  about: "",
  skills: [],
};

export default function SignupPage({ onSignup }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [skill, setSkill] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Skills management
  const addSkill = () => {
    const value = skill.trim();

    if (!value || form.skills.length >= 10) return;

    if (form.skills.some((item) => item.toLowerCase() === value.toLowerCase()))
      return;

    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));

    setSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skillToRemove),
    }));
  };

  // Frontend validation
  const validateForm = () => {
    const newErrors = {};

    if (form.firstName.trim().length < 3)
      newErrors.firstName = "Minimum 3 characters required";

    if (form.lastName.trim().length < 3)
      newErrors.lastName = "Minimum 3 characters required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!strongPassword.test(form.password))
      newErrors.password =
        "Use 8+ characters with uppercase, lowercase, number and symbol";

    if (form.age && (+form.age < 1 || +form.age > 120))
      newErrors.age = "Enter a valid age";

    if (form.photoUrl && !/^https?:\/\/.+/i.test(form.photoUrl))
      newErrors.photoUrl = "Enter a valid image URL";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        age: form.age ? Number(form.age) : undefined,
      };

      const response = await onSignup?.(payload);
      if (response && response.status === 200) {
        setForm(initialForm);
        navigate("/feed");
      } else {
        alert(response?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-300 shadow-sm px-4 lg:px-12">
        <div className="flex-1">
          <a className="text-2xl font-black">
            {" "}
            mingle<span className="text-primary">.</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-sm">
            Already have an account?
          </span>
          <a
            href="/login"
            className="btn btn-outline btn-primary btn-sm rounded-full"
          >
            Login
          </a>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 lg:p-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Branding Section */}
          <section className="hidden lg:flex flex-col justify-center gap-8 p-8">
            <div className="badge badge-secondary badge-outline p-4 gap-2">
              <span className="animate-pulse">💗</span>
              Your next connection starts here
            </div>

            <div>
              <h1 className="text-6xl font-black leading-tight">
                Find Your
                <br />
                People,
                <br />
                <span className="text-primary">Find Your Vibe.</span>
              </h1>

              <p className="text-lg text-base-content/60 mt-6 max-w-md">
                Meet interesting people, share your stories, discover new
                interests and build meaningful connections.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-primary text-primary-content shadow-xl">
                <div className="card-body">
                  <div className="text-4xl">💬</div>
                  <h3 className="card-title">Real Connections</h3>
                  <p className="text-sm opacity-80">
                    Conversations that matter.
                  </p>
                </div>
              </div>

              <div className="card bg-secondary text-secondary-content shadow-xl">
                <div className="card-body">
                  <div className="text-4xl">🌎</div>
                  <h3 className="card-title">New Perspectives</h3>
                  <p className="text-sm opacity-80">
                    Discover people and interests.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="avatar-group -space-x-4">
                {["A", "J", "M", "S"].map((name, i) => (
                  <div className="avatar placeholder" key={name}>
                    <div
                      className={`w-10 text-white ${
                        ["bg-primary", "bg-secondary", "bg-accent", "bg-info"][
                          i
                        ]
                      }`}
                    >
                      <span>{name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-base-content/60">
                Your community is waiting for you ✨
              </p>
            </div>
          </section>

          {/* Signup Card */}
          <section className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-5 sm:p-8">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="text-5xl animate-bounce mb-3">💖</div>

                <h2 className="text-3xl font-black">Create Account</h2>

                <p className="text-base-content/60 mt-2">
                  Join the community. Be yourself.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* First Name & Last Name */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name *</legend>

                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={updateField}
                      placeholder="John"
                      className={`input w-full ${
                        errors.firstName ? "input-error" : "input-bordered"
                      }`}
                      required
                      minLength={3}
                      maxLength={50}
                    />

                    {errors.firstName && (
                      <p className="text-error text-xs">{errors.firstName}</p>
                    )}
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name *</legend>

                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={updateField}
                      placeholder="Doe"
                      className={`input w-full ${
                        errors.lastName ? "input-error" : "input-bordered"
                      }`}
                      required
                      minLength={3}
                      maxLength={50}
                    />

                    {errors.lastName && (
                      <p className="text-error text-xs">{errors.lastName}</p>
                    )}
                  </fieldset>
                </div>

                {/* Email */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email Address *</legend>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    className={`input w-full ${
                      errors.email ? "input-error" : "input-bordered"
                    }`}
                    required
                  />

                  {errors.email && (
                    <p className="text-error text-xs">{errors.email}</p>
                  )}
                </fieldset>

                {/* Password */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password *</legend>

                  <div className="join w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={updateField}
                      placeholder="Create a strong password"
                      className={`input join-item w-full ${
                        errors.password ? "input-error" : "input-bordered"
                      }`}
                      required
                    />

                    <button
                      type="button"
                      className="btn join-item"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-error text-xs">{errors.password}</p>
                  )}
                </fieldset>

                {/* Age & Gender */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age</legend>

                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      onChange={updateField}
                      placeholder="e.g. 25"
                      min="1"
                      max="120"
                      className="input input-bordered w-full"
                    />

                    {errors.age && (
                      <p className="text-error text-xs">{errors.age}</p>
                    )}
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender</legend>

                    <select
                      name="gender"
                      value={form.gender}
                      onChange={updateField}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </fieldset>
                </div>

                {/* Photo URL */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Profile Photo URL</legend>

                  <input
                    type="url"
                    name="photoUrl"
                    value={form.photoUrl}
                    onChange={updateField}
                    placeholder="https://example.com/profile.jpg"
                    className={`input w-full ${
                      errors.photoUrl ? "input-error" : "input-bordered"
                    }`}
                  />

                  {errors.photoUrl && (
                    <p className="text-error text-xs">{errors.photoUrl}</p>
                  )}

                  {/* Live image preview */}
                  {form.photoUrl && !errors.photoUrl && (
                    <div className="flex items-center gap-4 mt-3">
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={form.photoUrl}
                            alt="Profile preview"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      </div>

                      <span className="text-sm text-success">
                        Profile image preview
                      </span>
                    </div>
                  )}
                </fieldset>

                {/* About */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About You</legend>

                  <textarea
                    name="about"
                    value={form.about}
                    onChange={updateField}
                    maxLength={160}
                    rows={3}
                    placeholder="Tell us something about yourself..."
                    className="textarea textarea-bordered w-full resize-none"
                  />

                  <p className="text-xs text-base-content/50 text-right">
                    {form.about.length}/160
                  </p>
                </fieldset>

                {/* Skills */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Skills & Interests
                    <span className="badge badge-ghost">
                      {form.skills.length}/10
                    </span>
                  </legend>

                  <div className="join w-full">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      placeholder="React, Music, Travel..."
                      className="input input-bordered join-item w-full"
                    />

                    <button
                      type="button"
                      onClick={addSkill}
                      disabled={!skill.trim() || form.skills.length >= 10}
                      className="btn btn-secondary join-item"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.skills.map((item) => (
                      <div
                        key={item}
                        className="badge badge-primary badge-outline gap-2 p-3"
                      >
                        {item}

                        <button
                          type="button"
                          onClick={() => removeSkill(item)}
                          aria-label={`Remove ${item}`}
                          className="font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="divider">READY TO JOIN?</div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg w-full rounded-xl"
                >
                  {submitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>Create My Account ✨</>
                  )}
                </button>

                <p className="text-center text-xs text-base-content/50">
                  By signing up, you agree to our
                  <a href="/terms" className="link link-primary mx-1">
                    Terms
                  </a>
                  and
                  <a href="/privacy" className="link link-primary mx-1">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
