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

export default function SearchResultpage({ props }) {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const searchQuery = decodeURIComponent(props.params.SearchResults);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?search=${searchQuery}`
        );
        setBooks(response.data.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [props.params.SearchResults]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="title">
        نتائج البحث عن
        <p>{decodeURIComponent(props.params.SearchResults)}</p>
      </h1>

      <div className="bookPageContainer">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div>
            {Books.length > 0 ? (
              <div className="Maincards">
                {Books.map((book) => (
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
