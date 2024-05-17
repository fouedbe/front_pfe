
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du fichier CSS de Bootstrap
import axios from "axios";
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import "./demande.css";
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
function Demande() {
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Tom Brown', age: 35, email: 'tom@example.com' },
  ];
  
    return (
      <div className="card">
      <div className="card-header">Tableau des utilisateurs</div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  


            
   
}

export default Demande;
