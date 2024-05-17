import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";


function Navbar({ user }) {
  
  const LogoutHanlder = ()=>{
     
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
                        <li class="nav-item">
                            <a href="index.html" class="nav-link">Accueil</a>
                        </li>
                        <Link  to='/compte'>
                        <li class="nav-item">
                            <a href="products.html" class="nav-link">mon compte</a>
                        </li>
                        </Link>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a href="./apropo.html" class="nav-link">prêts immobiliers</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.html" class="nav-link">Contact</a>
                        </li>
                    </ul>
                </div>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <i class="bi bi-search"></i>
                   
                  </form>
                <div class="icons d-flex">
                    
                    <a href="./account.html"><div><i class='bx bx-user'></i></div></a>
                    <div><i class='bx bx-heart'></i></div>
                    <div>
                       <a href="./cart.html"><i class='bx bx-shopping-bag'></i></a>
                        <span class="align-center">0</span>    
                    </div>
                </div>
            </div>
        </nav>
       
    </header>
    </div>
  );
}

export default Navbar;
