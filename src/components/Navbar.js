import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaUserAlt,
  FaHome,
  FaMoneyBillWave,
  FaCarrot,
  FaCalendarAlt,
  FaInfoCircle,
  FaShoppingCart,
  FaCreditCard,
  FaEdit,
} from "react-icons/fa";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import anndaata from "../assets/anndaata.jpg";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) return;

      scrollTimeout.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        lastScrollY.current = currentScrollY;
        scrollTimeout.current = null;
      }, 100); // Throttle to update every 100ms
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${showNavbar ? "" : "hidden"}`}>
      <div className="navbar-left">
        <img src={anndaata} alt="Logo" className="logo-navbar" />
        <h1 className="brand-name">Anndaata</h1>
      </div>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul
        className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}
        style={{
          maxHeight: "80vh", // Set maximum height for dropdown menu
          overflowY: "auto", // Enable scrolling for overflowing content
        }}
      >
        <li>
          <Link to="/" className="nav-link">
            <FaHome style={{ marginRight: "8px" }} /> Home
          </Link>
        </li>
        <li>
          <Link to="/sell" className="nav-link">
            <FaMoneyBillWave style={{ marginRight: "8px" }} /> Sell Your Grains
          </Link>
        </li>
        <li>
          <Link to="/Liverates" className="nav-link">
            <FaCarrot style={{ marginRight: "8px" }} /> Live Rates
          </Link>
        </li>
        <li>
          <Link to="/BookFertilizer" className="nav-link">
            <FaCalendarAlt style={{ marginRight: "8px" }} /> Book Fertilizers
          </Link>
        </li>
        <li>
          <Link to="/Events" className="nav-link">
            <FaCalendarAlt style={{ marginRight: "8px" }} /> Events
          </Link>
        </li>
        <li>
          <Link to="/Aboutus" className="nav-link">
            <FaInfoCircle style={{ marginRight: "8px" }} /> About
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            <FaShoppingCart style={{ marginRight: "8px" }} /> Cart
          </Link>
        </li>

        <li>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuClick} className="user-menu-btn">
                <FaUserAlt style={{ marginRight: "8px" }} /> My Profile
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <FaEdit style={{ marginRight: "8px" }} />{" "}
                  <Link to="/EditProfile">Edit Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <FaCreditCard style={{ marginRight: "8px" }} />
                  <Link to="/payment">Payment</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout} className="menu-item">
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/signin" className="nav-link">
              <FaUserAlt style={{ marginRight: "8px" }} /> Log In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
