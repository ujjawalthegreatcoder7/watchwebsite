import "./addressform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Logout() {
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the URL to match your backend endpoint
      const response = await fetch("http://localhost:7070/logout", {
        method: "GET",
        
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from backend:", result);
        // Navigate to the delivery details page after successful signup
        navigate("/Riviera Klock/filldeliverydetails");
      } else {
        console.error("Backend responded with an error:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <form
      className="row g-3"
      onClick={handleSubmit}
      style={{ padding: "4rem" }}
    >
     <button> Log out </button>
    </form>
  );
}

export default Logout ;
