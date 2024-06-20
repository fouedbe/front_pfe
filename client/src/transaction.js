import React, { useState, useEffect, useRef } from 'react';
import logo from "./logo.svg";
import "./alldemande.css";
import axios from "axios";

import axiosInstance from './auth';
import { jwtDecode } from 'jwt-decode';
import { AiFillFileExcel } from "react-icons/ai";
import { useNavigate ,useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

function Transaction() {
  const [searchTerm, setSearchTerm] = useState('');
    const [transctionData, settransactionData] = useState({
       num_compte1:"", num_compte2:"",solde:0
         
      });
  const[history,sethistory]=useState(null );
  const [compte,setcompte] = useState(null );
  
  const [model,setModal]=useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    settransactionData({ ...transctionData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        
        const decoded = jwtDecode(token);
        const userId = decoded.id;
  
        const response = await axios.get(`http://localhost:8000/api/transaction/`, {
          headers: {
            'Authorization': `${token}`
          }})
          sethistory(response.data)
      } catch (error) {
        // Gérer les erreurs en cas d'échec de la requête
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const fetchData1 = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/compte/all");
        const comptes=(response.data);

        const token = localStorage.getItem("token");
        const decode = jwtDecode(token);
        const userId = decode.id;
        console.log(comptes)
        const userCompte = comptes.find(compteItem => compteItem.id_user === userId);
      
        if (userCompte) {
          setcompte(userCompte._id);
          console.log(userCompte);
        } else {
          console.log("Vous n'avez pas de compte");
        }
        
       
       
      } catch (error) {
        // Gérer les erreurs en cas d'échec de la requête
        console.error('Error fetching data:', error);
      }
    };

    // Appeler la fonction fetchData pour récupérer les données
    fetchData1();
   }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      // Make a POST request to the backend registration endpoint
      const userId1 =transctionData.num_compte1;
      const userId2 =transctionData.num_compte2;
    
      await axios.put(`http://localhost:8000/api/users/retrait/${userId1}`,transctionData);
      await axios.put(`http://localhost:8000/api/users/depot/${userId2}`,transctionData);
      navigate("/transaction")
      alert("Update successful:");
      setModal(false); 
      // You can redirect users to a different page after successful registration
    } catch (error) {
      alert("Registration failed:", error.response.data.message);
      // You can display an error message to the user
    }
    
   
  };
  const adddemande= () => {
    setModal(true);
  };
  const canceladd = () => {
    setModal(false);
  };
  return (
    <div className="demandeall">
     
    <main className="tablee" >
      <section className="table__header">
          <h1>Customer's Orders</h1>
          <div className="input-groupp">
              <input type="search" placeholder="Search Data..."  value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
              <img src="../public/assets/img/search.png" alt="" />
          </div>
          <h1>add Transaction :</h1>
          <div className="export__file">
         
              <label for="export-file" className="export__file-btn" title="Export File" onClick={() => adddemande()}></label>
             
          </div>
      </section>
      <section className="table__body">
          <table >
              <thead >
                  <tr >
                  
             
             <th><h1>compte</h1></th>
             <th><h1>Type</h1></th>
             <th><h1>montant</h1></th>
             <th><h1>solde</h1></th>
           
                  </tr>
              </thead>
              <tbody >
              {history &&history
            .filter(history => history.compte === compte &&
              history.compte.toLowerCase().includes(searchTerm.toLowerCase()) )
            .map((data) => (
              <tr key={data.id}>
                
                <td>{data.compte}</td>
                <td>{data.type}</td>
                <td>{data.montant}</td>
                <td>{data.solde}</td>
                
               
              </tr>
            ))}  
                 
              </tbody>
          </table>
      </section>
  </main>
    
      



      <Modal isOpen={model} >
        <ModalHeader >
         <div><h3>add Transaction </h3></div>
        </ModalHeader>

        <ModalBody  >
        
          <FormGroup>
            <label>
            num_compte1:
            </label>
            <input
              className="form-control"
              name="num_compte1"
              type="text"
              onChange={handleChange}
              value={transctionData.num_compte1}
            />
          </FormGroup>
          
          <FormGroup>
            <label>
              num_compte2
            </label>
            <input
              className="form-control"
              name="num_compte2"
              type="text"
              onChange={handleChange}
              value={transctionData.num_compte2}
            />
          </FormGroup>
          <FormGroup>
            <label>
             solde
            </label>
          
            <input
              className="form-control"
              name="solde"
              type="text"
              value={transctionData.solde}
              onChange={handleChange}
            />
          </FormGroup>
          
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            add
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => canceladd()} 
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
      
       
      </div>
  );
}

export default Transaction;
