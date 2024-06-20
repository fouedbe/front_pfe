import React, { useState, useEffect, useRef } from 'react';
import logo from "./logo.svg";
import "./alldemande.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from './auth';
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



export default function Pret() {
  
  const location = useLocation();
    const [Users, setUser] = useState(null);
    
    const [prets, setprets] = useState(null);
    const[updatedpret,setUpdatedpret]=useState({  name: '',
    email: '',
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
    propertyValue: '',
    });
    const [demandeData, setDemandesData] = useState({
        title: "",
        description: "",
        quantity: "",
        lieu:""
        
         
      });
    const [modalActualizar, setModalActualizar]=useState(false);
    const [model,setModal]=useState(false);
    const [confmodel,setConfModal]=useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';
    useEffect(() => {
      
        // Fonction asynchrone pour effectuer la requête
        const fetchData = async () => {
          try {
           
            // Faire la requête GET à l'API
            const response = await axiosInstance.get('/pret/all');
           
            // Récupérer les données de la réponse et les stocker dans l'état
            setprets(response.data);
           
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
      
          const exportData = prets.map(item => ({
            // Customize this according to your data structure
            Title: item.title,
            Description: item.description,
            Quantity: item.quantity,
            emailuser: item.emailuser,
           
          }));
      
          const ws = XLSX.utils.json_to_sheet(exportData);
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const dataBlob = new Blob([excelBuffer], { type: fileType });
      
          FileSaver.saveAs(dataBlob, "demandes" + fileExtension);
      };

      const handleChange = (e) => {
       
        setUpdatedpret({ ...updatedpret, [e.target.name]: e.target.value });
      };
      const handleChangee = (e) => {
       
        setDemandesData({ ...demandeData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = updatedpret._id;
            console.log(userId)
          // Mettre à jour l'utilisateur sur le serveur
           await axios.put(`http://localhost:8000/api/pret/update/${userId}`, updatedpret);
          alert('User updated successfully!');
          // Réinitialiser les champs après la mise à jour
          setUpdatedpret({
            name: '',
      email: '',
      loanAmount: '',
      loanTerm: '',
      interestRate: '',
      propertyValue: '',
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
        setUpdatedpret(data);
        setModalActualizar(true);
      };
      const confirm = (data) => {
        // Mettre en œuvre la logique pour la mise à jour des données ici
        console.log("Data to update:", data);
        setUpdatedpret(data);
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
          await axios.delete(`http://localhost:8000/api/pret/${id}`);
          setprets(prets.filter((prets) => prets._id !== id));
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
      <div className="reg">
        <Container>
        <br />
          <Button color="success" onClick={() => adddemande()}>Créer</Button>
          <Button color="success" onClick={ExportHandler}>Excel</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
               
                <th>name</th>                 
                <th>loanAmount</th>
                <th>loanTerm</th>
                <th>interestRate</th>
                <th>propertyValue</th>
              </tr>
            </thead>

            <tbody>
              {prets &&prets
              .filter(prets => search.trim() === '' || prets.name.toLowerCase().includes(search.toLowerCase()))
              .map((data) => (
                <tr key={data.id}>
                  
                  <td>{data.name}</td>
                  <td>{data.loanAmount}</td>
                  <th>{data.loanTerm}</th>
                  <th>{data.interestRate}</th>
                  <th>{data.propertyValue}</th>
                  
                  <td>
                    <Button
                      color="primary"
                      onClick={() =>update(data)}
                    >
                      update
                    </Button>{" "}
                    <Button color="primary"  onClick={() =>confirm(data)}>confirm</Button>
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
                
                value={updatedpret._id}
              />
            </FormGroup>
            <FormGroup>
              <label>
              loanAmount 
              </label>
              <input
                className="form-control"
                name="loanAmount"
                type="text"
                onChange={handleChange}
                value={updatedpret.loanAmount}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              loanTerm
              </label>
              <input
                className="form-control"
                name="loanTerm"
                type="text"
                onChange={handleChange}
                value={updatedpret.loanTerm}
              />
            </FormGroup>
            <FormGroup>
              <label>
              interestRate
              </label>
            
              <input
                className="form-control"
                name="interestRate"
                type="text"
                value={updatedpret.interestRate}
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
           <div><h3>add pret immobilier </h3></div>
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
                
                value={updatedpret._id}
                
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                date
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={handleChange}
                value={updatedpret.email}
              />
            </FormGroup>
              
            <FormGroup>
              <label>
              interestRate
              </label>
              <input
                className="form-control"
                name="interestRate"
                type="text"
                onChange={handleChange}
                value={updatedpret.interestRate}
              />
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

