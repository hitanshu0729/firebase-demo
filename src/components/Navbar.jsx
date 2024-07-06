import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const MyNavbar = () => {
  const firebase = useFirebase();
  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "text-[orange] text-2xl"
      : "text-white text-2xl";
  };
  const location = useLocation();
  useEffect(() => {}, [firebase.user]);
  const logout = () => {
    firebase.logout();
  };
  return (
    <Navbar className="bg-black h-[50px] flex items-center justify-around sticky top-0">
      <Link to="/" className={getLinkClassName("/")}>
        Home
      </Link>
      {firebase.user && (
        <Link to="/addpeople" className={getLinkClassName("/addpeople")}>
          Add people
        </Link>
      )}
      {!firebase.user && (
        <Link to="/login" className={getLinkClassName("/login")}>
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
