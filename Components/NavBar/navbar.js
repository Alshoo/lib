"use client";

import Link from "next/link";
import "./nav.css";
import Image from "next/image";
import Home from "../../public/Images/Home.png";
import Book from "../../public/Images/Books.png";
import Group from "../../public/Images/Group.png";
import List from "../../public/Images/align-left.png";
import Search from "../../public/Images/navSearch.png";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import logo from "../../public/Images/logo.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import useAuthContext from "@/hooks/useAuthContext";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import { api } from "@/context/ApiText/APITEXT";


export default function CustomNavbar() {
  const { logout } = useAuthContext();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${api}/api/notifications/user`,{
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      const unreadNotifications = response?.data?.data?.filter(
        (item) => item.read_at === null
      ) || [];
      setNotifications(unreadNotifications);
      setNotificationsCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const updateUser = () => {
    const userData = Cookies.get("user");
    setUser(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    updateUser();
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    setTimeout(() => {
      Cookies.remove("user");
      updateUser();
    }, 2000);
  };
  return (
   <div style={{marginBottom:"67px"}}>
     <div className="MainNav1">
      <div className="MainNav2">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <div className="MainNavContainer">
            <Navbar.Brand href="/"><Image src={logo} alt="ERR404"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <div className="NavBarItrms">
                <div>
                  <Nav>
                    <Nav.Link href="/">
                      <Image src={Home} alt="Home" />
                      <p>الرئيسية</p>
                    </Nav.Link>

                    <Nav.Link href="/BookLists">
                      <Image src={Book} alt="Books" />
                      <p>أقسام الكتب</p>
                    </Nav.Link>

                    <Nav.Link href="/Authors">
                      <Image src={Group} alt="Authors" />
                      <p>مؤلفو الكتب</p>
                    </Nav.Link>

                    {user && (
                      <Nav.Link href="/dashboard">
                        <Image src={List} alt="Dashboard" />
                        <p>لوحه التحكم</p>
                      </Nav.Link>
                    )}
                    {user && (
                        <Nav.Link href="/notification" className="notif">         
                        <span>{notificationsCount}</span>
                          <i className="fa-regular fa-bell"></i>
                          <p>الإشعارات</p>
                        </Nav.Link>
                    )}

               


                    <Nav.Link>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic2">
                          <Image src={Search} alt="Search" />
                          <p>بحث</p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{padding:"0"}}>
                          <Dropdown.Item>
                            <Link href="/Authors" className="searchDrop">
                              بحث عن مؤلف
                            </Link>
                          </Dropdown.Item>

                          <Dropdown.Item>
                            <Link href="/BookLists" className="searchDrop">
                              بحث عن قسم
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Link>

                  </Nav>
                </div>

                <div className="SignBtn">
                  {user ? (
                    <div className="user-menu">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="none"
                          className="MAinDropdownContainer"
                        >
                          <p>{user?.user?.name}</p>
                          { 
                            user.user.profile_image != "" ?
                            (
                              <img
                              src={user.user.profile_image} 
                              className="UserAvatar"
                              alt="ERR404"
                            />
                            ):(
                              <Image
                              src={ defaultPortifolio} 
                              className="UserAvatar"
                              alt="ERR404"
                            />
                            )
                          }
                         
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{padding:"0",marginTop:"5px"}}>
                          <Dropdown.Item onClick={() => { 
                            logout();
                            handleLogout();
                          }}>
                            تسجيل الخروج
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : (
                    <>
                      <Link href="/register" className="CreateBtn">
                        انشاء حساب
                      </Link>
                      <Link href="/login" className="loginBtn">
                        تسجيل الدخول
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </div>
   </div>
  );
}
