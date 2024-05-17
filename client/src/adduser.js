import React, { useState } from "react";
import axios from "axios";
import './login.css';
import { useNavigate } from "react-router-dom";
const AddUser = ({ user }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
     
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend endpoint for adding users
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        userData
      );
      console.log("User added successfully:", response.data);
      navigate("/");  // You can handle the success response here, such as displaying a success message
    } catch (error) {
      console.error("Failed to add user:", error.response.data.message);
      // You can handle the error here, such as displaying an error message to the user
    }
  };

  return (
    <div className="dem">
    <div className="container mt-5">
        <form onSubmit={handleSubmit}>
            <h2>Informations générales sur un user :</h2>
            <div className="col-12">
                <label for="yourPassword" className="form-label">username</label>
                <input type="text"  className="form-control" placeholder="username" name="username" value={userData.username}
            onChange={handleChange}/>
                <div className="invalid-feedback">Please enter your title!</div>
              </div>
              <div className="col-12">
                <label for="yourPassword" className="form-label">email</label>
                <input type="text"  className="form-control" placeholder="email" name="email" value={userData.email}
            onChange={handleChange}/>
                <div className="invalid-feedback">Please enter your email!</div>
              </div>
              <div className="col-12">
                <label for="yourPassword" className="form-label">password</label>
                <input type="password"  className="form-control" placeholder="password" name="password" value={userData.password}
            onChange={handleChange}/>
                <div className="invalid-feedback">Please enter your password!</div>
              </div>
             
 
    
    

            <button type="submit" className="btn btn-primary">Soumettre la demande</button>
        </form>
    </div>
    </div>
  );
}

export default AddUser;
