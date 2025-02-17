import React, { useState } from "react";
import "./navbar.css";
import Logo from "../assets/logo.png";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AccountMenu from "./account";

const Navbarr = () => {
  const [activeItem, setActiveItem] = useState("home"); // Track the active menu item

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary navcoolorr shadow-lg">
        <div className="container-fluid navcoolor">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navabraAlignment">
              {/* Logo */}
              <div>
                <ul className="mt-3">
                  <Tooltip title="Riviera Klock">
                    <a className="" aria-current="page" href="#">
                      <img src={Logo} className="logoimage" alt="Logo" />
                    </a>
                  </Tooltip>
                </ul>
              </div>

              {/* Navigation Links */}
              <div>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  {[
                    { label: "All Watches", path: "/radha/home", key: "home" },
                    { label: "Men", path: "/radha/men", key: "men" },
                    { label: "Women", path: "/radha/women", key: "women" },
                    { label: "Brands", path: "/radha/brands", key: "brands" },
                    { label: "Smart", path: "/radha/smart", key: "smart" },
                  ].map((item, index) => (
                    <li className="nav-item" key={index}>
                      <Tooltip title={`${item.label} Watches`}>
                        <Link
                          to={item.path}
                          className={`nav-link Men ${
                            activeItem === item.key ? "active-link" : ""
                          }`}
                          onClick={() => handleItemClick(item.key)}
                        >
                          {item.label}
                        </Link>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Search and Icons */}
              <div className="navbar-nav flexsearch">
                <form className="d-flex" role="search">
                  <Tooltip title="Search your dream watch">
                    <input
                      className="form-control me-2 inp searchin navbar-nav"
                      type="search"
                      placeholder="Search your dream watch"
                      aria-label="Search"
                    />
                  </Tooltip>
                  <button
                    className="btn btn-outline-dark searchicon"
                    type="submit"
                  >
                    <SavedSearchIcon />
                  </button>

                  <div className="nav-item addtocart">
                    <Tooltip title="Your Dream Watch Stored">
                      <LocalMallSharpIcon />
                    </Tooltip>
                  </div>

                  <div className="nav-item addtocart">
                    <AccountMenu />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbarr;
