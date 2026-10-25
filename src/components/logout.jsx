import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log("logged out : ", res);
      navigate("/login");
    } catch (err) {
      throw new Error(err, { cause: err });
    }
  };

  return <div onClick={handleLogout}>Logout</div>;
}
