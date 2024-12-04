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

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [displayAuthors, setDisplayAuthors] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authors?per_page=1520`); 
        setAuthors(response.data.data);
        setDisplayAuthors(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false); 
      }
    };

    fetchAuthors();
  }, []);


  const handleSearch = () => {
    const filteredAuthors = authors.filter(author => 
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setDisplayAuthors(filteredAuthors); 
  };





  const [isPopupVisible1, setIsPopupVisible1] = useState(false);

  const togglePopup1 = () => {
    setIsPopupVisible1(!isPopupVisible1);
  };



  return (
    <div> 
      <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link>
        <Image src={arrow} alt='ERR404'/>
        <Link href="">المؤلفين</Link>

        
      </div>




      <div className="bookPageContainer">
        <div className="searchContainer2">
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

          <button className="actionButton2" onClick={handleSearch}>بحث</button> 
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
          <Link href={`Authors/${author.id}`} className="CardCont" key={author.id}>
            {author.profile_image ? (
              <img 
                src={author.profile_image} 
                alt="ERR404" 
                className="CardImg44"
              />
            ) : (
              <Image 
                src={defaultPortifolio} 
                alt="ERR404" 
                className="CardImg44"
              />
            )}
            <div className="lastCardSecAuthor">
              <h6>{author.name}</h6>
              <div className="bookNum">
                <Image src={bookicon} alt="ERR404" />
                <p>عدد الكتب: {author.book_count || "غير معروف"}</p> 
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="no-data-message">لا يوجد مؤلفين تطابق البحث</div>
    )}
  </div>
)}


        
      </div>

 



    </div>
  );
}
