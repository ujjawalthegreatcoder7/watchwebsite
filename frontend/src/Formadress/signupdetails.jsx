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

  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification

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
      const response = await fetch("http://localhost:7070/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from backend:", result);
        alert("Signup successful!");
      } else {
        console.error("Backend responded with an error:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  /** 🔹 Request OTP */
  const requestOTP = async () => {
    try {
      const response = await fetch("http://localhost:7070/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP sent successfully!");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  /** 🔹 Verify OTP */
  const verifyOTP = async () => {
    try {
      const response = await fetch("http://localhost:7070/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP verified successfully!");
        setIsOtpVerified(true); // Enable Sign-Up button
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit} style={{ padding: "4rem" }}>
      <div className="col-12">
        <label htmlFor="inputUsername" className="form-label">User Name</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control colorborder"
          id="inputUsername"
          placeholder="Enter your username"
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control colorborder"
          id="inputEmail4"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputPassword4" className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control colorborder"
          id="inputPassword4"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* OTP Request Button */}
      <div className="col-12">
        <button type="button" className="btn btn-primary" onClick={requestOTP}>
          Request OTP
        </button>
      </div>

      {/* OTP Input */}
      <div className="col-12">
        <label htmlFor="inputOTP" className="form-label">Enter OTP</label>
        <input
          type="text"
          name="otp"
          className="form-control colorborder"
          id="inputOTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
      </div>

      {/* Verify OTP Button */}
      <div className="col-12">
        <button type="button" className="btn btn-success" onClick={verifyOTP}>
          Verify OTP
        </button>
      </div>

      {/* Signup Button (Disabled Until OTP is Verified) */}
      <div className="col-12">
        <button type="submit" className="btn btn-dark colorborder" disabled={!isOtpVerified}>
          Sign-Up
        </button>
      </div>
    </form>
  );
}

export default SignupDetails;
