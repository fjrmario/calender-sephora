import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      navigate("/booking")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Login</legend>
          <label>
            Email: <input name="email" />
          </label>
          <label>
            Password: <input name="password" />
          </label>
          <button>Login</button>
        </fieldset>
      </form>
        <Link to="/signup">
        <button>New User</button>
      </Link>
    </>
  );
}