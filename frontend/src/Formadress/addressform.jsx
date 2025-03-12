import "./addressform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FormAddress() { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7070/delivery/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from backend:", result);
        navigate("/Riviera Klock/payment");
      } else {
        console.error("Backend responded with an error:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <form className="row g-3" style={{ padding: "4rem" }} onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            required
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="form-control colorborder"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            type="text"
            required
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="form-control colorborder"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>

        <div className="col-md-5 col-sm-5">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="form-control colorborder"
            id="inputCity"
          />
        </div>

        <div className="col-md-3 col-sm-4">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            type="number"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
            className="form-control colorborder"
            id="inputZip"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-dark colorborder">
            Now Move For Payment
          </button>
        </div>
      </form>
    </>
  );
}

export default FormAddress;





