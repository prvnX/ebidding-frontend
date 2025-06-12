import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomHeader from "../components/custom-header";

export default function About() {
    return (
    <>
    <CustomHeader />
       <h3 className="text-3xl font-bold underline text-center text-blue-600 cursor-pointer ">
        Routing Configured     
        </h3>

    </>
    );
}
