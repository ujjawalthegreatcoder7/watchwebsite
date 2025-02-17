import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './home.jsx';
import Navbarr from './footnav/navbar.jsx';
import Footer from './footnav/footer.jsx';
import Man from './Men/mencomp.jsx';
import WoMan from './Women/womencomp.jsx';
import Smart from './Smart/Smartcomp.jsx';
import Brand from './Brands/brandcomp.jsx';
import Brands from './Brands/brandcomp.jsx';
import AutoSlidingCarousel from './App.jsx';
import ManopenWatch from './Men/openmanwatch.jsx';
import SmartopenWatch from './Smart/opensmartwatch.jsx';
import Openwomenwatch from './Women/openwomanwatch.jsx';
import Openbrandwatch from './Brands/brandopenwatch.jsx';
import Openhomecompwatch from './homecomponents/openhomecomp.jsx';
import FormAddress from './Formadress/addressform.jsx';
import LoginDetails from './Formadress/logindetails.jsx';
import SignupDetails from './Formadress/signupdetails.jsx';
import Logout from './Formadress/logout.jsx';
// import {Listing} from "./models/listing.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <BrowserRouter>
      <Navbarr /> {/* Navigation bar that appears across all pages */}
              <AutoSlidingCarousel/>

      <Routes>
        {/* Define your routes here */}
        <Route path="/radha/home" element={<Home />} />
        <Route path="/radha/men" element={<Man/>} />
        <Route path="/radha/women" element={<WoMan/>} />
        <Route path="/radha/smart" element={<Smart/>} />
        <Route path="/radha/brands" element={<Brands/>} />
        <Route path="/radha/openwatchinfo/man/:id" element={<ManopenWatch/>} />        
        <Route path="/radha/openwatchinfo/smart/:id" element={<SmartopenWatch/>} />  
        <Route path="/radha/openwatchinfo/women/:id" element={<Openwomenwatch/>} />              
        <Route path="/radha/openwatchinfo/brand/:id" element={<Openbrandwatch/>} />              
        <Route path="/radha/openwatchinfo/home/:id" element={<Openhomecompwatch/>} /> 
        <Route path="/Riviera Klock/filldeliverydetails" element={<FormAddress/>} /> 
        <Route path="/Riviera Klock/filllogindetails" element={<LoginDetails/>} /> 
        <Route path="/Riviera Klock/fillsignupdetails" element={<SignupDetails/>} /> 
        <Route path="/Riviera Klock/fillsignupdetails" element={<SignupDetails/>} /> 
        <Route path="/Riviera Klock/logout" element={<Logout/>} /> 

        
        {/* Add other routes as needed */}
      </Routes>
      
      <Footer /> {/* Footer that appears across all pages */}
    </BrowserRouter>
  
);
