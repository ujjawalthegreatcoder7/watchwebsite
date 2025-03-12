import * as React from 'react';
import { useParams } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import "./menimagelist.css" ;
import PaymentsIcon from '@mui/icons-material/Payments';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ManContent from './MenBackendcomp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import VerifiedIcon from '@mui/icons-material/Verified';
import Tooltip from '@mui/material/Tooltip';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Paymentimage1 from  "../assets/paymentimage1.png"
import Paymentimage2 from  "../assets/paymentimage2.png"
import TemporaryDrawer from './OpenDrawer';
import FormAddress from "../Formadress/addressform"
import { useNavigate } from 'react-router-dom';
import Review from '../Review/review';

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  export default function CustomImageList() {

const navigate = useNavigate();
  const filldeliverydetails = () => {
    navigate('/Riviera Klock/filldeliverydetails');
  }

  const buttons = [
    <Button key="one" onClick={filldeliverydetails} >Buy Now</Button>,
    <Button key="two">Add To Cart</Button>,  ];


    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleClick = () => {
      setDrawerOpen(!drawerOpen);
      console.log(setDrawerOpen) ;
      <TemporaryDrawer/>
    };

    
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

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

   
    const [reviewformData, setreviewFormData] = useState({

      email: "",

    });

    const reviewhandleChange = (e) => {
      const { name, value } = e.target;
      setreviewFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmitReview = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch(`http://localhost:7070/review/${id}/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewformData), // FIXED
        });
    
        if (!response.ok) {
          throw new Error(`Backend error: ${response.status} ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log("Response from backend:", result);
        window.location.reload();
        // Navigate to the home page after successful review submission
        // navigate(`/radha/men`);

      } catch (error) {
        console.error("Error submitting review:", error);
      }
    };
        


      const [reviews, setReviews] = useState([]); // ✅ Initialize reviews
  
      useEffect(() => {
          const fetchReviews = async () => {
              try {
                  const response = await fetch(`http://localhost:7070/review/${id}`);
                  if (!response.ok) {
                      throw new Error("Failed to fetch reviews");
                  }
                  const data = await response.json();
                  setReviews(data); // ✅ Update state with fetched reviews
              } catch (error) {
                  console.error("Error fetching reviews:", error);
              }
          };
  
          if (id) fetchReviews(); // ✅ Only fetch if listingId is available
      }, [id]);




return( <>

<div className='divone' >

<div className='menshowdiv' >

    <div id="carouselExample" class="carousel slide  moveimage">
  <div class="carousel-inner ">
    <div class="carousel-item active ">
      <img src={listings.imageformen} class="d-block  image11 " alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={listings.imageformen} class="d-block image11" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={listings.imageformen} class=" image11 d-bloacks" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={listings.imageformen} class=" image11 d-bloacks" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={listings.imageformen} class=" image11 d-bloacks" alt="..."/>
   

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon coll" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
    <button class="carousel-control-next col" type="button" data-bs-target="#carouselExample" data-bs-slide="next"> 
    <span class="carousel-control-next-icon coll "  aria-hidden=""></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>

</div>
<div className='backgroundfordescription' >
    <b> <i className='title' > {listings.title} </i> </b>
    <h4 className='mt-3 desc' > {listings.description} </h4>
    <h2 className='mt-5 pricesec '> ₹ {listings.price}  </h2>

 
    <Box sx={{ minWidth: 120 }} className="mt-3" >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Qty.</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Price"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>


    <ButtonGroup className='mt-3 ' size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup>



    <hr className='mt-5'></hr>
    <div className='iconsshow ' >
        <Tooltip title="Secure Payment" >
    <PaymentsIcon className='iconsonshow' sx={{fontSize:"3rem"}} /></Tooltip>

    <Tooltip title="Verified Material" >
    <VerifiedIcon className='iconsonshow' sx={{fontSize:"3rem"}} /></Tooltip>

    <Tooltip title="On time Delvery" >    
    <SafetyCheckIcon className='iconsonshow' sx={{fontSize:"3rem"}} /></Tooltip>

    <Tooltip title="Delivery with in 5 days" >
    <LocalShippingIcon className='iconsonshow' sx={{fontSize:"3rem"}} /></Tooltip>
    </div>
    <hr></hr>
  
    {/* <Accordion className='mt-5' >
  <AccordionSummary id="panel-header" aria-controls="panel-content" >
    Details
  </AccordionSummary>
  <AccordionDetails>
    Radha Krishna Ji
  </AccordionDetails>
</Accordion> */}

<div  >

<img style={{width : "40%"}} src={Paymentimage1}   onClick={handleClick}    ></img>
<img src={Paymentimage2}  style={{width : "45%" , marginLeft:"1rem"}} ></img>

</div>
<TemporaryDrawer/>
</div>

</div>

<Accordion className='mt-5' style={{width : "100%"}} >
  <AccordionSummary id="panel-header" aria-controls="panel-content" >
    More Info
  </AccordionSummary>
  <AccordionDetails>
    <div className='morinfo' >
    <div>
    Radha Krishna Ji
    </div>
    <div>
    Radha Krishna Ji
    </div>
    </div>
  </AccordionDetails>
</Accordion>

<div className='mt-4 mb-4 radhaa ' >
    <hr></hr>

    <h3 className='continuefor' > Comments </h3>




    <form
      className="row g-3"
      onSubmit={handleSubmitReview}
      style={{ padding: "4rem" }}
    >
      <div className="col-md-12  col-lg-12"   style={{marginTop:"-2rem"}}  >
        <label htmlFor="inputEmail4"  className="form-label">
          Enter Your Experience
        </label>
        <div style={{display:"flex",justifyContent:"center"}}>
        <input
          // type="email"
          name="email" // changed from "input2" to "email"
          className="form-control colorborder"
          style={{width : "70%" , height : "4.5rem"}}
          id="inputEmail4"
          required
          value={reviewformData.email}
          onChange={reviewhandleChange}
          placeholder="Add your Comment"
        />
        </div>
      </div>



      <div className="col-12">
        <button type="submit" required className="btn btn-dark colorborder">
          Add Comment
        </button>
      </div>
    </form>



    <div style={{marginTop:"-3rem"}} >
      <hr></hr>
      <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index}>
                        <p>{review.createdAt}</p>
                        <p>{review.email}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet</p>
            )}
        </div>


    <div>
      
    </div>

    <hr></hr>
    </div>
    <h3 className='continuefor' > Continue For </h3>
    <ManContent/>
     </div>
     <div className='mt-4 mb-4 radhaa ' >
    <hr></hr>
</div>


</>

)
}