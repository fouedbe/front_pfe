import React, { useState } from "react";
import axios from "axios";
import './register.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Forget() {
  const [userData, setUserData] = useState({
    email:"",
   
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend registration endpoint
      
      const response = await axios.post(
        "http://localhost:8000/api/users/forget",
        userData
      );
      navigate("/login");
      alert( response.data.message);
      // You can redirect users to a different page after successful registration
    } catch (error) {
      alert("Registration failed:", error.response.data.message);
      // You can display an error message to the user
    }
  };

  return (
    <main className="re">
  <div className="containe">
      <header>Signup</header>
      <form onSubmit={handleSubmit}>
        
      <div className="field email-field">
          <div className="input_register">
            <input type="email" placeholder="Enter your email"onChange={handleChange}  className="email" name="email" required value={userData.email} />
          </div>
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">Please enter a valid email</p>
          </span>
        </div>
        <div className="input_register buttonn ">
          <input type="submit" value="Submit Now" />
        </div>
      </form>
    </div>

</main>
  );
}

export default  Forget;
