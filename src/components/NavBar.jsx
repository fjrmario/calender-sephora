import { NavLink } from "react-router-dom";
import { logout } from "../utilities/users-service"

export default function NavBar({ user, setUser }) {
//   const welcomeMessage = user === null ? "" : `Welcome ${user.name}`;

const handleLogout = () => {
    setUser(null);
    logout();
}
  return (
    <>
      {user ? (<p>Hello {user}</p>): null}
      <nav>
        <ul>
          <li>
            <NavLink to="/orders">Order History</NavLink>
          </li>

          <li>
            <NavLink to="/orders/new">New Order</NavLink>
          </li>

          <li>
            <NavLink to="/maps">Map</NavLink>
          </li>

          <li>
            <NavLink to="/booking">Appointment Booking</NavLink>
          </li>

          <li>
            <NavLink to="/history">Upcoming Appointments</NavLink>
          </li>

          {/* <li>{welcomeMessage}</li> */}
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </>
  );
}