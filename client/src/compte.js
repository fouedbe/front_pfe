import React, { useState, useEffect} from "react";
import axios from "axios";
import './register.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
function Compte() {
  const [compteData, setCompteData] = useState({
    username: "",
    email: "",
    password: "",
    
    // Add a field for user role
  });
  const[solde,setsolde]=useState(null);
  const [compte,setCompte]=useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCompteData({ ...compteData, [e.target.name]: e.target.value });
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
        setCompteData(response.data);
        
      } catch (error) {
        // Gérer les erreurs en cas d'échec de la requête
        console.error('Error fetching data:', error);
      }
    };

    // Appeler la fonction fetchData pour récupérer les données
    fetchData();
    const fetchData1 = async () => {
      try {
        
        const response = await axios.get("http://localhost:8000/api/compte/all");
        const comptes=(response.data);

        const token = localStorage.getItem("token");
        const decode = jwtDecode(token);
        const userId = decode.id;
        
        const userCompte = comptes.find(compteItem => compteItem.id_user === userId);
      
        if (userCompte) {
          setsolde(userCompte.solde);
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
      const userId =compteData._id;
      const response = await axios.put(
        `http://localhost:8000/api/users/${userId}` ,
        compteData
      );
      navigate("/compte");
      console.log("Update successful:", response.data);
      // You can redirect users to a different page after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      // You can display an error message to the user
    }
  };

  return (
    <main className="re">
  <div className="containe">
      <header>Mon compte</header>
      <form onSubmit={handleSubmit}>
        <div className="field email-field">
          <div className="input_register">
            <input type="email" placeholder="Enter your email"onChange={handleChange}  className="email" name="email" required value={compteData.email} />
          </div>
          <span className="error email-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">Please enter a valid email</p>
          </span>
        </div>
        <div className="field create-password">
          <div className="input_register">
            <input
              type="password"
              placeholder="change password"
              className="password"
              name="password" onChange={handleChange}   required value={compteData.password}
            />
            <i className="bx bx-hide show-hide"></i>
          </div>
          <span className="error password-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">
              Please enter atleast 8 charatcer with number, symbol, small and
              capital letter.
            </p>
          </span>
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="username"
              className="username" name="username" onChange={handleChange}   required value={compteData.username}
            />
            
          </div>
          
          <span className="error cPassword-error">
            <i className="bx bx-error-circle error-icon"></i>
            <p className="error-text">Password don't match</p>
          </span>
        </div>
        <div className="field confirm-password">
          <div className="input_register">
            <input
              type="text"
              placeholder="solde"
              className="solde" name="solde"   required value={solde}
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

export default Compte;
