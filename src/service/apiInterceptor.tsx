import axios from 'axios';

// Create an Axios instance
const apiInterceptor = axios.create({
  baseURL: 'http://192.168.116.134:9095/ssapi/api' // Your API base URL
});

// Request Interceptor (Optional)
apiInterceptor.interceptors.request.use(
  config => {
    if(!config.url?.includes("signin")){
      const token = JSON.parse(localStorage.userInfo).jwt; // Example: Get token from localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    // Handle request error (e.g., network issues)
    return Promise.reject(error);
  }
);

// Response Interceptor for error handling
apiInterceptor.interceptors.response.use(
  response => response, // If the request is successful, just return the response
  error => {
    // Handle different types of errors globally
    if (error.response) {
      // The request was made and the server responded with an error status code
      console.error(`Error Status: ${error.response.status}`);
      console.error('Error Response:', error.response.data);
      if (error.response.status === 401) {
        // Example: Handle Unauthorized (401) by redirecting to login
        //alert('Unauthorized access. Please log in again.');
        // You can also handle logging out the user here
      } else if (error.response.status === 500) {
        // Example: Internal Server Error
        console.log('Server error. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      //console.error('No response received:', error.request);
      alert('Network error. Please check your connection.');
    } else {
      // Something else went wrong
      //console.error('Error Message:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
    // Optionally, you can return a rejected promise to propagate the error
    return Promise.reject(error);
  }
);

export default apiInterceptor;
