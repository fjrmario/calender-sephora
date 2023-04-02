import { useState } from 'react';
import axios from 'axios';

export default function Location({onNewLocation}) {
  const [postalCode, setPostalCode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    // send a request to Google Maps Geocoding API to get the latitude and longitude coordinates of the postal code
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${window.GOOGLE_MAPS_API_KEY}`)
      .then(response => {
        const results = response.data.results;
        if (results && results.length > 0) {
          const result = results[0];
          // update the latitude and longitude state with the values from the API response
          setLatitude(result.geometry.location.lat);
          setLongitude(result.geometry.location.lng);
  
          // make the post request to save the new location
          const newLocation = { name, latitude: result.geometry.location.lat, longitude: result.geometry.location.lng };
          axios.post('/api/maps', newLocation)
            .then(response => {
              console.log(response.data);
              // reset the form after submission
              setName('');
              setLatitude(null);
              setLongitude(null);
              setPostalCode('');
              onNewLocation();
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.error('No results found');
        }
    })
      .catch(error => {
        console.error(error);
    });
  
    return false;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required />

        <label htmlFor="postalCode">Postal Code:</label>
        <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />

        <button type="submit">Open Store</button>
      </form>
    </div>
  );
}