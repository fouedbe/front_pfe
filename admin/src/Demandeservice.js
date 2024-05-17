import axios from "axios";

export const DemandeService = {
  

    getProducts() {
        try {
            const response =  axios.get(
              "http://localhost:8000/api/demande/all"
            
            );
           
          } catch (error) {
            console.error("Login failed:", error.response.data.message);
          }
        }
    

   
};
