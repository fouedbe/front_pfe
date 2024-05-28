import React from 'react';
import Register from './register';
import Confirmation from './confirmation';
import Navbar from './navbar';
import Demandes from'./alldemande';
import Login from './login';
import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import  {useState,useEffect} from 'react';
import Compte from './compte';
import Transaction from './transaction';
import Forget from './forget_password';
import Updatepass from './updatepassword';
function App() {
  const navigate = useNavigate();

 

  return (
    <div style={{ display: 'flex' }} >
    
        <div className='main'>
          <Navbar />
          <main className="content">
            <div className="container-fluid p-0">
            <ToastContainer />
              <Routes>
                
                <Route exact path="/compte" element={<Compte />} /> 
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/all" element={<Demandes />} /> 
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/forget" element={<Forget />} />
                <Route exact path="/updatepass" element={<Updatepass />} />
                <Route exact path="/confirmation" element={<Confirmation />} />
                <Route exact path="/transaction" element={<Transaction/>} />
               
              </Routes>
            </div>
          </main>
     
        </div>

    </div>
  );
}

export default App;
