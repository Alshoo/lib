"use client";
import { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import useAuthContext from '@/hooks/useAuthContext';
import Books from './books';
import Authors from './authors';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function RequestsPage() {


  // const { user } = useAuthContext();
  const [user, setUser] = useState(null);
    const updateUser = () => {
      const userData = Cookies.get("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    useEffect(() => {
      updateUser();
    }, []);
    
 
  useEffect(() => {
    if (user === null || user === undefined ) {

      const timer = setTimeout(() => {
        window.location.href = "/login"; 
      }, 2000); 

      return () => clearTimeout(timer);
    }


  });



  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

     <Books/>


      <Authors/>




    </div>
  );
}
