import React from 'react';
import "./footer.css"
import arm from "../assets/Logo.png"
function Footer() {
    return (<>
        <div className='containerd border-top footertext ' >
            <div className='row mt-5 footergap ' >
            <div className='col' >
                <img src={arm} style={{width: "70%" , marginLeft:"1rem" }} ></img>
                <p className='mt-4 riv ' > <b>Riviera Klock</b> <br></br> <p>Premium Watch Store</p> </p>

                <p><i class="fa-brands ml-3 fa-facebook "></i> <i class="fa-brands fa-instagram  ml-3"></i><i class="fa-brands fa-linkedin ml-3"></i></p>
                <hr></hr>
                <p><i class="fa-brands ml-3 fa-facebook"></i> <i class="fa-brands ml-3 fa-instagram"></i><i class=" ml-3 fa-brands fa-linkedin"></i></p>

            </div>
            <div className='col' >
                <b> Company </b>
                <p className='mt-4'>Contact</p>
                <p>Products</p>
                <p>Pricing</p>
                <p>Careers</p>
                <p>Zerodha.tech</p>


            </div>
            <div className='col' >
                <b > Support </b>
                <p className='mt-4'>Contact us</p>
                <p>Support portal</p>
                <p>Z-Connect blog</p>
                <p>Videos</p>
                <p>Market overview</p>

            </div>
            <div className='col' >
                <b> Account </b>
                <p className='mt-4'>Contact</p>
                <p>Open an account</p>
                <p>Fund transfer</p>

            </div>
            </div>
        </div>
    </>);
}

export default Footer;