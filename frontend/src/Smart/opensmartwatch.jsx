import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./menbackendcomp.css"

const SmartopenWatch = () => {
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
  <h1> smart watch opened </h1>
    <div className="row row-cols-lg-5 contant">
      {listings.length > 0 ? (
        listings.map(listing => (
          <div className=" block mb-2  boxgap mt-3" style={{ width: '20rem' ,height : "25rem" }} key={listing._id}>
            {/* <a href={`/radha/openwatchinfo/smart/${listing._id}`}> */}
              <img src={listing.imageforsmart} className="imagee hover card-img-top "  style={{ width: '100%' ,height : "15rem"}}  alt={listing.title} />
            {/* </a> */}
            <div className="card-body">
              {/* <a href={`/radha/openwatchinfo/smart/${listing._id}`}> */}
                <b className="card-text cardtext title">{listing.title}</b>
              {/* </a> */}
              <p>{listing.description}</p>
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

export default SmartopenWatch ;
