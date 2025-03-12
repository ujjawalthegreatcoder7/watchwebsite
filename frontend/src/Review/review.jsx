import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Moved inside the component

  const [formData, setFormData] = useState({
    review: "",
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

    if (!id) {
      console.error("Error: ID is missing.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:7070/listing/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from backend:", result);
        navigate("/radha/home"); // Redirect after successful submission
      } else {
        console.error("Backend responded with an error:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit2}>
        <div>
          <div className="mb-3" style={{ padding: "3rem" }}>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Leave a Review
            </label>
            <textarea
              className="form-control"
              name="review"
              value={formData.review}
              onChange={handleChange}
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Review;
