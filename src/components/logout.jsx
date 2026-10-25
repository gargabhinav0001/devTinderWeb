import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/redux/slices/userSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      dispatch(removeUser());
    } catch (err) {
      throw new Error(err, { cause: err });
    }
  };

  return <div onClick={handleLogout}>Logout</div>;
}
