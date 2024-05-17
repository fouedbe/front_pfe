import './demande.css';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du fichier CSS de Bootstrap
import axios from "axios";
function Demande() {
    
    const [userData, setUserData] = useState({
            title:'',
            departement:'',
            
            description:'',
            
            quantity:'',
           
    });
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            "http://localhost:8000/api/demande/add",
            userData
          );
         
          console.log("Registration successful:", response.data,{ headers: {
            Authorization: `Bearer ${token}` // Inclure le token dans l'en-tête Authorization
          }});
          console.log(token);
         
          // You can redirect users to a different page after successful registration
        } catch (error) {
          console.error("Registration failed:", error.response.data.message);
          // You can display an error message to the user
        }
       
    };

    return (
        <div className="dem">
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2>Informations générales sur la demande d'achat :</h2>
                <div className="col-12">
                    <label for="yourPassword" className="form-label">title</label>
                    <input type="text"  className="form-control" placeholder="title" name="title" value={userData.title}
                onChange={handleChange}/>
                    <div className="invalid-feedback">Please enter your title!</div>
                  </div>
                  <div className="col-12">
                    <label for="yourPassword" className="form-label">departement</label>
                    <input type="text"  className="form-control" placeholder="departement" name="departement" value={userData.departement}
                onChange={handleChange}/>
                    <div className="invalid-feedback">Please enter your departement!</div>
                  </div>
                  <div className="col-12">
                    <label for="yourPassword" className="form-label">description</label>
                    <input type="text"  className="form-control" placeholder="description" name="description" value={userData.description}
                onChange={handleChange}/>
                    <div className="invalid-feedback">Please enter your description!</div>
                  </div>
                  <div className="col-12">
                    <label for="yourPassword" className="form-label">quantity</label>
                    <input type="text"  className="form-control" placeholder="quantity" name="quantity" value={userData.quantity}
                onChange={handleChange}/>
                    <div className="invalid-feedback">Please enter your description!</div>
                  </div>
     
        
        

                <button type="submit" className="btn btn-primary">Soumettre la demande</button>
            </form>
        </div>
        </div>
    );
}

export default Demande;
