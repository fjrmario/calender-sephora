import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utilities/users-service";

export default function NavBar({ setUser }) {
  const token = localStorage.getItem("token");
  const Name = token ? JSON.parse(window.atob(token.split(".")[1])) : null;
  console.log(`Name: ${JSON.stringify(Name)}`);
  const userName = Name && Name.customer ? Name.customer.name : null;
  const isAdmin = Name && Name.admin && Name.admin.role === "PAdmin" ? Name.admin.role : null;
  const isAdminName = Name && Name.admin ? Name.admin.name : null;
  console.log(`Name: ${userName}`);
  console.log(`isAdmin: ${isAdmin}`);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    logout();
    navigate("/login");
  };

  return (
    <>
      {setUser ? <p>Hello {userName ? userName : isAdminName}</p> : null}
      <nav>
        <ul>
          {!isAdmin && setUser && (
            <li>
              <NavLink to="/maps">Map</NavLink>
            </li>
          )}
          {!isAdmin && setUser && (
            <li>
              <NavLink to="/booking">Appointment Booking</NavLink>
            </li>
          )}
          {!isAdmin && setUser && (
            <li>
              <NavLink to="/history">Upcoming Appointments</NavLink>
            </li>
          )}

          {setUser && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}

        </ul>
      </nav>
    </>
  );
}
