import { Routes, Route, Link, useLocation } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ForgetPassword from "./ForgetPassword";

export default function AuthPage({ setUser }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/adminlogin" ? null : (
        <>
          {location.pathname !== "/forgetpassword" && (
            <Link to="/signup">
              <button>New Customer</button>
            </Link>
          )}
          <Link to="/login">
            <button>Log in</button>
          </Link>
          {location.pathname !== "/signup" && (
            <Link to="/forgetpassword">
              <button>Forget Password</button>
            </Link>
          )}
          <br />
        </>
      )}
      {location.pathname !== "/forgetpassword" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/login" &&
      location.pathname !== "/adminlogin" ? (
        <Link to="/adminlogin">
          <button>Admin Login</button>
        </Link>
      ) : null}
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}
