import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './navbar.css';
import { Link } from "react-router-dom";
function CustomNavbar() {
   
  const navigate = useNavigate();
    return (
      <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
      
      <div className="d-flex align-items-center justify-content-between">
        <a href="/home" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt=""/>
          <span className="d-none d-lg-block">Tek up</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>
  
      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
          <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
      </div>
  
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
  
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>
  
          <li className="nav-item dropdown">
  
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>
  
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>
  
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>
  
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>
  
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>
  
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
  
            </ul>
  
          </li>
  
          <li className="nav-item dropdown">
  
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text"></i>
              <span className="badge bg-success badge-number">3</span>
            </a>
  
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="message-item">
                <a href="#">
                  <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle"/>
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>4 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="message-item">
                <a href="#">
                  <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle"/>
                  <div>
                    <h4>Anna Nelson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>6 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="message-item">
                <a href="#">
                  <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle"/>
                  <div>
                    <h4>David Muldon</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>8 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li className="dropdown-footer">
                <a href="#">Show all messages</a>
              </li>
  
            </ul>
  
          </li>
  
          <li className="nav-item dropdown pe-3">
  
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
              <span className="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
            </a>
  
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
              <li>
                <h1 className="dropdown-divider"/>
              </li>
  
              <li>
                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li>
                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li>
                <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
  
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
  
            </ul>
          </li>
  
        </ul>
      </nav>
  
    </header>
  
   
    <aside id="sidebar" className="sidebar">
  
      <ul className="sidebar-nav" id="sidebar-nav">
  
        <li className="nav-item">
          <a className="nav-link " href="index.html">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>
  
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-menu-button-wide"></i><span>Demande</span><i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <a routerLink="/admin/addstudent"  >
                <i className="bi bi-circle"></i><span >ajouter un demande</span>
              </a>
            </li>
            <li>
            <Link  to='/all'>
              <a routerLink="/admin/home">
                <i className="bi bi-circle"></i><span>list </span>
              </a>
              </Link>
            </li>
           
           
          
            
          
           
          
          </ul>
        </li>
  
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-journal-text"></i><span>User</span><i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
            <Link  to='/add'>
              <a routerLink="/admin/addteacher">
                <i className="bi bi-circle"></i><span >add user</span>
              </a>
              </Link>
              ..
              
            </li>
            <li>
            <Link  to='/user'>
              <a >
                <i className="bi bi-circle"></i><span>Liste user</span>
              </a>
              </Link>
            </li>
          
           
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-journal-text"></i><span>Comptes</span><i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
            <Link  to='/add'>
              <a routerLink="/admin/addteacher">
                <i className="bi bi-circle"></i><span >add user</span>
              </a>
              </Link>
              ..
              
            </li>
            <li>
            <Link  to='/compte'>
              <a >
                <i className="bi bi-circle"></i><span>Liste comptes</span>
              </a>
              </Link>
            </li>
          
           
          </ul>
        </li>
  
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-journal-text"></i><span>Services</span><i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
            <Link  to='/transaction'>
              <a routerLink="/admin/addteacher">
                <i className="bi bi-circle"></i><span >transaction</span>
              </a>
              </Link>
              ..
              
            </li>
            <li>
            <Link  to='/user'>
              <a >
                <i className="bi bi-circle"></i><span>Liste user</span>
              </a>
              </Link>
            </li>
          
           
          </ul>
        </li>
  
    
  
     
  
        
  
        <li className="nav-heading">Pages</li>
  
        <li className="nav-item">
          <a className="nav-link collapsed" href="users-profile.html">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </a>
        </li>
  
        <li className="nav-item">
          <a className="nav-link collapsed" >
          <Link  to='/register'>
            <i className="bi bi-card-list"></i>
            <span>Register</span>
            </Link>
          </a>
        </li>
  
        <li className="nav-item">
          <a className="nav-link collapsed" >
          <Link  to='/login'>
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          </a>
        </li>
        
  
       
  
      </ul>
  
    </aside>
  
   
  
  
    </div>
  
  
  
    );
}

export default CustomNavbar;
