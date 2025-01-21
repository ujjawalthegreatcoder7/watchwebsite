import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrandBack = () => {
  const [listings, setListings] = useState([]);

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

  return (<>  
    <div className="row row-cols-lg-5 contant">
      {listings.length > 0 ? (
        listings.map(listing => (
          <div className=" block mb-2   block hover  boxgap mt-3" style={{ width: '20rem' ,height : "30rem" }} key={listing._id}>
            <a href={`/radha/openwatchinfo/brand/${listing._id}`}>
              <img src={listing.imageforbrand} className="imagee hover card-img-top "  style={{ width: '100%' ,height : "15rem"}}  alt={listing.title} />
            </a>
            <div className="card-body">
              <a href={`/radha/openwatchinfo/brand/${listing._id}`}>
                <b className="card-text tet cardtext title"   style={{ display:"flex" , justifyContent:"center" , alignItems:"center" }}  >{listing.title}</b>
              </a>
              <p className='mt-4' >{listing.description}</p>
            </div>
          </div>
        ))
      ) : (
<h1> Loading.. </h1>
)}
    </div>
    </>

  );
};

export default BrandBack;