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
      if (user?.name) {
        try {
          const response = await axios.get(
            `${backendUrl}/api/users?search=${encodeURIComponent(user.name)}`
          );
          const userData = response.data.data;
          setUserRoleLev(userData[0]?.role[0]?.role_level || "");
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user?.name]);

  useEffect(() => { 
    updateUser();
  }, []);  
  return (
    <div >
      {/* <Toaster position="top-center" toastOptions={{ duration: 4000 }} /> */}
      {userRoleLev == 1 ?(
        <UserDetails/>
      ):(
        <Book />
      )}
     
    </div>
  );
}
