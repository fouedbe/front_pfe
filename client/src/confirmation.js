import React, { useState } from "react";
import axios from "axios";
import './register.css';
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
function Confirmation() {
  const [userData, setUserData] = useState({
    activationCode:""
    // Add a field for user role
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
        "http://localhost:8000/api/users/confirm_user",
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
        
        <div className="field create-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="Create password"
              className="activationCode"
              name="activationCode" onChange={handleChange}   required value={userData.activationCode}
            />
         
          </div>
         
        </div>
      
        <div className="input_register buttonn ">
          <input type="submit" value="Submit Now" />
        </div>
      </form>
    </div>

</main>
  );
}

export default  Confirmation;
