import React, { useState, useEffect} from "react";
import axios from "axios";
import './register.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
function Immobilaire() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        loanAmount: '',
        loanTerm: '',
        interestRate:5,
        propertyValue: '',
    });
 
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
 
    const updatedFormData = {
      ...formData,
      [name]: value
    };
  
    const loanAmount = parseFloat(updatedFormData.loanAmount) || 0;
    const loanTerm = parseFloat(updatedFormData.loanTerm) || 0;
    const interestRate = parseFloat(updatedFormData.interestRate) ||0 ;

    const propertyValue = loanAmount + (loanAmount * 5 / 100);

    setFormData({
      ...updatedFormData,
      propertyValue: propertyValue.toFixed(2) // toFixed(2) to format to 2 decimal places
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
            const decode = jwtDecode(token);
            const userId =decode.id;
    // Fonction asynchrone pour effectuer la requête
    const fetchData = async () => {
      try {
        
        // Faire la requête GET à l'API
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
       
        // Récupérer les données de la réponse et les stocker dans l'état
        setFormData(response.data);
        
      } catch (error) {
        // Gérer les erreurs en cas d'échec de la requête
        console.error('Error fetching data:', error);
      }
    };

    // Appeler la fonction fetchData pour récupérer les données
    fetchData();
   
  
     
    }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      
      
      const updatedFormData = {
        ...formData,
        email: decode.email,
        name: decode.name
      };
      // Make a POST request to the backend registration endpoint
      const response = await axios.post(
        "http://localhost:8000/api/pret/add",
        updatedFormData
      );
      alert("pret added successfully:", response.data);
    setFormData({
      name: '',
      email: '',
      loanAmount: '',
      loanTerm: '',
      interestRate: 5,
      propertyValue: '',
  })

    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      // You can display an error message to the user
    }
  };

  return (
    <main className="re">
  <div className="containe">
      <header>Pért Immobilaire</header>
      <form onSubmit={handleSubmit}>
        <div className="field email-field">
          <div className="input_register">
            <input type="text" placeholder="Enter your loanAmount"onChange={handleChange}  className="loanAmount" name="loanAmount" required value={formData.loanAmount} />
          </div>
          
        </div>
        <div className="field create-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="loanTerm"
              className="loanTerm"
              name="loanTerm" onChange={handleChange}   required value={formData.loanTerm}
            />
            <i className="bx bx-hide show-hide"></i>
          </div>
         
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="interestRate"
              className="interestRate" name="interestRate" readOnly   required value={formData.interestRate}
            />
            
          </div>
          
         
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="propertyValue" readOnly
              className=" propertyValue" name="propertyValue"   required value={formData.propertyValue}
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

export default Immobilaire;
