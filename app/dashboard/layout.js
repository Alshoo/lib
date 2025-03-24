"use client";
import Sidebar from "@/Dashboard/slidebar/SideBar";
import "./dash.css"
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "@/hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { api } from "@/context/ApiText/APITEXT";

const backendUrl = api;


 

export default function DashboardLayout({ children }) {


  const [user, setUser] = useState(null);
    const updateUser = () => {
      const userData = Cookies.get("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    useEffect(() => {
      updateUser();
    }, []);
    

  const [userDetails, setUserDetails] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);




 
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.user?.name) {
        try {
          const response = await axios.get(
            `${backendUrl}/api/users?search=${encodeURIComponent(user.name)}`
          );
          const userData = response.data.data;
          setUserDetails(userData);
          setUserRole(userData[0]?.role[0]?.name || "");
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [user?.user?.name]);



  

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
      <div className="MainDashContainer">

<Toaster position="top-center" toastOptions={{ duration: 4000 }} />

        <Sidebar />
        
        {children}   

      </div>
  );
}
