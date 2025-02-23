// import React, { useState, useEffect } from 'react';



// const AutoSlidingCarouse = () => {
//   return (
//    <h1> radha </h1>
//   );
// };

// export default AutoSlidingCarouse;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./menbackendcomp.css";
// import "./backend.css"
import home from "../assets/home.png"
import home2 from "../assets/home2.png"
import home3 from "../assets/home3.png"
import home4 from "../assets/home4.png"
import home5 from "../assets/home5.png"

import LinearColor from '../backendJoin/backendLoading';

const ManContent = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    // Fetch the listings from the backend API
    axios.get('http://localhost:7070/radha/index')
      .then(response => {
        setListings(response.data); // Set the fetched data
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  // Calculate the items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = listings.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle "Next" button
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle "Previous" button
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>    

<div className='' style={{width:"100%"}} >
<div className="row row-cols-lg-5 contant">
{currentItems.length > 0 ? (
  currentItems.map(listing => (
    <div className="block mb-2 block hover boxgap mt-3" style={{ width: '20rem', height: '30rem' }} key={listing._id}>
      <a href={`/radha/openwatchinfo/home/${listing._id}`}>
        <img src={listing.image} className="imagee hover card-img-top" style={{ width: '100%', height: '16rem' }} alt={listing.title} />
      </a>
      <div className="card-body">
        <a href={`/radha/openwatchinfo/home/${listing._id}`}>
          <b className="card-text tet title title" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{listing.title}</b>
        </a>
        <p className='mt-4'>{listing.description}</p>
      </div>
    </div>
  ))
) : (
<LinearColor/>
)}
</div> 
{/* Pagination Controls */}
<div className="pagination mt-4 mb-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
<button 
  onClick={handlePrevious} 
  disabled={currentPage === 1}
  className="btn btn-secondary mx-2"
>
  Previous
</button>
{/* 
{Array.from({ length: totalPages }, (_, index) => (
  <button 
    key={index + 1} 
    onClick={() => handlePageChange(index + 1)} 
    className={`btn mx-1 ${currentPage === index + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
  >
    {index + 1}
  </button> */}


<button 
  onClick={handleNext} 
  disabled={currentPage === totalPages}
  className="btn btn-secondary mx-2"
>
  Next
</button>
</div> 

</div>

    </>
  );
};

export default ManContent ;






// <div className='mt-3 mb-3' >
//   <div className='box' style={{height:"10rem" , backgroundColor:"#36454F" , opacity:"0.2" }} > 


//   </div>
// </div>
// <div className='mt-3 mb-3' >
//   <div className='box' style={{height:"10rem" , backgroundColor:"#36454F" , opacity:"0.2" }} > radha </div>
// </div>
// <div className='mt-3 mb-3' >
//   <div className='box' style={{height:"10rem" , backgroundColor:"#36454F" , opacity:"0.2" }} > radha </div>
// </div>