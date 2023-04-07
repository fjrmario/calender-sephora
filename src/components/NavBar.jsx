import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utilities/users-service"

export default function NavBar({ user, setUser }) {
//   const welcomeMessage = user === null ? "" : `Welcome ${user.name}`;
const navigate = useNavigate();

const handleLogout = () => {
    setUser(null);
    logout();
    navigate("/login");
}
  return (
    <>
      {user ? (<p>Hello {user}</p>): null}
      <nav>
        <ul>
          <li>
            <NavLink to="/maps">Map</NavLink>
          </li>

          <li>
            <NavLink to="/booking">Appointment Booking</NavLink>
          </li>

          <li>
            <NavLink to="/history">Upcoming Appointments</NavLink>
          </li>

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