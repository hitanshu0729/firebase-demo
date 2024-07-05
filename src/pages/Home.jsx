import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
  const firebase = useFirebase();
  const [people, setPeople] = useState([{}]);
  useEffect(() => {
    firebase.listAllPeople().then((res) => {
      setPeople(res);
      //   console.log(people);
      //   console.log("Length", people.length);
      //   console.log(res);
    });
  }, []);
  return (
    <div className="h-auto min-h-[100vh] w-full bg-gray-500 flex flex-wrap justify-evenly">
      {people &&
        people.length > 0 &&
        people.map((person) => (
          <div className="bg-gray-500" key={person.id}>
            <div className="bg-white mt-20 h-[400px] flex flex-col items-center max-w-80 min-w-80 justify-between">
              <p className="bg-green-600 text-4xl text-white p-2 mb-1 text-center w-full">
                {person.name}
              </p>
              <img className=" h-60 w-64" src={person.url} />
              <Link
                to={`/single/${person.id}`}
                className="bg-green-600 text-4xl text-white p-2 mt-1 text-center underline flex gap-2 justify-center items-center w-full cursor-pointer"
              >
                See more <FaLongArrowAltRight className="mt-1" />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Home;
