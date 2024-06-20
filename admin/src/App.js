import React from 'react';
import Register from './register';
import Demande from './demande';
import CustomNavbar from './navbar';
import Demandes from'./alldemande';
import Login from './login';
import { useNavigate } from "react-router-dom";
import AddUser from './adduser';
import Users from './allusers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import  {useState,useEffect} from 'react';
import Comptes from './compte';
import Transaction from './transaction';
import History from './history';
import Pret from './pret';
function App() {
  const navigate = useNavigate();




  return (
    <div style={{ display: 'flex' }} >
    
        <div className='main'>
          <CustomNavbar />
          <main className="content">
            <div className="container-fluid p-0">
            <ToastContainer />
              <Routes>
                <Route exact path="/" element={<Demande />} /> 
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/transaction" element={<Transaction />} />
                <Route exact path="/all" element={<Demandes />} /> 
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/add" element={<AddUser/>} />
                <Route exact path="/user" element={<Users/>} />
                <Route exact path="/compte" element={<Comptes/>} />
                <Route exact path="/history" element={<History/>} />
                <Route exact path="/pret" element={<Pret/>} />
              </Routes>
            </div>
          </main>
     
        </div>

    </div>
  );
}

export default App;
