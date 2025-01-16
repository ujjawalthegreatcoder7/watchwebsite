import React, { useState, useEffect } from 'react';
import "./navbar.css" ;
import Logo from"../assets/logo.png"
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AccountMenu from './account';
const Navbarr = () => {
  const [index, setIndex] = useState(0);

  // Function to handle the slide change
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3); // Change slide every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Open dropdown on mouse enter
  const handleMouseEnter = () => {
    setDropdownOpen(true) ;
  };

  // Close dropdown on mouse leave
  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
<>
<nav className="navbar navbar-expand-lg bg-body-tertiary navcoolorr  shadow-lg">
  <div className="container-fluid navcoolor">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <div className='navabraAlignment' >

<div> 
<ul class="  mt-3 ">
<Tooltip title="Riviera Klock">
          <a class=" " aria-current="page" href="#"><img src={Logo} className='logoimage' ></img> </a>
          </Tooltip>
        </ul>
   </div>



        <div>
      <ul class="navbar-nav  mb-2 mb-lg-0">
      <div className='' >
        <li class="nav-item">
          {/* <a class="nav-link active" aria-current="page" className='Men' href="#">Men</a> */}
          <Tooltip title="All Watches">
          <Link class="nav-link active" aria-current="page"   className='Men'  to="/radha/home"> All Watches 
          </Link></Tooltip>
        </li></div>     
           <div className='' >
        <li class="nav-item">
        <Tooltip title="Men Watches">
          {/* <a class="nav-link active" aria-current="page" className='Men' href="#">Men</a> */}
          <Link class="nav-link active" aria-current="page"   className='Men'  to="/radha/men"> Men </Link>
          </Tooltip>
        </li></div>
        <div>
        <li class="nav-item">
        <Tooltip title="WoMen Watches">
          {/* <a class="nav-link"  className='Men'  href="#">Women</a> */}
          <Link class="nav-link active" aria-current="page"   className='Men'  to="/radha/women"> WoMen </Link>
          </Tooltip>
        </li></div>
        <div>
        <li class="nav-item">
        <Tooltip title="Brand Watches">
          {/* <a class="nav-link"  className='Men'  href="#">Brands</a> */}
          <Link class="nav-link active" aria-current="page"   className='Men'  to="/radha/brands"> Brands </Link>
          </Tooltip>
        </li></div>
        <div>
        <li class="nav-item">
        <Tooltip title="Smart Watches">
          {/* <a class="nav-link"  className='Men'  href="#">Smart</a> */}
          <Link class="nav-link active" aria-current="page"   className='Men'  to="/radha/smart"> Smart </Link>
          </Tooltip>
        </li></div>
      </ul>
      </div>


      <div className='navbar-nav flexsearch ' >
      <form class="d-flex" role="search">
      <Tooltip title="Search your dream watch">
        <input class="form-control me-2 inp" className='searchin navbar-nav  ' type="search" placeholder="Search your dream watch" aria-label="Search"></input>
        </Tooltip>
        <button class="btn btn-outline-dark " type="submit" className='searchicon ' ><SavedSearchIcon/></button>
       
        <div class='nav-item addtocart '  >
        <Tooltip title="Your Dream Watch Stored ">
           <LocalMallSharpIcon/>
           </Tooltip>
           </div>
        
        <div class='nav-item addtocart'  ><AccountMenu/></div>
      </form>
      </div>
      </div>
    </div>
  </div>
</nav>
</>  
)
};

export default Navbarr;