"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "@/hooks/useAuthContext";
import Book from "./Books/book";
import toast, { Toaster } from "react-hot-toast";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MainDash() {
  // const { user } = useAuthContext();
  // const [userDetails, setUserDetails] = useState([]);
  // const [userRole, setUserRole] = useState("");
  // const [loading, setLoading] = useState(true);




 
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (user?.name) {
  //       try {
  //         const response = await axios.get(
  //           `${backendUrl}/api/users?search=${encodeURIComponent(user.name)}`
  //         );
  //         const userData = response.data.data;
  //         setUserDetails(userData);
  //         setUserRole(userData[0]?.role[0]?.name || "");
  //       } catch (error) {
  //         console.error("Error fetching user details:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchUserDetails();
  // }, [user?.name]);


  // useEffect(() => {
  //   if (userRole && userRole !== "SuperAdmin") {
  //     toast.error("ليس لديك صلاحية للوصول لهذه الصفحة.");
  //         setTimeout(() => {
  //           window.location.href = "/";
  //         }, 1000);
  //   }

  
  // }, [userRole,user]);
  

  // if (loading) {
  //   return (
  //     <div className="spinner-container">
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* <Toaster position="top-center" toastOptions={{ duration: 4000 }} /> */}
      <Book />
    </div>
  );
}
