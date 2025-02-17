import "./addressform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      // Adjust the URL to match your backend endpoint
      const response = await fetch("http://localhost:7070/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      onSubmit={handleSubmit}
      style={{ padding: "4rem" }}
    >
      <div className="col-12">
        <label htmlFor="inputUsername" className="form-label">
          User Name
        </label>
        <input
          type="text"
          name="username" // changed from "input1" to "username"
          value={formData.username}
          onChange={handleChange}
          className="form-control colorborder"
          id="inputUsername"
          placeholder="Enter your username"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email" // changed from "input2" to "email"
          className="form-control colorborder"
          id="inputEmail4"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputPassword4" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password" // changed from "input3" to "password"
          className="form-control colorborder"
          id="inputPassword4"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-dark colorborder">
          Sign-Up
        </button>
      </div>
    </form>
  );
}

export default SignupDetails;
