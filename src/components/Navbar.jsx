import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const MyNavbar = () => {
  const firebase = useFirebase();
  useEffect(() => {}, [firebase.user]);
  const logout = () => {
    firebase.logout();
  };
  return (
    <Navbar className="bg-black h-[50px] flex items-center justify-around sticky top-0">
      <Link to="/" className="text-[orange] text-2xl">
        Home
      </Link>
      {firebase.user && (
        <Link to="/addpeople" className="text-white text-2xl">
          Add people
        </Link>
      )}
      {!firebase.user && (
        <Link to="/login" className="text-white text-2xl">
          Login
        </Link>
      )}
      {firebase.user && (
        <Link to="" onClick={logout} className="text-white text-2xl">
          Logout
        </Link>
      )}
    </Navbar>
  );
};

export default MyNavbar;
