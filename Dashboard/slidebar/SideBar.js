"use client";
import Link from "next/link";
import "../style.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import Image from "next/image";
import { api } from "@/context/ApiText/APITEXT";

const backendUrl = api;

export default function Sidebar() { 
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userRoleLev, setUserRoleLev] = useState("");
  const [userDes, setUserDes] = useState("");
  const pathname = usePathname();

  const updateUser = () => {
    const userData = Cookies.get("user");
    setUser(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.user?.name) {
   
          const userData = Cookies.get("user");
          const JSONPARSEUSERDATA = JSON.parse(userData);
          setUserRole(JSONPARSEUSERDATA.user.role?.name || null);
          setUserImg(JSONPARSEUSERDATA.image_url);
          setUserDes(JSONPARSEUSERDATA.user.created_at);
          setUserRoleLev(JSONPARSEUSERDATA.user.role?.role_level || null);
      }
 
    };
    fetchUserDetails();
  }, [user?.user?.name]);

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
          {
            userRoleLev ==  null || userRoleLev ==  1 ?(
               <>
              <Link href="/dashboard/userDetails" className={`nav-button  ${pathname == "/dashboard" ? "active" : "" ||pathname == "/dashboard/userDetails" ? "active" : ""|| pathname == "/dashboard/DownloadBooks"   ? "" : "active"}`}>
              <i className="fas fa-solid fa-user"></i>
              <span>بياناتى</span>
            </Link>
            <Link href="/dashboard/DownloadBooks" className={`nav-button ${pathname === "/dashboard/DownloadBooks" ? "active" : ""}`}>
              <i className="fas fa-solid fa-book-open-reader"></i>
              <span>الكتب التى تم تنزيلها</span>
            </Link>
               </>
            ):(
              <>
              <Link href="/dashboard/Books" className={`nav-button  ${pathname == "/dashboard" ? "active" : "" ||pathname == "/dashboard/Books" ? "active" : ""|| pathname == "/dashboard/Authors" ||"/dashboard/Categories"||"/dashboard/Categories"||"/dashboard/Notification"||"/dashboard/Users"   ? "" : "active"}`}>
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
                <Link href="/dashboard/userDetails" className={`nav-button  ${pathname == "/dashboard/userDetails" ? "active" : "" }`}>
              <i className="fas fa-solid fa-user"></i>
              <span>بياناتى</span>
            </Link>
            {/* <Link href="/dashboard/Notification" className={`nav-button ${pathname === "/dashboard/Notification" ? "active" : ""}`}>
              <i className="fas fa-regular fa-bell"></i>
              <span>ارسال اشعارات</span>
            </Link> */}
            </>
            )
          }
          {
            userRoleLev == 5 ? (
              <>
              <Link href="/dashboard/Roles" className={`nav-button ${pathname === "/dashboard/Roles" ? "active" : ""}`}>
              <i class="fas fa-hand-sparkles"></i>
              <span>الأدوار</span>
            </Link>
              <Link href="/dashboard/Users" className={`nav-button ${pathname === "/dashboard/Users" ? "active" : ""}`}>
              <i className="fas fa-solid fa-users"></i>
              <span>المستخدمون</span>
            </Link>
            </>
            ):(
              null
            )
          }
         
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar">
              {
                userImg?(
                  <img src={ userImg } alt="eee"/>
                ):(
                  <Image src={ defaultPortifolio } alt="222"/>
                )
              }
            </div>
            <div id="nav-footer-titlebox">
              <a id="nav-footer-title" href="#">
                {user ? user.user.name : "مستخدم مجهول"}
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