import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder';
const GoogleMap = ({ address }) => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (map) {
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geocoder = L.Control.Geocoder.nominatim();
      geocoder.geocode(address, (results) => {
        if (results.length > 0) {
          const result = results[0].center;
          const marker = L.marker([result.lat, result.lng]).addTo(map);
          marker.bindPopup(address).openPopup();
          map.setView([result.lat, result.lng], 13);
        }
      });
    }
  }, [map, address]);

  useEffect(() => {
    setMap(L.map('map').setView([51.505, -0.09], 13));
  }, []);

  return (
    <div className='showcase-single'>
      <div id="map" style={{ height: '300px', width: '80%' , marginBottom: "2rem" }} />
    </div>
  );
};

export default GoogleMap;