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

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import useAuthContext from "@/hooks/useAuthContext";
import Dropdown from 'react-bootstrap/Dropdown';


 

export default function CustomNavbar() {


  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     require("bootstrap/dist/js/bootstrap.bundle.min.js");
  //   }
  // }, []);










  
  const { logout,user } = useAuthContext();


  console.log(user);
  console.log(user);
  console.log(user);
  console.log(user);



  return (
    <div className="MainNav1">
    <div className="MainNav2">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className="MainNavContainer">
          <Navbar.Brand href="/">Logo</Navbar.Brand>
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
                <Image src={Book} alt="Home" />
                <p>أقسام الكتب</p>
              </Nav.Link>

              <Nav.Link href="/Authors">
                <Image src={Group} alt="Home" />
                <p>مؤلفو الكتب</p>
              </Nav.Link>

              <Nav.Link href="/req">
                <Image src={List} alt="Home" />
                <p>الطلبات</p>
              </Nav.Link>

              <Nav.Link>

 
            



                <Dropdown>
                <Dropdown.Toggle id="dropdown-basic2">
                <Image src={Search} alt="Home" />
                <p  >بحث</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>

              <Dropdown.Item > 
              <Link href="/Authors" className="searchDrop">بحث عن مؤلف</Link>
              </Dropdown.Item>

                     <Dropdown.Item > 
              <Link href="/BookLists" className="searchDrop">بحث عن قسم </Link>
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
      <Dropdown.Toggle variant="none"  className="MAinDropdownContainer">
        <p>{user.name}</p>
        <Image src={defaultPortifolio} className="UserAvatar" alt="ERR404"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="#/action-1">تعديل الملف الشخصي</Dropdown.Item> */}
        <Dropdown.Item onClick={logout}>تسجيل الخروج</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>



    </div>

      ) : (
        <>
          <Link href="/register" className="CreateBtn" >
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
        </Container>
      </Navbar>
    </div>
    </div>
  );
}
