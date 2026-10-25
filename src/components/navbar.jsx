import { useSelector } from "react-redux";
import Logout from "./logout";
import { Link } from "react-router-dom";

export function NavBar() {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a href="/" className="text-xl font-black tracking-tight">
          mingle<span className="text-primary">.</span>
        </a>
      </div>
      <div className="flex-1">
        {user
          ? `Welcome ${user?.firstName}`
          : "Let me know you friend!, please login"}
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
