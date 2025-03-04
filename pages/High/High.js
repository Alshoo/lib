"use client"
import "../Home/Home.css"
import "./High.css"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import RatingStars from '../Home/ratingStar'
import arrow from "../../public/Images/arfegrow.png"
import searchIcon from "../../public/Images/navSearch.png"
import axios from "axios"
import defaultBook from "../../public/Images/defaultBook.jpg"
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg"
import { api } from "@/context/ApiText/APITEXT"

export default function FamousPage() {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [displayBooks, setDisplayBooks] = useState([]); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/api`);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setDisplayBooks(Books.filter(book =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.author.name.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    } else {
      setDisplayBooks(Books); 
    }
  };

  return (
    <div>
      {/* <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link>
        <Image src={arrow} alt='ERR404' />
        <Link href="">الأعلى تقييما</Link>
      </div> */}
      <div className="bookPageContainer">

      <div className="titcatContainer">
          <h5 className="titCat">الأعلى تقييما </h5>
          </div>


      <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text"
            placeholder="ابحث عن كتاب"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
            autoFocus
          />
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
                    <img className="CardImg44"
                      src={book.cover_image || defaultBook}
                      alt="ERR404" />
                    <div className="lastCardSec">
                      <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
                      <h6>{book.title}</h6>
                      <p>{book.author.name}</p>
                    </div>
                    <RatingStars rating={book.average_rating || 0} />
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
