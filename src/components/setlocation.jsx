import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function LocationSelector({ onLocationChange }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      onLocationChange?.({ lat, lng }); 
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

export default function SetLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
  useEffect(() => {
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError('Unable to retrieve your location');
        }
      );
    }
  }, []);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center border p-2 rounded-lg bg-white border-gray-200 h-full">
      <label>Select a location on map</label>
      <MapContainer
        center={[6.9271, 79.8612]} 
        zoom={15}
        className='h-full w-full'
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationSelector onLocationChange={(loc) => setSelectedLocation(loc)} />
      </MapContainer>

      {/* {selectedLocation && (
        <p>
          Selected Location: Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}
        </p>
      )} */}
    </div>
  );
}