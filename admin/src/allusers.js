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



export default function Users() {
 
    const [Users, setUser] = useState(null);
    const[updatedUser,setUpdatedUser]=useState({username:"",email:"",password:""
    });
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        role:"",
        
         
      });
    const [modalActualizar, setModalActualizar]=useState(false);
    const [model,setModal]=useState(false);
    useEffect(() => {
        // Fonction asynchrone pour effectuer la requête
        const fetchData = async () => {
          try {
            // Faire la requête GET à l'API
            const response = await axios.get('http://localhost:8000/api/users/');
           
            // Récupérer les données de la réponse et les stocker dans l'état
            setUser(response.data);
            console.log(response.data);
          } catch (error) {
            // Gérer les erreurs en cas d'échec de la requête
            console.error('Error fetching data:', error);
          }
        };
    
        // Appeler la fonction fetchData pour récupérer les données
        fetchData();
      }, []);
     
      

      const handleChange = (e) => {
       
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
      };
      const handleChangee = (e) => {
       
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = updatedUser._id;
            console.log(userId)
          // Mettre à jour l'utilisateur sur le serveur
           await axios.put(`http://localhost:8000/api/users/${userId}`, updatedUser);
          alert('User updated successfully!');
          // Réinitialiser les champs après la mise à jour
          setUpdatedUser({
            username: '',
            email: '',
            password:'',
            role:'',
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
          await axios.delete(`http://localhost:8000/api/users/${id}`);
          setUser(Users.filter((Users) => Users._id !== id));
        } catch (error) {
          console.error('Error deleting users:');
        }
      };
      const handleSubmitt = async (e) => {
        e.preventDefault();
        try {
          // Make a POST request to the backend endpoint for adding users
          console.log(userData)
          const response = await axios.post(
            "http://localhost:8000/api/auth/register",
            userData
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
               
                <th>email</th>
                <th>username</th>
                <th>role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Users &&Users.map((data) => (
                <tr key={data.id}>
                  
                  <td>{data.email}</td>
                  <td>{data.username}</td>
                  <th> {data.role}</th>
                  
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
                username: 
              </label>
              <input
                className="form-control"
                name="username"
                type="text"
                onChange={handleChange}
                value={updatedUser.username}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                email
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={handleChange}
                value={updatedUser.email}
              />
            </FormGroup>
            <FormGroup>
              <label>
               password
              </label>
            
              <input
                className="form-control"
                name="password"
                type="text"
                value={updatedUser.password}
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
                email 
              </label>
              
              <input
                 className="form-control"
                 name="email"
                 type="text"
                 value={userData.email}
                 onChange={handleChangee}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                username
              </label>
              <input
                className="form-control"
                name="username"
                value={userData.username}
                type="text"
                onChange={handleChangee}
              />
            </FormGroup>
            <FormGroup>
            <select name="role" value={userData.role} onChange={handleChangee}>
            <option value="">Select Role</option>
            <option value="USER">user</option>
            <option value="FOURNISSEUR">fournisseur</option>
            
          </select>
          </FormGroup>
            <FormGroup>
              <label>
                password
              </label>
              <input
                className="form-control"
                name="password"
                value={userData.password}
                type="text"
                onChange={handleChangee}
              />
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

