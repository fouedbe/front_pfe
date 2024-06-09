import React from 'react';
import './login.css';
import { jwtDecode } from 'jwt-decode';
import { setAuth } from './setauth';
import axios from "axios";
import useAuth from './auth';
import  {useState} from 'react';
import { useNavigate } from "react-router-dom";
function Login() {
  
    const navigate = useNavigate();
    const [user,setUser]=useState({email : "", password:""});
   
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/login",
            user
          );
          const { token } = response.data; // Access role from server response
          console.log("Role from server:", user.role);
          localStorage.setItem("token", token);
          const decode = jwtDecode(token)
         
          console.log(decode);
          
          setAuth(token)
          
          console.log(user);
          if(user.email =="chaher@gmail.com"){
            navigate("/");
          }else{
            navigate("/");
          }
          console.log("Login successful!");
         // Redirect to Home component after successful login
        } catch (error) {
          console.error("Login failed:", error.response.data.message);
        }
      };
      
  return (
    <main>
  <div className="container">

    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

            <div className="d-flex justify-content-center py-4">
              <a routerLink="/home" className="logo d-flex align-items-center w-auto">
                <img src="assets/navbar/img/logo.png" alt=""/>
                <span className="d-none d-lg-block">banking academy</span>
              </a>
            </div>

            <div className="card mb-3">

              <div className="card-body">

                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                  <p className="text-center small">Enter your username & password to login</p>
                </div>

                <form className="row g-3 needs-validation" novalidate onSubmit={handleSubmit} >

                  <div className="col-12">
                    <label for="yourUsername" className="form-label">email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">@</span>
                      <input type="text"  className="form-control"  name="email"  placeholder="email" required value={user.email}
                onChange={handleChange} />
                      <div className="invalid-feedback">Please enter your username.</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="yourPassword" className="form-label">Password</label>
                    <input type="password"  className="form-control" placeholder="password" name="password" value={user.password}
                onChange={handleChange}/>
                    <div className="invalid-feedback">Please enter your password!</div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                      <label className="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                  </div>
                  <div className="col-12">
                    <p className="small mb-0">Don't have account? <a routerLink="/register">Create an account</a></p>
                  </div>
                </form>

              </div>
            </div>

           
          </div>
        </div>
      </div>

    </section>

  </div>
</main>
);
}

export default Login;

