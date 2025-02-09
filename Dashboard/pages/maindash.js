"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "@/hooks/useAuthContext";
import Book from "./Books/book";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import UserDetails from "./userDetails/userDetails";
import { api } from "@/context/ApiText/APITEXT";

const backendUrl = api; 

export default function MainDash() { 
  
  const [user, setUser] = useState(null);
  const [userRoleLev, setUserRoleLev] = useState("");

  const updateUser = () => {
    const userData = Cookies.get("user");
    setUser(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.user?.name) {
        const userData = Cookies.get("user");
        const JSONPARSEUSERDATA = JSON.parse(userData);
          setUserRoleLev(JSONPARSEUSERDATA.user.role?.role_level );
      }
      

    };

    fetchUserDetails();
  }, [user?.user?.name]); 

  useEffect(() => { 
    updateUser();
  }, []);  
  return (
    <div >
      {/* <Toaster position="top-center" toastOptions={{ duration: 4000 }} /> */}
      { userRoleLev ==  null || userRoleLev ==  1?(
        <UserDetails/>
      ):(
        <Book />
      )}
     
    </div>
  );
}
