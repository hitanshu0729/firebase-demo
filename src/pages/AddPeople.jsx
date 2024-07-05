import { fireEvent } from "@testing-library/react";
import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
// import cloudinary from "cloudinary";
const AddPeople = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const firebase = useFirebase();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Celebrity Name:", name);
    console.log("Celebrity URL:", url);
    firebase.newPeople(name, url).then(alert(name," added"));
    // const imagelink = await cloudinary.uploader.upload(url);
  };

  return (
    <div className="h-full w-full bg-gray-400 flex flex-col items-center justify-center overflow-hidden p-4">
      <h1 className="text-4xl mb-4 font-extrabold text-black">Add People</h1>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-black rounded-lg w-[500px] bg-white max-w-[90vw] shadow-lg"
      >
        <div className="p-4">
          <h1 className="text-2xl font-extrabold text-black px-2">
            Celebrity Name
          </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the celebrity name here"
            className="w-full py-4 px-2 mt-2 mb-4 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <h1 className="text-2xl font-extrabold text-black px-2">
            Celebrity URL
          </h1>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the URL to cover photo"
            className="w-full py-4 px-2 mt-2 mb-4 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 w-full rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPeople;
