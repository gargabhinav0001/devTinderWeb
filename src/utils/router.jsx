import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../components/body";
import Login from "../components/login";
import Profile from "../components/profile";

export function Routers() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
