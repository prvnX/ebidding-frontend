import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomHeader from "../components/custom-header";

export default function Home() {
    return (
    <>
        <CustomHeader />
       <h3 className="text-3xl font-bold underline text-center text-blue-600 cursor-pointer ">
         Custom Biddng Home Page
      </h3>
      <div className="flex justify-center items-center mt-10 border p-4 bg-gray-100 rounded w-50">

        <h1 className="text-xl font-bold text-red-500">Tailwind CSS is working!</h1>
      </div>
      <button className="mt-10 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition" onClick={()=> window.location.href = '/about'}>
        Go to about
        </button> 
    </>
    );
}
