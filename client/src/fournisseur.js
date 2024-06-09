import React, { useState, useEffect, useRef } from 'react';
import logo from "./logo.svg";
import "./alldemande.css";
import axios from "axios";
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';
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



export default function Fournisseur() {
  const [searchTerm, setSearchTerm] = useState('');
   const [username, setusername] = useState(null);
    const [Users, setUser] = useState(null);
    const [Demandes, setDemandes] = useState(null);
    const[updatedDemande,setUpdatedDemande]=useState({title:"",description:"",quantity:"",lieu:"",date:"",fournisseur:""
    });
    const [demandeData, setDemandesData] = useState({
        title: "",
        description: "",
        quantity: "",
        lieu:"",
        emailuser:"",
        satatus:""
         
      });
    const [modalActualizar, setModalActualizar]=useState(false);
    const [model,setModal]=useState(false);
    const [confmodel,setConfModal]=useState(false);
    
    useEffect(() => {
        // Fonction asynchrone pour effectuer la requête
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            const decode = jwtDecode(token);
               setusername(decode.name);
               console.log(username);
            // Faire la requête GET à l'API
            const response = await axios.get('http://localhost:8000/api/demande/all');
    
            // Récupérer les données de la réponse et les stocker dans l'état
            setDemandes(response.data);
            console.log(localStorage);
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
            const response = await axios.get('http://localhost:8000/api/users/');
           
            // Récupérer les données de la réponse et les stocker dans l'état
            setUser(response.data);
            
          } catch (error) {
            // Gérer les erreurs en cas d'échec de la requête
            console.error('Error fetching data:', error);
          }
        };
    
        // Appeler la fonction fetchData pour récupérer les données
        fetchData1();
      }, []);
     
      const ExportHandler = async () => {
       
        console.log(Users);
          const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          const fileExtension = '.xlsx';
      
          const exportData = Demandes.map(item => ({
            // Customize this according to your data structure
            Title: item.title,
            Description: item.description,
            Quantity: item.quantity,
            Price: item.price,
          }));
      
          const ws = XLSX.utils.json_to_sheet(exportData);
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const dataBlob = new Blob([excelBuffer], { type: fileType });
      
          FileSaver.saveAs(dataBlob, "demandes" + fileExtension);
      };

      const handleChange = (e) => {
       
        setUpdatedDemande({ ...updatedDemande, [e.target.name]: e.target.value });
      };
      const handleChangee = (e) => {
       
        setDemandesData({ ...demandeData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = updatedDemande._id;
            console.log(userId)
          // Mettre à jour l'utilisateur sur le serveur
           await axios.put(`http://localhost:8000/api/demande/update/${userId}`, updatedDemande);
          alert('User updated successfully!');
          // Réinitialiser les champs après la mise à jour
          setUpdatedDemande({
            title:"",description:"",quantity:"",lieu:""
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
        setUpdatedDemande(data);
        setModalActualizar(true);
      };
      const confirm = (data) => {
        // Mettre en œuvre la logique pour la mise à jour des données ici
        console.log("Data to update:", data);
        setUpdatedDemande(data);
        setConfModal(true);
      };
      const cancel = () => {
        setModalActualizar(false);
      };
      const canceladd = () => {
        setModal(false);
      };
      const cancelconf= () => {
        setConfModal(false);
      };
      const adddemande= () => {
        setModal(true);
      };
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/demande/${id}`);
          setDemandes(Demandes.filter((Demandes) => Demandes._id !== id));
        } catch (error) {
          console.error('Error deleting demandes:');
        }
      };
      const handleSubmitt = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem("token");
          const decode = jwtDecode(token);
          demandeData.emailuser=decode.email;
          demandeData.status="En attente";
          // Make a POST request to the backend endpoint for adding users
          const response = await axios.post(
            "http://localhost:8000/api/demande/add",
            demandeData
          );
          console.log("demande added successfully:", response.data);
          setModal(false);  // You can handle the success response here, such as displaying a success message
        } catch (error) {
          console.error("Failed to add user:", error.response.data.message);
          // You can handle the error here, such as displaying an error message to the user
        }
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
            <h1>add demande :</h1>
            <div className="export__file">
           
                <label for="export-file" className="export__file-btn" title="Export File" onClick={() => adddemande()}></label>
               
            </div>
        </section>
        <section className="table__body">
            <table >
                <thead >
                    <tr >
                    
               
               <th><h1>title</h1></th>
               <th><h1>description</h1></th>
               <th><h1>quantity</h1></th>
               <th><h1>satatus</h1></th>
             
                    </tr>
                </thead>
                <tbody >
                {Demandes &&Demandes
              .filter(Demandes => Demandes.fournisseur === username &&
                Demandes.title.toLowerCase().includes(searchTerm.toLowerCase()) )
              .map((data) => (
                <tr key={data.id}>
                  
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.quantity}</td>
                  <td>{data.status}</td>
                  
                  <td>
                    <Button
                      color="primary"
                      onClick={() =>update(data)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>{" "}
                    
                    <Button color="danger"  onClick={() => handleDelete(data._id)}> <i className="fas fa-trash-alt"></i> </Button>
                  </td>
                </tr>
              ))}  
                   
                </tbody>
            </table>
        </section>
    </main>
      
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
                
                value={updatedDemande._id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                title 
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                onChange={handleChange}
                value={updatedDemande.title}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                description
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={handleChange}
                value={updatedDemande.description}
              />
            </FormGroup>
            <FormGroup>
              <label>
               quantity
              </label>
            
              <input
                className="form-control"
                name="quantity"
                type="text"
                value={updatedDemande.quantity}
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
           <div><h3>add demande </h3></div>
          </ModalHeader>

          <ModalBody  >
          
            <FormGroup>
              <label>
                title 
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                onChange={handleChangee}
                value={demandeData.title}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                description
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={handleChangee}
                value={demandeData.description}
              />
            </FormGroup>
            <FormGroup>
              <label>
               quantity
              </label>
            
              <input
                className="form-control"
                name="quantity"
                type="text"
                value={demandeData.quantity}
                onChange={handleChangee}
              />
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
        <Modal isOpen={confmodel} >
          <ModalHeader >
           <div><h3>confirmation </h3></div>
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
                
                value={updatedDemande._id}
                
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                date
              </label>
              <input
                className="form-control"
                name="description"
                type="date"
                onChange={handleChange}
                value={updatedDemande.date}
              />
            </FormGroup>
            <FormGroup>
           
            <select name="fournisseur" value={updatedDemande.fournisseur} onChange={handleChange}>
            {Users && Users
            .filter(Users => Users.role === 'FOURNISSEUR')
            .map((item) => (
          <option key={item.role} value={item.value}>
            {item.username}
          </option>
        ))}
            
          </select>
          
          </FormGroup>
            
            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              confirm
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => cancelconf()} 
            >
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    
    );
  
}

