import React, { useState, useEffect } from "react";
// import { makeupArtist } from "../../../../time";
import BookingForm from "./BookingForm";

const Booking = ({ setSelectedArtist, setLocation, setCustomerInfo, customerInfo, fetchedLocations, }) => {
  const [form, setForm] = useState({});
  const [selectArtist, setSelectArtist] = useState([]);
  const [selectLocation, setSelectLocation] = useState("");

  useEffect(() => {
    if (selectLocation) {
      fetch(`/api/customer/${selectLocation}`)
        .then((response) => response.json())
        .then((data) => setSelectArtist(data))
        .catch((error) =>
          console.error("Error fetching makeup artists:", error)
        );
    } else {
      setSelectArtist([]);
    }
  }, [selectLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "location") {
      setSelectLocation(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(form.location);
    setSelectedArtist(selectArtist.find(artist => artist.name === form.artist));
    setCustomerInfo({
      name: form.name,
      email: form.email,
    });
    console.log(`selectArtist from Booking: ${selectArtist}`);
  };

  return (
    <div>
<BookingForm
  form={form}
  selectArtist={selectArtist}
  selectLocation={selectLocation}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  fetchedLocations={fetchedLocations}
/>
     
    </div>
  );
};

export default Booking;
