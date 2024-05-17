import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
const useAuth = () => {
  const [user, setUser] = useState({ isAuthenticated: false, role: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
      
    if (token) {
      try {
        // Parse the JWT token to extract user information
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        const userRole = payload.role;
        
      
        setUser({ isAuthenticated: true, role: userRole });
        //console.log("User set:", { isAuthenticated: true, role: userRole });
      } catch (error) {
        console.error("Error parsing token:", error);
        setUser({ isAuthenticated: false, role: null });
      }
    } else {
      setUser({ isAuthenticated: false, role: null });
    }
  }, []);

  const updateUserRole = (newRole) => {
    setUser(prevUser => ({ ...prevUser, role: newRole }));
  };

  const isAuthenticated = user.isAuthenticated;

  return { user, updateUserRole, isAuthenticated };
};

export default useAuth;
