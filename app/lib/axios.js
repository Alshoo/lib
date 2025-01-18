
import { api } from '@/context/ApiText/APITEXT';
import axios from 'axios';

const instance = axios.create({
    baseURL: api,
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
