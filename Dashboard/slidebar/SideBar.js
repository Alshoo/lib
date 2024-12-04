"use client";
import Link from "next/link";
import "../style.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Sidebar() {

  return (
    <div lang="en" dir="ltr" style={{height:"100vh"}}>
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <a id="nav-title" href="/dashboard" rel="noopener noreferrer">
          Logo
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
    
        <Link href="/dashboard/Books" className="nav-button">
          <i className="fas fa-solid fa-book"></i>
          <span>الكتب</span>
        </Link>
        <Link href="/dashboard/Authors" className="nav-button">
          <i className="fas fa-solid fa-book-open-reader"></i>
          <span>المؤلفون</span>
        </Link>
        <Link href="/dashboard/Categories" className="nav-button">
          <i className="fas fa-list"></i>
          <span>الاقسام</span>
        </Link>
        <hr />
        <Link href="/dashboard/Users" className="nav-button">
          <i className="fas fa-user"></i>
          <span>المستخدمون</span>
        </Link>
        <hr />
      
      
        <div id="nav-content-highlight"></div>
      </div>
      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
          </div>
          <div id="nav-footer-titlebox">
            <a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank" rel="noopener noreferrer">
              uahnbu
            </a>
            <span id="nav-footer-subtitle">Admin</span>
          </div>
          <label htmlFor="nav-footer-toggle">
            <i className="fas fa-caret-up"></i>
          </label>
        </div>
        <div id="nav-footer-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>
    </div>
  );
}
