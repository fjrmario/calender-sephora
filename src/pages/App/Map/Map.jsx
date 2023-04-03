import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Helmet } from 'react-helmet';
import L from 'leaflet';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Location from '../../../components/location';
import CurrentLocation from '../../../components/currentLocation';
import Distance from '../../../components/Distance';

const blackIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
});

const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const initialPosition = [1.3521, 103.8198];
  const initialZoom = 12;
  const [streetViewImageUrl, setStreetViewImageUrl] = useState('');
  const [panorama, setPanorama] = useState(null);
  
  const mapRef = useRef();
  
  useEffect(() => {
    axios.get('/api/maps').then(response => {
      setLocations(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    // Create a StreetViewService object when the map is ready
    if (mapRef.current) {
      const streetViewService = new google.maps.StreetViewService();
      streetViewService.getPanorama({location: initialPosition}, (data, status) => {
        if (status === 'OK') {
          setPanorama(data.location.pano);
        } else{
          console.error('Street view request failed:', status)
        }
      });
    }
  }, [mapRef.current]);

  function getStreetViewImageUrl(lat, lng, radius) {
    const radiusParam = radius ? `&radius=${radius}` : '';
    const baseUrl = 'https://maps.googleapis.com/maps/api/streetview';
    const size = '300x200'; 
    const heading = '210'; 
    const pitch = '10'; 
    const apiKey = 'AIzaSyDDDJIzJGH2EKzuO21LzTsg6Hxiyq04Tc4';
    const adjustedLat = lat + (Math.random() * radius * 2 - radius) * 0.0001;
    const adjustedLng = lng + (Math.random() * radius * 2 - radius) * 0.0001;
  
    return `${baseUrl}?size=${size}&location=${adjustedLat},${adjustedLng}&heading=${heading}&pitch=${pitch}&key=${apiKey}${radiusParam}`;
  }

  function handleShowStreetView() {
    const radius = 500000
    const imageUrl = getStreetViewImageUrl(location.latitude, location.longitude, radius);
    setStreetViewImageUrl(imageUrl);
  }

  const handleNewLocation = () => {
    axios.get('/api/maps').then(response => {
      setLocations(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  const handleResetMap = () => {
    mapRef.current.setView(initialPosition, initialZoom);
  }


  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
              integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
      </Helmet>

      <MapContainer ref={mapRef} center={initialPosition} zoom={initialZoom} style={{ height: '600px' , width: '80%'}}>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={15} attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>

        {locations.map(location => (
          <Marker key={location._id} position={[location.latitude, location.longitude]} icon={blackIcon}>
            <Popup>
              <div>
                <b>{location.name}</b>
                <br />
                <br />
                <Link to={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`} target="_blank">Get directions</Link>
                <br />
                <br />
                <button onClick={handleShowStreetView}>Show Street View</button>
                <br />
                <br />
                {streetViewImageUrl && <img src={streetViewImageUrl} alt="Street View" />}
                <Link to={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`} target="_blank">Get directions</Link>
                <br />
                <br />
                <button onClick={() => window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.latitude},${location.longitude}`, '_blank')}>View street view</button>
               </div> 
            </Popup>
          </Marker>
        ))}
      <Marker position={[userLatitude, userLongitude]} icon={greenIcon}>
          <Popup>
              <div>
                  <b>Your current location</b>
              </div>
          </Popup>
      </Marker>
      </MapContainer>
      <Location onNewLocation={handleNewLocation}/>
      <Distance latitude={userLatitude} longitude={userLongitude}/>

      <CurrentLocation setUserLatitude={setUserLatitude} setUserLongitude={setUserLongitude} />
      <button onClick={handleResetMap}>Reset Map</button>
      <br />
      <br />
    </div>
  );
};

export default Map;