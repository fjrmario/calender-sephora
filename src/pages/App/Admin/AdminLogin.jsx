import { useState } from "react";
import { getUser } from "../../../utilities/users-service";
const token = localStorage.getItem("token");
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  const [adminLogin, setadminLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(adminLogin),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Network error");
      }
      localStorage.setItem("token", JSON.stringify(data.token));
      const decoded = getUser();
      const Name = JSON.parse(window.atob(data.token.split(".")[1]));
      console.log("Name: ", JSON.stringify(Name));

      // navigate("/helloworld");
      console.log(decoded);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setadminLogin({
      ...adminLogin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Admin Login</legend>
            <label>
              Email:
              <input
                name="email"
                value={adminLogin.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:{" "}
              <input
                name="password"
                value={adminLogin.password}
                onChange={handleChange}
                type="password"
              />
            </label>
            <label>
              Department:
              <select name="role" value={adminLogin.role} onChange={handleChange}>
                <option value="">Select Admin Type</option>
                <option value="PAdmin">PAdmin</option>
                <option value="BAdmin">BAdmin</option>
              </select>
            </label>
            <button>Login</button>
          </fieldset>
        </form>
      </div>
      {error ? <p>&nbsp;{error}</p> : null}
    </div>
  );
};

export default AdminLogin;
