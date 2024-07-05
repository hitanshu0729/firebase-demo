import React, { useEffect } from "react";
// import { FaGoogle } from "react-icons/fa";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
const AddPeople = () => {
  const firebase = useFirebase();
  const loginGoogle = function () {
    firebase.signinWithGoogle();
    console.log(firebase.user);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.user) navigate("/");
  }, [firebase.user]);
  return (
    <div className="h-full w-full bg-gray-400 flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-4xl mb-4 font-extrabold text-black">Login</h1>
      <div
        type="submit"
        className="p-2 flex bg-red-600 rounded-lg border-2 border-black items-center gap-2 cursor-pointer shadow-white shadow-md"
        onClick={loginGoogle}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwdkceagT7Apjjp8wz0_GaJcIWkj72NYQPA&s"
          className="h-10 w-10"
        ></img>
        <p className="text-white sm:text-4xl md:text-5xl pb-1">
          Login with google
        </p>
      </div>
    </div>
  );
};

export default AddPeople;
