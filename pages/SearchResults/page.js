"use client";

import "./style.css";
import "../Home/Home.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import RatingStars from "../Home/ratingStar";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import axios from "axios";
import { api } from "@/context/ApiText/APITEXT";

export default function SearchResultpage({ props }) {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(
    props.params?.SearchResults ? decodeURIComponent(props.params.SearchResults) : ""
  );
  const [showSearchInput, setShowSearchInput] = useState(false);

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(
        `${api}/api/books?search=${query}`
      );
      setBooks(response.data.data || []);
    } catch (error) {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBooks(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLoading(true);
      fetchBooks(searchQuery);
      setShowSearchInput(false);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="searchHeader">
        {!showSearchInput ? (
          <div className="searchHeaderContent">
            <h1 className="title">
              نتائج البحث عن: <span>{searchQuery}</span>
            </h1>
            <button
              className="actionButton toggleButton"
              onClick={() => setShowSearchInput(true)}
            >
              بحث جديد
            </button>
          </div>
        ) : (
          <div className="searchAgainContainer">
            <input
              type="text"
              placeholder="أدخل قيمة جديدة للبحث"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="inputArea"
            />
            <button className="actionButton" onClick={handleSearch}>
              ابحث
            </button>
            <button
              className="actionButton toggleButton"
              onClick={() => setShowSearchInput(false)}
            >
              إلغاء
            </button>
          </div>
        )}
      </div>

      <div className="bookPageContainer">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : Books.length > 0 ? (
          <div className="Maincards">
            {Books.map((book) => (
              <div
                className="cardmaincont"
              >
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
                <RatingStars rating={3} />
              </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-message">لا توجد كتب تطابق البحث</div>
        )}
      </div>
    </div>
  );
}