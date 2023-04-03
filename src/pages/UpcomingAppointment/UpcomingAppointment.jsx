import DeleteAppointment from "./DeleteAppointments";

const UpcomingAppointment = () => {


      return (
        <div>
  <h1>Upcoming Appointments</h1>
  <table>
    <thead>
      <tr>
        <th>Location</th>
        <th>Makeup Artist</th>
        <th>Appointment Date</th>
        <th>Time Slot</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>New York</td>
        <td>Jane Doe</td>
        <td>2023-04-05</td>
        <td>10:00 AM</td>
      </tr>

    </tbody>
  </table>
        </div>
      );
    };

export default UpcomingAppointment;