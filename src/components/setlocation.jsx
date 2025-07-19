import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addFlashMessage } from "../flashMessageCenter";

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function LocationSelector({ onLocationChange, initialPosition }) {
  const map = useMap();
  const [markerPosition, setMarkerPosition] = useState(initialPosition || null);

  useEffect(() => {
    if (initialPosition) {
      setMarkerPosition(initialPosition);
      map.setView(initialPosition, 10);
    }
  }, [initialPosition]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      // const newPos = [lat, lng];
      // setMarkerPosition(newPos);
      onLocationChange?.({ lat, lng });
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}


export default function SetLocation({selectedLocation, setSelectedLocation}) {

  function handleGetCurrentLocation() {
    if (!navigator.geolocation) {
      addFlashMessage("error", "Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedLocation([position.coords.latitude, position.coords.longitude]);
        if (position.coords.accuracy > 1000)
          addFlashMessage("info", "Location may be inaccurate on devices without GPS. Please make sure it's correct.");
      },
      () => {
        addFlashMessage("error", "Unable to retrieve your location. Please allow location access in your browser settings.");
      }
    );
  }


  return (
    <div className="flex flex-col items-center justify-center border p-2 rounded-lg bg-white border-gray-200 h-full">
      <label>Select a location on map</label>
      <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={false} className="h-[300px] w-full z-10">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationSelector onLocationChange={(loc) => setSelectedLocation(loc)} initialPosition={selectedLocation} />
      </MapContainer>
      <button className="w-full border border-gray-300 text-gray-700 p-1 rounded-md hover:bg-gray-50 transition flex items-center justify-center mt-2 text-xs cursor-pointer" onClick={() => handleGetCurrentLocation()} type='button'>
        <FontAwesomeIcon icon={faLocation} className="mr-2" />
        Get My Current Location
      </button>
    </div>
  );
}