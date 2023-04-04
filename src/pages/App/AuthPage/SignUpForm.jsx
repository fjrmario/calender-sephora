import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const disable = state.password !== state.confirm;

  const newCustomer = async (userData) => {
    try {
      const response = await fetch(`/api/customer/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("User registration failed");
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await newCustomer(state);
      setState({
        name:"",
        email: "",
        password: "",
        confirm: "",
      })
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error(`Error: ${error.message}`)
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          {error}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={state.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{state.error}</p>
    </div>
  );
}