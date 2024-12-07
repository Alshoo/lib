"use client";
import { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import useAuthContext from '@/hooks/useAuthContext';
import Books from './books';
import Authors from './authors';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RequestsPage() {


  const { user } = useAuthContext();
  
 
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
