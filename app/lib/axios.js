import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withXSRFToken: true,
    withCredentials: true,
  });
  


instance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {

    throw error;
  }
);

export default instance;
