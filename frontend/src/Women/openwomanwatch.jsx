import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomImageList from '../Men/MenimageList';
import WomenimageList from './WomenImageList';

const ManopenWatch = () => {
  const { id } = useParams(); 
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch the listings from the backend API
    axios.get(`http://localhost:7070/radha/show/${id}`)
      .then(response => {
        setListings(response.data); // Set the fetched data
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  return (
    <>    
      {/* <h1>Man watch opened</h1> */}
      <div className="row row-cols-lg-5 contant">
      {/* <h1 className='mt-4' > {listings.description} </h1> */}
      {/* <img  cla src={listings.image} alt="" /> */}
      
      <div className='mt-5 showimage '  >
      <WomenimageList/>
      </div>




      </div>
    </>
  );
};

export default ManopenWatch;
