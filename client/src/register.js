import React, { useState } from "react";
import axios from "axios";
import './register.css';
import { useNavigate } from "react-router-dom";
function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role:""
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
      userData.role="USER"
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        userData
      );
      navigate("/login");
      console.log("Registration successful:", response.data);
      // You can redirect users to a different page after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
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
        <div className="field create-password">
          <div className="input_register">
            <input
              type="password"
              placeholder="Create password"
              className="password"
              name="password" onChange={handleChange}   required value={userData.password}
            />
            <i className="bx bx-hide show-hide"></i>
          </div>
          <span className="error password-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">
              Please enter atleast 8 charatcer with number, symbol, small and
              capital letter.
            </p>
          </span>
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="username"
              className="username" name="username" onChange={handleChange}   required value={userData.username}
            />
            
          </div>
          <span className="error cPassword-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">Password don't match</p>
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

export default Register;
