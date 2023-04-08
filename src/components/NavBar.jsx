import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utilities/users-service"

export default function NavBar({ setUser }) {
  const token = localStorage.getItem("token")
  const Name =  token ? JSON.parse(window.atob(token.split(".")[1])) : null;
  const customerName = Name ? Name.customer.name : null;
  const isAdmin = token && token.user.role === "PAdmin";
  console.log(`Name: ${Name}`);

const navigate = useNavigate();

const handleLogout = () => {
    setUser(null);
    logout();
    navigate("/login");
}

const handleAdminLogin = () => {
  navigate("/adminlogin");
}

  return (
    <>
      {setUser ? (<p>Hello {customerName}</p>): null}
      <nav>
        <ul>
        {setUser && (
          <li>
            <NavLink to="/maps">Map</NavLink>
          </li>
        )}
          {setUser && (
          <li>
            <NavLink to="/booking">Appointment Booking</NavLink>
          </li>
          )}
          {setUser && (
          <li>
            <NavLink to="/history">Upcoming Appointments</NavLink>
          </li>
          )}

          {setUser && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
           <li>
           <button onClick={handleAdminLogin}>Admin Login</button>
          </li>
          {isAdmin && (
          <li>
            <NavLink to="/admin">Admin roles</NavLink>
          </li>
          )}
        </ul>
      </nav>
    </>
  );
}