import { useState } from "react";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mustang from '../assets/mustang.jpg'; 
import { faDirections } from "@fortawesome/free-solid-svg-icons";
import {  faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";



export default function LocationMap(itemDetail) {
  // console.log("Item Detail:", itemDetail.itemDetail);
  const position = itemDetail.itemDetail.position;
  const locationName = itemDetail.itemDetail.locationName; 
  const image = itemDetail.itemDetail.image; 

  function handleViewLocation() {
    window.open(`https://www.google.com/maps?q=${position[0]},${position[1]}`, '_blank');
  }
  
  function handleGetDirections() {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`, '_blank');  }
  return (
    <div className="flex flex-col items-center justify-center border p-2 rounded-lg bg-white border-gray-200"> 
    
    <MapContainer center={position} zoom={14} className="h-[300px] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} style={{ color: 'red' }}>
        <Popup>
          <div className="flex flex-col items-center"> 
            <img src={image} className=" w-20 rounded-md "/>
            <p className="text-blue-900 text-xs">{locationName}</p>
          
          </div></Popup>
      </Marker>
    </MapContainer>
    <div className="w-full">
    <button className="w-full border border-gray-300 text-gray-700 p-1 rounded-md hover:bg-gray-50 transition flex items-center justify-center mt-2 text-xs cursor-pointer" onClick={() => handleViewLocation()}>
      <FontAwesomeIcon icon={faGoogle} className="mr-2" />
      View Location
    </button>
    <button className="w-full border border-gray-300 text-gray-700 p-1 rounded-md hover:bg-gray-50 transition flex items-center justify-center mt-2 text-xs cursor-pointer" onClick={() => handleGetDirections()}>
      <FontAwesomeIcon icon={faDirections} className="mr-2" />
      Get Directions
    </button>
    </div>
    </div>
  );
}

