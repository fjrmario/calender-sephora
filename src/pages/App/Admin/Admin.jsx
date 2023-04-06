import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [makeupArtists, setMakeupArtists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = JSON.parse(window.atob(userToken.split(".")[1])).customer.name;
    setToken(user);

    axios.get("/api/maps").then((response) => {
        setLocations(response.data);
    });
  }, []);

  useEffect(() => {
    async function fetchMakeupArtists() {
      const response = await axios.get(`/api/makeupartist/${selectedLocation}`);
      const {data} = response
      setMakeupArtists(data);
    }
    fetchMakeupArtists();
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  console.log(makeupArtists)

  return (
    <div>
      <h2>Select a location:</h2>
      <select value={selectedLocation} onChange={handleLocationChange}>
        <option value="">--Select a location--</option>
        {locations.map((location) => (
          <option key={location._id} value={location._id}>
            {location.name}
          </option>
        ))}
      </select>
      {/* {makeupArtists.length > 0 ? (
          <div>
            <h2>Makeup Artists</h2>
            <ul>
              {makeupArtists.map((makeupArtist) => (
                <li key={makeupArtist._id}>
                  <Link to={`/makeupArtist/${makeupArtist._id}`}>
                    {makeupArtist.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ): null } */}
    </div>
  );
}