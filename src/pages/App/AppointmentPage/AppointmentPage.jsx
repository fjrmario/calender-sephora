import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import "../App.css";
import Times from "./Times";
import Booking from "./Booking";
import Cal from "./Calendar";

const AppointmentPage = () => {
  const [date, setDate] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [selectArtist, setSelectedArtist] = useState("");
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [fetchedLocations, setFetchedLocations] = useState();

  console.log(`selectArtist in ApptPage: ${JSON.stringify(selectArtist)}`);
  console.log(`location in ApptPage: ${JSON.stringify(fetchedLocations)}`);
  console.log(`customerInfo in ApptPage: ${JSON.stringify(customerInfo)}`);

  useEffect(() => {
    // Fetch all locations
    const fetchLocation = async () => {
      const token = localStorage.getItem("token");
  
      const response = await fetch("/api/calender", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });
  
      const locationData = await response.json();
      setFetchedLocations(locationData); // Set the fetched location data to the state
    };
    fetchLocation();
  }, []);

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <Booking
        setSelectedArtist={setSelectedArtist}
        setCustomerInfo={setCustomerInfo}
        customerInfo={customerInfo}
        fetchedLocations={fetchedLocations}
        location={location}
      />
      {showTime ? (
        <Times
          date={date}
          selectArtist={selectArtist}
          showTime={showTime}
          customerInfo={customerInfo}
        />
      ) : null}

      <div>
        <Cal
          date={date}
          setDate={setDate}
          selectArtist={selectArtist}
          setShowTime={setShowTime}
          customerInfo={customerInfo}
        />
      </div>
    </div>
  );
};

export default AppointmentPage;