import axios from 'axios';

// Créez une instance d'Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Remplacez par l'URL de base de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoutez un intercepteur de requête pour inclure le token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      console.log('Adding token to request headers:', token); // Log le token
      config.headers.Authorization = ` ${token}`;
    } else {
      console.log('No token found in localStorage'); // Log si aucun token n'est trouvé
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
