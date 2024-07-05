import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";

const SinglePerson = () => {
  const [person, setPerson] = useState({});
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const firebase = useFirebase();
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(id);
    firebase
      .getPersonById(id)
      .then((res) => {
        setPerson(res);
        console.log(res);
      })
      .then(() => {
        firebase.getImages(id).then((res) => {
          setImages(res);
          console.log("Images", res);
        });
      })
      .catch((err) => {
        console.log("Error fetching person");
        alert(err);
      });
  }, [id, firebase]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("URL Submitted:", url);
    // Dummy submit action, e.g., add the URL to the person's images array
    firebase
      .addCelebImage(id, url)
      .then((res) => {
        console.log("Image added successfully:", res);
        alert("Image added successfully!");
      })
      .catch((err) => {
        console.log("Error adding image");
        alert(err);
      });
    setUrl(""); // Reset the URL input field
  };

  return (
    <div className="bg-gray-500 flex items-center h-full w-full flex-col min-h-[100vh] ">
      <div className="w-full flex justify-evenly flex-wrap items-center mt-5 md:mt-8 lg:mt-10 gap-2">
        <div className="bg-gray-500 mb-1" key={person.id}>
          <div className="bg-white flex flex-col items-center max-w-80 min-w-80 justify-between">
            <img
              className="h-60 w-64 mt-2"
              src={person.url}
              alt={person.name}
            />
            <p className="bg-green-600 text-4xl text-white p-2 text-center w-full">
              {person.name}
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-black rounded-lg w-[500px] bg-white max-w-[90vw] shadow-lg h-48"
        >
          <div className="p-4">
            <h1 className="text-2xl font-extrabold text-black px-2">
              Add Images
            </h1>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the URL to add image"
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
      {images && images.length > 0 && (
        <div className="flex flex-col w-full bg-gray-500 items-center">
          <h1 className="text-center text-white text-4xl">
            {person.name}'s Images
          </h1>
          <div className="flex flex-wrap">
            {images &&
              images.map((image, index) => (
                <div className="bg-white h-[300px] w-[300px] flex justify-center items-center mt-2 md:mt-6">
                  <div
                    key={index}
                    className="bg-gray-500  w-[250px] h-[250px] flex items-center justify-center"
                  >
                    <img
                      className="h-full w-full"
                      src={image.url}
                      alt={image.name}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePerson;
