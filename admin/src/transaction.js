import React, { useState , useEffect } from "react";
import axios from "axios";
import './transaction.css';
import { useNavigate } from "react-router-dom";
function Transaction() {
    const [transctionData, settransactionData] = useState({
       id_user1:"", id_user2:"",solde:0
         
      });
  const [userData1, setUserData1] = useState(null );
  const [userData2, setUserData2] = useState(null );
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    settransactionData({ ...transctionData, [e.target.name]: e.target.value });
  };
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      // Make a POST request to the backend registration endpoint
      const userId1 =transctionData.id_user1;
      const userId2 =transctionData.id_user2;
      console.log(userData2);
      await axios.put(`http://localhost:8000/api/compte/depot/${userId1}`,transctionData);
      await axios.put(`http://localhost:8000/api/compte/retrait/${userId2}`,transctionData);
      navigate("/compte")
      console.log("Update successful:");
      
      // You can redirect users to a different page after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      // You can display an error message to the user
    }
    
   
  };
  return (
    <main className="re">
  <div className="containe">
      <header>Transaction</header>
      <form onSubmit={handleSubmit}>
        
      <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="id_user1"
              className="id_user1" name="id_user1" onChange={handleChange}   required value={transctionData.id_user1}
            />
            
          </div>
         
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="id_user2"
              className="id_user2" name="id_user2" onChange={handleChange}   required value={transctionData.id_user2}
            />
            
          </div>
         
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="number"
              placeholder="solde"
              className="solde" name="solde" onChange={handleChange}   required value={transctionData.solde}
            />
            
          </div>
         
        </div>
        <div className="input_register buttonn ">
          <input type="submit" value="Submit Now" />
        </div>
      </form>
    </div>

</main>
  );
}

export default Transaction;
