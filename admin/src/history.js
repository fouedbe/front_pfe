import React, { useState, useEffect, useRef } from 'react';
import logo from "./logo.svg";
import "./alldemande.css";
import { useLocation } from 'react-router-dom';
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



export default function History() {
  
  const location = useLocation();
    const [Users, setUser] = useState(null);
    
    const [Demandes, setDemandes] = useState(null);
    const[updatedDemande,setUpdatedDemande]=useState({title:"",description:"",quantity:0,lieu:"",date:"",fournisseur:"",prix:0
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
            const response = await axios.get('http://localhost:8000/api/transaction/');
           
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
            emailuser: item.emailuser,
            nombre:Demandes.length
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
            title:"",description:"",quantity:0,lieu:"",fournisseur:"",prix:0
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
               
                <th>compte</th>
                <th>type</th>
                <th>montant</th>
                <th>solde</th>
                
              </tr>
            </thead>

            <tbody>
              {Demandes &&Demandes
              .filter(Demandes => search.trim() === '' || Demandes.title.toLowerCase().includes(search.toLowerCase()))
              .map((data) => (
                <tr key={data.id}>
                  
                  <td>{data.compte}</td>
                  <td>{data.type}</td>
                  <th>{data.montant}</th>
                  <th>{data.solde}</th>
                  
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

      </div>
    );
  
}

