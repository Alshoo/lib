"use client"
import "../Home/Home.css"
import "./famous.css"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import RatingStars from '../Home/ratingStar'
import CardImg from "../../public/Images/cardimage.png";
import Editor from "../../public/Images/frame-2888.png";
import arrow from "../../public/Images/arfegrow.png";
import searchIcon from "@/public/Images/navSearch.png";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import axios from "axios";

export default function FamousPage() {
  const [Books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api`);
        setBooks(response.data.popularBooks);
        setDisplayBooks(response.data.popularBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      setDisplayBooks(Books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setDisplayBooks(Books); 
    }
  };

  return (
    <div>
      <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link>
        <Image src={arrow} alt='ERR404'/>
        <Link href="">اشهر الكتب</Link>
      </div>
<br></br>
<br></br>
      <div className="bookPageContainer">
        <div className="searchContainer2">
          <div className="iconWrapper2">
            <Image src={searchIcon} alt="ERR404" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن كتاب"
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
            {displayBooks.length > 0 ? (
              <div className="Maincards">
                {displayBooks.map((book) => (
                  <Link href={`${book.id}`} className="CardCont" key={book.id}>
                    {book.cover_image ? (
                      <img 
                        src={book.cover_image}  
                        alt="Book Cover" 
                        className="CardImg44"
                      />
                    ) : (
                      <Image 
                        src={defaultBook} 
                        alt="Default Book Cover" 
                        className="CardImg44"
                      />
                    )}
                    <div className="lastCardSec">
                      <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
                      <h6>{book.title}</h6>
                      <p>{book.author.name}</p>
                    </div>
                    <RatingStars rating={3} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-data-message">لا توجد كتب تطابق البحث</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
