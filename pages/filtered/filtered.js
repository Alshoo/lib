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
  const [popularBooks, setPopularBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/api`);
        setPopularBooks(response.data.popularBooks);
        setLatestBooks(response.data.latestBooks);
        setTopRatedBooks(response.data.topRatedBooks);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let books = [];
    if (activeCategory === "popular") books = popularBooks;
    else if (activeCategory === "latest") books = latestBooks;
    else if (activeCategory === "topRated") books = topRatedBooks;
    if (searchTerm) {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setDisplayBooks(books);
  }, [searchTerm, activeCategory, popularBooks, latestBooks, topRatedBooks]);

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
        <div
          className="filter-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => changeCategory("popular")}
            style={{
              background: activeCategory === "popular" ? "var(--Main-BackGround)" : "#f5f5f5",
              color: activeCategory === "popular" ? "#fff" : "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            أشهر الكتب
          </button>
          <button
            onClick={() => changeCategory("latest")}
            style={{
              background: activeCategory === "latest" ? "var(--Main-BackGround)" : "#f5f5f5",
              color: activeCategory === "latest" ? "#fff" : "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            أحدث الكتب
          </button>
          <button
            onClick={() => changeCategory("topRated")}
            style={{
              background: activeCategory === "topRated" ? "var(--Main-BackGround)" : "#f5f5f5",
              color: activeCategory === "topRated" ? "#fff" : "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            الأعلى تقيماً
          </button>
        </div>
{/* 
        <div className="titcatContainer">
          <h5 className="titCat">
            {activeCategory === "popular"
              ? "أشهر الكتب"
              : activeCategory === "latest"
              ? "أحدث الكتب"
              : "الأعلى تقيماً"}
          </h5>
        </div> */}


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
                <div className="cardmaincont">
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
                      <Image
                        src={defaultPortifolio}
                        className="AuthorImg"
                        alt="ERR404"
                      />
                      <h6>{book.title}</h6>
                      <p>{book.author.name}</p>
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
