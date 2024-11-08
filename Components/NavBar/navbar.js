"use client";

import Link from "next/link";
import "./nav.css";
import Image from "next/image";
import Home from "../../public/Images/Home.png";
import Book from "../../public/Images/Books.png";
import Group from "../../public/Images/Group.png";
import List from "../../public/Images/align-left.png";
import Search from "../../public/Images/navSearch.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useEffect } from "react";
import { useRouter } from "next/navigation";




export default function CustomNavbar() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);


  const router = useRouter();

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className="MainNavContainer">
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
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

              <Nav.Link href="/BookLists">
                <Image src={List} alt="Home" />
                <p>القائمة</p>
              </Nav.Link>

              <Nav.Link href="#">
                <Image src={Search} alt="Home" />
                <p>بحث</p>
              </Nav.Link>
            </Nav>
            </div>




              <div className="SignBtn">
                <button 
                  className="CreateBtn"
                  onClick={() => router.push("/register")}
                >
                  انشاء حساب
                </button>

                <button 
                  className="loginBtn"
                  onClick={() => router.push("/login")}
                >
                  تسجيل الدخول
                </button>
              </div>






            </div>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
