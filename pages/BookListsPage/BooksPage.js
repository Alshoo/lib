"use client";
import "../Home/Home.css";
import "./Books.css";
import './style.css'
import Image from 'next/image';
import Link from 'next/link';
import RatingStars from '../Home/ratingStar';
import arrow from "../../public/Images/arfegrow.png";
import searchIcon from "@/public/Images/navSearch.png";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { api } from "@/context/ApiText/APITEXT";

export default function BooksPage({ props }) {
  const [Books, setBooks] = useState([]);
  const [Rate, setٌRate] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async (query = "") => {
    setLoading(true);
    try {
      const searchQuery = query || (props?.searchParams ? Object.keys(props.searchParams)[0] : "");
      const response = await axios.get(
        `${api}/api/books?per_page=1520&search=${searchQuery}`
      );
      setBooks(response.data.data);
      setٌRate(response.data.average_rating);
      setDisplayBooks(response.data.data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };
console.log(Rate);

  useEffect(() => {
    fetchBooks();
  }, [props]);

  useEffect(() => {
    if (searchTerm === "") {
      setDisplayBooks(Books);
    } else {
      const filteredBooks = Books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayBooks(filteredBooks);
    }
  }, [searchTerm, Books]);

  return (
    <div>
      {/* <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link>
        <Image src={arrow} alt="ERR404" />
        <Link href="/BookLists">اقسام الكتب</Link>
        <Image src={arrow} alt="ERR404" />
        <p>{props?.params?.Books ? decodeURIComponent(props.params.Books) : "القسم غير موجود"}</p>
        <Image src={arrow} alt="ERR404" />
        <p>{props?.searchParams ? Object.keys(props.searchParams)[0] : "القسم غير موجود"}</p>
      </div> */}
      
      <br></br>
      <br></br>
      <div className="bookPageContainer">

      <h5 className="titCat">{props?.searchParams ? Object.keys(props.searchParams)[0] : "none"} :</h5>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text"
            placeholder="البحث عن كتاب"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>




        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : displayBooks.length > 0 ? (
          <div className="Maincards">
            {displayBooks.map((book) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.75 }}
                transition={{ duration: 0.2 }}
                key={book.id}
              >
                <Link href={`/${book.id}`} className="CardCont">
                  {book.cover_image ? (
                    <img src={book.cover_image} alt="Book Cover" className="CardImg44" />
                  ) : (
                    <Image src={defaultBook} alt="Default Book Cover" className="CardImg44" />
                  )}
                  <div className="lastCardSec">
                    <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
                    <h6>{book.title}</h6>
                    <p>{book.author.name}</p>
                  </div>
                  <RatingStars rating={book.average_rating || 0} />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-data-message">لا توجد كتب في هذا القسم حاليا</div>
        )}
      </div>
    </div>
  );
}
