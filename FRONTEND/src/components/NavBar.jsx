import React from "react";
import NavSearchBar from "./NavSearchBar";
import NavSearchBtn from "./NavSearchBtn";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div>
        <h1>LOGO</h1>
        <NavSearchBar />
        <NavSearchBtn />
      </div>
      <div>
        <nav>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/gifts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Gifts
          </NavLink>
          <NavLink
            to="/sell"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            sell
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            store
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Help & Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
