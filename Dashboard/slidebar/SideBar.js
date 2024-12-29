"use client";
import Link from "next/link";
import "../style.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Sidebar() { 
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userDes, setUserDes] = useState("");
  const pathname = usePathname();

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
          setUserRole(userData[0]?.role[0]?.name || "");
          setUserDes(userData[0]?.role[0]?.description || "");
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
    <div lang="en" dir="ltr" style={{height:"100vh"}}>
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header">
        <a id="nav-title" href="/dashboard" rel="noopener noreferrer">
          Logo
        </a>
        {/* <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label> */}
        <hr />
      </div>
        <div id="nav-content">
          <Link href="/dashboard/Books" className={`nav-button ${pathname === "/dashboard/Books" ? "active" : ""}`}>
            <i className="fas fa-solid fa-book"></i>
            <span>الكتب</span>
          </Link>
          <Link href="/dashboard/Authors" className={`nav-button ${pathname === "/dashboard/Authors" ? "active" : ""}`}>
            <i className="fas fa-solid fa-book-open-reader"></i>
            <span>المؤلفون</span>
          </Link>
          <Link href="/dashboard/Categories" className={`nav-button ${pathname === "/dashboard/Categories" ? "active" : ""}`}>
            <i className="fas fa-list"></i>
            <span>الاقسام</span>
          </Link>
          <Link href="/dashboard/Notification" className={`nav-button ${pathname === "/dashboard/Notification" ? "active" : ""}`}>
            <i className="fas fa-regular fa-bell"></i>
            <span>ارسال اشعارات</span>
          </Link>
          <Link href="/dashboard/Users" className={`nav-button ${pathname === "/dashboard/Users" ? "active" : ""}`}>
            <i className="fas fa-user"></i>
            <span>المستخدمون</span>
          </Link>
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar">
              <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
            </div>
            <div id="nav-footer-titlebox">
              <a id="nav-footer-title" href="#">
                {user ? user.name : "مستخدم مجهول"}
              </a>
              <span id="nav-footer-subtitle">{userRole}</span>
            </div>
            <label htmlFor="nav-footer-toggle">
              <i className="fas fa-caret-up"></i>
            </label>
          </div>
          <div id="nav-footer-content">{userDes}</div>
        </div>
      </div>
    </div>
  );
}
