import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomHeader from "../components/custom-header";
import LocationMap from "../components/locationmap";
import bronze from "../assets/bronze.jpg";
import SetLocation from "../components/setlocation";

export default function About() {
    const itemDetail={
        position:[6.9271, 79.8612], 
        locationName:"SriLankan Customs Head Q", 
        image: bronze
    };

    return (
    <>
    <CustomHeader />
       <h3 className="text-3xl font-bold underline text-center text-blue-600 cursor-pointer ">
        Routing Configured     
        </h3>

        <LocationMap itemDetail={itemDetail} />
        <SetLocation />


    </>
    );
}
