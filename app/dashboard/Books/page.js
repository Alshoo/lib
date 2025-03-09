"use client";
import Book from "@/Dashboard/pages/Books/book";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuthContext from "@/hooks/useAuthContext";
import Cookies from "js-cookie";

export default function DashBooksPage() {
  const [loading, setLoading] = useState(true);

  // const { user } = useAuthContext();

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
  useEffect(() => {
    const userData = Cookies.get("user");
    const data = JSON.parse(userData);
    setUserDetails(data.user);
    setUserRole(data.user.role.name);
    setLoading(false); 
  }, []);

  useEffect(() => {
    if (userRole && userRole !== "SuperAdmin") {
      toast.error("ليس لديك صلاحية للوصول لهذه الصفحة.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [userRole, user]);
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Book/>
    </div>
  )
}
