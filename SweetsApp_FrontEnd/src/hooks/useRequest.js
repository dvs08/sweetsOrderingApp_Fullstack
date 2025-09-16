import axios from "axios";
import {useState} from 'react';

const useRequest = () => {  
  
  const [isLoading, setIsLoading] = useState(false);
  
  //custom hook
  const axiosInstance = axios.create({               //instance with base URL that can be used everywhere by accessing request().
    baseURL: 'http://10.10.5.36:5002', 
  });

  axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Create a function that accepts payload, methodType, and endpoint
  const request = async ({methodType, endpoint, payload}) => {
    console.log({methodType});

    setIsLoading(true);
    try {
      const response = await axiosInstance({
        method: methodType,           //get post delete
        url: endpoint,              // eg) /mithai
        data: payload,
      });
      setIsLoading(false);
      return response; // Return the response data
    } catch (error) {
      // Handle errors appropriately
      console.error('Error in API request:', error);
      setIsLoading(false);
      throw error; // Re-throw the error for further handling if needed
    }
  };

  return { request , isLoading };
};

export default useRequest;
