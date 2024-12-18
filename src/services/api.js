import axios from 'axios';

const api = axios.create({
  baseURL: 'https://annadaata-backend-xtzg.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token); // Store token in local storage
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token } = response.data;

    setAuthToken(token);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error registering user:', errorMessage);
    throw new Error(errorMessage || 'Server error');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token } = response.data;

    setAuthToken(token);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error logging in:', errorMessage);
    throw new Error(errorMessage || 'Server error');
  }
};


// Log out a user (clears token)
export const logoutUser = () => {
  setAuthToken(null); // Remove token from storage and Axios headers
};

// Fetch current user details (example protected route)
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/auth/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error.response?.data?.message || error.message);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Initialize auth token on app load if token is in localStorage
const token = localStorage.getItem('token');
if (token) setAuthToken(token);

export default api;

export const updateProfile = async(userData) =>{
  try{
    const response = await api.put('/auth/updateProfile',userData);
    return response.data;
  }catch(error){
    console.error('Error updating Profile:',error.response?.data?.message || error.message);
    throw error.response?.data || {message: 'Server error'};
  }
}
