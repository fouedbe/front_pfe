import React from 'react';
import Register from './register';
import Demande from './demande';
import Navbar from './navbar';
import Demandes from'./alldemande';
import Login from './login';
import { useNavigate } from "react-router-dom";
import AddUser from './adduser';
import Users from './allusers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import  {useState,useEffect} from 'react';
import Compte from './compte';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login'); // Redirige vers la page de connexion au montage du composant
  }, []);

  return (
    <div style={{ display: 'flex' }} >
    
        <div className='main'>
          <Navbar />
          <main className="content">
            <div className="container-fluid p-0">
            <ToastContainer />
              <Routes>
                <Route exact path="/" element={<Demande />} /> 
                <Route exact path="/compte" element={<Compte />} /> 
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/all" element={<Demandes />} /> 
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/add" element={<AddUser/>} />
                <Route exact path="/user" element={<Users/>} />
               
              </Routes>
            </div>
          </main>
     
        </div>

    </div>
  );
}

export default App;
