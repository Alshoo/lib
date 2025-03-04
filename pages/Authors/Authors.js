"use client"
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Home/Home.css"
import "./Authors.css"
import Image from 'next/image'
import Link from 'next/link'
import CardImg from "../../public/Images/frame-3036.png";
import bookicon from "../../public/Images/rret4.png";
import arrow from "../../public/Images/arfegrow.png";
import searchIcon from "@/public/Images/navSearch.png";
import { motion } from "framer-motion";
import { api } from "@/context/ApiText/APITEXT";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [displayAuthors, setDisplayAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${api}/api/authors?per_page=1520`);
        setAuthors(response.data);
        setDisplayAuthors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const filteredAuthors = authors.filter(author => 
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayAuthors(filteredAuthors);
  }, [searchTerm, authors]);

  return (
    <div> 
      {/* <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link> 
        <Image src={arrow} alt='ERR404'/>
        <Link href="">المؤلفين</Link>
      </div> */}

      <br></br>
      <br></br>

      <div className="bookPageContainer">
        {/* <div className="searchContainer2">
          <div className="iconWrapper2">
            <Image src={searchIcon} alt="ERR404" />
          </div>

          <input
            type="text"
            placeholder="ابحث عن مؤلف"
            className="inputArea2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />


          
          <button className="actionButton2">بحث</button>
        </div> */}

        <h5 className="titCat11">مؤلفو الكتب  </h5>
        <div className="search-container11">
          <i className="fas fa-search search-icon11"></i>
          <input 
            type="text"
            placeholder="ابحث عن مؤلف"
            className="search-input11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            autoFocus
          />
        </div>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div>
            {displayAuthors.length > 0 ? (
              <div className="Maincards">
                {displayAuthors.map((author) => (
               <motion.div
               whileHover={{ scale: 1.001 }}
               whileTap={{ scale: 0.95 }}
               transition={{ duration: 0.2 }}
               key={author.id}
             >
               <Link href={`Authors/${author.id}`} className="CardContAuthor">
                 {author.profile_image ? (
                   <img
                     src={author.profile_image}
                     alt="ERR404"
                     className="CardImg44Author"
                   />
                 ) : (
                   <Image
                     src={defaultPortifolio}
                     alt="ERR404"
                     className="CardImg44Author"
                   />
                 )}
                 <div className="lastCardSecAuthor">
                   <h6>{author.name}</h6>
                   <div className="bookNum">
                     <p>عدد الكتب: {author.books_count || "0"}</p>
                   </div>
                 </div>
               </Link>
             </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-data-message">لا يوجد مؤلفين تطابق البحث</div>
            )}
          </div>
        )}
      </div>

      <br></br>
    </div>
  );
}
