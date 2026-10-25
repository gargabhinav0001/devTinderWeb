import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "./navbar";
import Footer from "./footer";
import { useEffect } from "react";
import { getProfile } from "../actions/profile";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/redux/slices/userSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  async function getUserProfile() {
    try {
      const res = await getProfile();

      /** if user is not authorized  */
      if (res.status === 401) {
        navigate("/login");
      }

      dispatch(addUser(res.data || null));
    } catch (err) {
      throw new Error(err, { cause: err });
    }
  }

  useEffect(() => {
    if (user) return;

    getUserProfile();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
