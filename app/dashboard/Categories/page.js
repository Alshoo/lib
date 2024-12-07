

"use client"
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Category from "@/Dashboard/pages/Cat/Category";
import useAuthContext from '@/hooks/useAuthContext';
import Cookies from 'js-cookie';


export default function DashCatPage() {

  const [loading, setLoading] = useState(true);
 
  // const { user } = useAuthContext();
  const userData = Cookies.get("user");
  const user = JSON.parse(userData);
  const [userDetails, setUserDetails] = useState([]);
  const [userRole, setUserRole] = useState("");





  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.name) {
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
  }, [user?.name]);


  useEffect(() => {
    if (userRole && userRole !== "SuperAdmin") {
      toast.error("ليس لديك صلاحية للوصول لهذه الصفحة.");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
    }

  
  }, [userRole,user]);
  console.log(userRole);
  
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

    return (
      <div>
        <Category/>
      </div>
    )
  }
  