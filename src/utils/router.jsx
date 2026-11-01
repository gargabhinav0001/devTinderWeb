import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../components/body";
import Login from "../components/login";
import Profile from "../components/profile";
import Feed from "../components/feed";
import ProfileSettings from "../components/ProfileSettings";
import Home from "../components/Home";
import Signup from "../components/Signup/SignUp";

export function Routers() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/register" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
