"use client";
import "./style.css";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import arrow from "../../public/Images/arfegrow.png";
import arrow2 from "../../public/Images/vectogfr-2.png";
import axios from "axios";
import add from "../../public/Images/unnbfbfamed.png";
import AddMainCat from "./addMainCat";
import { motion } from "framer-motion";
import { api } from "@/context/ApiText/APITEXT";



export default function MainPage() {
  const [openSection, setOpenSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [Cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(
          `${api}/api/category-groups/`
        );
        setCat(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCat();
  }, []);

  const filteredCategories = Cat.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.categories.some(subCategory =>
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) 
  );




  const [isPopupVisible1, setIsPopupVisible1] = useState(false);

  const togglePopup1 = () => {
    setIsPopupVisible1(!isPopupVisible1);
  };


  const [isPopupVisible2, setIsPopupVisible2] = useState(false);

  const togglePopup2 = () => {
    setIsPopupVisible2(!isPopupVisible2);
  };



  return (
    <div>
      <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link>
        <Image src={arrow} alt="ERR404" />
        <Link href="">اقسام الكتب</Link>
      </div>

<br></br>
<br></br>
          {/* <div className="adding">
          <div  
              onClick={togglePopup1}
              className="addauthorbtn" 
              >
                  <p>اضافه قسم اساسى</p> 
                  <Image src={add} alt="ERR404" />
            </div>
            <div 
              onClick={togglePopup2}
              className="addauthorbtn2" 
              >
                  <p>اضافه قسم فرعى</p>
                  <Image src={add} alt="ERR404" />
            </div>
          </div> */}


      <div className="main-container">
        <input
          type="text"
          placeholder="البحث عن قسم"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div>
            {filteredCategories.length === 0 ? (
              <p className="no-data-message">لا يوجد نتائج</p>
            ) : (
              filteredCategories.map((category) => (
                <div className="dropdown-section" key={category.id}>
                  <div className="dropdown-header" onClick={() => toggleSection(category.name)}>
                    <span>{category.name}</span>
                    <Image
                      src={arrow2}
                      alt="ERR404"
                      className={`arrow-icon ${openSection === category.name ? 'rotate' : ''}`}
                    />
                  </div>
                  {openSection === category.name && (
                     
                    <div className="dropdown-content">
                      
                      {category.categories.map((subCategory) => (
                       
                        <Link
                          href={`/BookLists/${category.name} ?${subCategory.name}`}
                          className="dropdown-item"
                          key={subCategory.id}
                        >
                           <motion.div
                      whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.75 }}
                        transition={{ duration: 0.2 }}
                      >
                          {subCategory.name}
                          
                    </motion.div>
                        </Link>
                     
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>


      {isPopupVisible1 && (
      <AddMainCat/>
      )}
         {isPopupVisible2 && (
      <AddSubCat/>
      )}

    </div>
  );
}
