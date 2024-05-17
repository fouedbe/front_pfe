import React, { useState, useEffect} from 'react';

import "./allusers.css";
import axios from "axios";

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



export default function Comptes() {
    const [Users, setUser] = useState(null);
    const [Comptes, setComptes] = useState(null);
    const[updatedUser,setUpdatedUser]=useState({num_compte:0,type:"",id_user:"",solde:0
    });
    const [compteData, setCompteData] = useState({
        num_compte:0,type:"",id_user:"",solde:0
         
      });
      
    const [modalActualizar, setModalActualizar]=useState(false);
    const [model,setModal]=useState(false);
    const [confmodel,setConfModal]=useState(false);
    useEffect(() => {
        // Fonction asynchrone pour effectuer la requête
        const fetchData = async () => {
          try {
            // Faire la requête GET à l'API
            const response = await axios.get('http://localhost:8000/api/users/');
           
            // Récupérer les données de la réponse et les stocker dans l'état
            setUser(response.data);
            
          } catch (error) {
            // Gérer les erreurs en cas d'échec de la requête
            console.error('Error fetching data:', error);
          }
        };
    
        // Appeler la fonction fetchData pour récupérer les données
        fetchData();
        const fetchData1 = async () => {
            try {
              // Faire la requête GET à l'API
              const response = await axios.get('http://localhost:8000/api/compte/all');
             
              // Récupérer les données de la réponse et les stocker dans l'état
              setComptes(response.data);
              
            } catch (error) {
              // Gérer les erreurs en cas d'échec de la requête
              console.error('Error fetching data:', error);
            }
          };
      
          // Appeler la fonction fetchData pour récupérer les données
          fetchData1();
      }, []);
     
      

      const handleChange = (e) => {
       
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
      };
      const handleChangee = (e) => {
       
        setCompteData({ ...compteData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = updatedUser._id;
            console.log(userId)
          // Mettre à jour l'utilisateur sur le serveur
           await axios.put(`http://localhost:8000/api/compte/update/${userId}`, updatedUser);
          alert('User updated successfully!');
          // Réinitialiser les champs après la mise à jour
          setUpdatedUser({
            num_compte:0,type:"",id_user:"",solde:0
            // Réinitialiser d'autres champs utilisateur si nécessaire
          });
          setModalActualizar(false);
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Failed to update user. Please try again later.');
        }
      };

      const update = (data) => {
        // Mettre en œuvre la logique pour la mise à jour des données ici
        console.log("Data to update:", data);
        setUpdatedUser(data);
        setModalActualizar(true);
      };
      const confirm = (data) => {
        // Mettre en œuvre la logique pour la mise à jour des données ici
        console.log("Data to update:", data);
        setUpdatedUser(data);
        setConfModal(true);
      };
      const cancelconf= () => {
        setConfModal(false);
      };
      const cancel = () => {
        setModalActualizar(false);
      };
      const canceladd = () => {
        setModal(false);
      };
      const adduser= () => {
        setModal(true);
      };
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/compte/${id}`);
          setUser(Comptes.filter((Comptes) => Comptes._id !== id));
        } catch (error) {
          console.error('Error deleting users:');
        }
      };
      const handleSubmitt = async (e) => {
        e.preventDefault();
        try {
          // Make a POST request to the backend endpoint for adding users
         
          const response = await axios.post(
            "http://localhost:8000/api/compte/add",
            compteData
          );
          console.log("User added successfully:", response.data);
          setModal(false);  // You can handle the success response here, such as displaying a success message
        } catch (error) {
          console.error("Failed to add user:", error.response.data.message);
          // You can handle the error here, such as displaying an error message to the user
        }
      };
      
    return (
      <div className="reg">
        <Container>
        <br />
          <Button color="success" onClick={() => adduser()}>Créer</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
               
                <th>num</th>
                <th>type</th>
                <th>solde</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Comptes && Comptes.map((data) => (
                <tr key={data.id}>
                  
                  <td>{data.num_compte}</td>
                  <td>{data.type}</td>
                  <th> {data.solde}</th>
                  
                  <td>
                    <Button
                      color="primary"
                      onClick={() =>update(data)}
                    >
                      update
                    </Button>{" "}
                    
                    <Button color="danger"  onClick={() => handleDelete(data._id)}>delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={modalActualizar}  >
        
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>
        
          <ModalBody  >
            
          <FormGroup>
              <label>
                id 
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                
                value={updatedUser._id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                num compte
              </label>
              <input
                className="form-control"
                name="num_compte"
                type="text"
                onChange={handleChange}
                value={updatedUser.num_compte}
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
                onChange={handleChange}
                value={updatedUser.solde}
              />
            </FormGroup>
            <select name="id_user" value={updatedUser.id_user} onChange={handleChange}>
            {Users && Users
            .filter(Users => Users.role === 'USER')
            .map((item) => (
          <option key={item._id} value={item.value}>
            {item._id}
          </option>
        ))}
            
          </select>
            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              update
            </Button>
            <Button
              color="danger"
              onClick={() => cancel()}
            >
              Annuler
            </Button>
          </ModalFooter>
          
        </Modal>



        <Modal isOpen={model} >
          <ModalHeader >
           <div><h3>add user </h3></div>
          </ModalHeader>

          <ModalBody  >
            <FormGroup >
            
            
            <FormGroup>
              <label>
                num_compte
              </label>
              <input
                className="form-control"
                name="num_compte"
                value={compteData.num_compte}
                type="text"
                onChange={handleChangee}
              />
            </FormGroup>
            <FormGroup>
           
            <select name="id_user" value={compteData.id_user} onChange={handleChangee}>
            {Users && Users
            .filter(Users => Users.role === 'USER')
            .map((item) => (
          <option key={item._id} value={item.value}>
            {item._id}
          </option>
        ))}
            
         
            
          </select>
          </FormGroup>
            <FormGroup>
              <label>
                solde
              </label>
              <input
                className="form-control"
                name="solde"
                value={compteData.solde}
                type="text"
                onChange={handleChangee}
              />
            </FormGroup>
            <FormGroup>
            <select name="type" value={compteData.type} onChange={handleChangee}>
            <option value="">Select type</option>
            <option value="courant">courant</option>
            <option value="epargne">epargne</option>
            <option value="titre">titre</option>
          </select>
            </FormGroup>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              onClick={(e) => handleSubmitt(e)}
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

