"use client";
import "../Home/Home.css";
import "./filtered.css";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import RatingStars from '../Home/ratingStar';
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import axios from "axios";
import { api } from "@/context/ApiText/APITEXT";
export default function FilteredPage() {
  const [allBooks, setAllBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/api/books`);
        setAllBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    let books = [...allBooks];
    if (activeCategory === "popular") {
      books.sort((a, b) => a.id - b.id);
    } else if (activeCategory === "latest") {
      books.sort((a, b) => b.id - a.id);
    } else if (activeCategory === "topRated") {
      books.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    }
    if (searchTerm) {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (book.author && book.author.name && book.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setDisplayBooks(books);
  }, [searchTerm, activeCategory, allBooks]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const changeCategory = (cat) => {
    setActiveCategory(cat);
    setSearchTerm("");
  };
  return (
    <div>
      <div className="bookPageContainer">
        <div className="filter-tabs" style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
          <button onClick={() => changeCategory("popular")} style={{ background: activeCategory === "popular" ? "var(--Main-BackGround)" : "#f5f5f5", color: activeCategory === "popular" ? "#fff" : "#000", border: "none", padding: "10px 20px", borderRadius: "20px", cursor: "pointer" }}>
            أشهر الكتب
          </button>
          <button onClick={() => changeCategory("latest")} style={{ background: activeCategory === "latest" ? "var(--Main-BackGround)" : "#f5f5f5", color: activeCategory === "latest" ? "#fff" : "#000", border: "none", padding: "10px 20px", borderRadius: "20px", cursor: "pointer" }}>
            أحدث الكتب
          </button>
          <button onClick={() => changeCategory("topRated")} style={{ background: activeCategory === "topRated" ? "var(--Main-BackGround)" : "#f5f5f5", color: activeCategory === "topRated" ? "#fff" : "#000", border: "none", padding: "10px 20px", borderRadius: "20px", cursor: "pointer" }}>
            الأعلى تقييماً
          </button>
        </div>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input type="text" placeholder="ابحث عن كتاب" className="search-input" value={searchTerm} onChange={handleSearch} autoFocus />
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
                  <div className="cardmaincont" key={book.id}>
                    <Link href={`${book.id}`} className="CardCont">
                      {book.cover_image ? (
                        <img src={book.cover_image} alt="Book Cover" className="CardImg44" />
                      ) : (
                        <Image src={defaultBook} alt="Default Book Cover" className="CardImg44" />
                      )}
                      <div className="lastCardSec">
                        <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
                        <h6>{book.title}</h6>
                        <p>{book.author && book.author.name ? book.author.name : ""}</p>
                      </div>
                      <RatingStars rating={book.average_rating || 0} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-message">
                لا توجد كتب تطابق البحث
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
