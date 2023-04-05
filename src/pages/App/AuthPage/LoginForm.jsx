import { useState } from "react";
import { getUser } from "../../../utilities/users-service";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginTry, setLoginTry] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginTry),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      localStorage.setItem("token",  JSON.stringify(data.token));
      const decoded = getUser()
      const Name =  JSON.parse(window.atob(data.token.split(".")[1]))
      console.log(Name.customer.name)
      console.log(Name.customer.email)
      setUser(decoded);
      navigate("/booking");
      console.log(decoded)
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setLoginTry({
      ...loginTry,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Login</legend>
          <label>
            Email:
            <input name="email" value={loginTry.name} onChange={handleChange} />
          </label>
          <label>
            Password:{" "}
            <input
              name="password"
              value={loginTry.password}
              onChange={handleChange}
            />
          </label>
          <button>Login</button>
        </fieldset>
      </form>
    </>
  );
}