import { useState } from "react";
import { login } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("riya@gmail.com");
  const [password, setPassword] = useState("RandomABCD%123");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      /** add data to store */
      dispatch(addUser(res.data || null));
      navigate("/feed");
    } catch (err) {
      throw new Error(err, { cause: err });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-base-content/60 mb-4">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text font-medium">Password</span>
                <a
                  href="/forgot-password"
                  className="label-text-alt link link-primary"
                >
                  Forgot password?
                </a>
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm link"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">Remember me</span>
            </label>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/register" className="link link-primary font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
