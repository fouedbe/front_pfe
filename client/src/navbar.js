import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const Logout = ()=>{
        localStorage.removeItem('token')
        navigate('/login');

    }
  return (
    <div className="p">
    <div className="promo">
        <span>Vente FLASH 80% de Réduction</span>
    </div>
    <header className="header">
        <nav class="nav container-fluid">
            <div class="navigation d-flex">
                <div class="icon1">
                    <i class='bx bx-menu'></i>
                </div>
                <div class="logo">
                    <a href="index.html"><span>T</span>ek-up</a>
                </div>
                <div class="menu">
                    <div class="top">
                        <span class="fermer">Fermer <i class='bx bx-x'></i></span>
                    </div>
                    <ul class="nav_list d-flex">
                    <Link  to='/compte'>
                        <li class="nav-item">
                            <a  class="nav-link">Accueil</a>
                        </li>
                        </Link>
                        <Link  to='/compte'>
                        <li class="nav-item">
                            <a  class="nav-link">mon compte</a>
                        </li>
                        </Link>
                        <Link  to='/transaction'>
                        <li class="nav-item">
                            <a  class="nav-link">Transaction</a>
                        </li>
                        </Link>
                        <li class="nav-item">
                            <a  class="nav-link">prêts immobiliers</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.html" class="nav-link">Contact</a>
                        </li>
                    </ul>
                </div>
                <form class="d-flexx">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    
                   
                  </form>
                <div class="icons d-flex">
                    
                    <a onClick={() => Logout()}><div><i class='bx bx-user'></i></div></a>
                    
                   
                </div>
            </div>
        </nav>
       
    </header>
    </div>
  );
}

export default Navbar;
