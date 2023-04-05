import {Routes, Route, Link} from "react-router-dom"
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import NavBar from "../../../components/NavBar";


export default function AuthPage({ setUser }) {

  return (
    <>
    <Link to="/signup">
        <button>New User</button>
    </Link>
    <Link to="/login">
        <button>Log in</button>
    </Link>
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} />}/>
        <Route path="/signup" element={<SignUpForm/>}/>
      </Routes>
    </>
  );
}
