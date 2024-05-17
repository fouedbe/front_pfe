import React from 'react';
import './login.css';
import { jwtDecode } from 'jwt-decode';
import { setAuth } from './setauth';
import axios from "axios";
import useAuth from './auth';
import  {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  var LoginForm = document.getElementById("LoginForm");
  var RegForm = document.getElementById("RegForm");
  var Indicator = document.getElementById("Indicator");
  const { updateUserRole } = useAuth();
    const navigate = useNavigate();
    const [user,setUser]=useState({email : "", password:""});
    const [activeForm, setActiveForm] = useState('login'); 
    console.log(LoginForm);
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
          
            navigate("/all");
          
          console.log("Login successful!");
         // Redirect to Home component after successful login
        } catch (error) {
          console.error("Login failed:", error.response.data.message);
        }
      };
     
  
         
  return (
    <main className='R'>
  <div className="wrapper">
    <form action="#" onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div className="input-field">
        <input type="text" name="email"required onChange={handleChange} value={user.email}/>
        <label>Enter your email</label>
      </div>
      <div class="input-field">
        <input type="password" name="password" required onChange={handleChange} value={user.password}/>
        <label>Enter your password</label>
      </div>
      <div className="forget">
        <label for="remember">
          <input type="checkbox" id="remember"/>
          <p>Remember me</p>
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit">Log In</button>
      <div className="register">
        <p>Don't have an account?  <Link  to='/register'><a href="#">Register</a></Link></p>
      </div>
    </form>
  </div>
</main>
);
}

export default Login;

