"use client";
import "../Home/Home.css";
import "./Books.css";
import Image from 'next/image';
import Link from 'next/link';
import RatingStars from '../Home/ratingStar';
import arrow from "../../public/Images/arfegrow.png";
import searchIcon from "@/public/Images/navSearch.png";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BooksPage({ props }) {
  const [Books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?per_page=1520&search=${query || Object.keys(props.searchParams)[0]}`
      );
      setBooks(response.data.data);
      setDisplayBooks(response.data.data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = () => {
    const filteredBooks = Books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayBooks(filteredBooks); 
  };

  return (
    <div>
      <div className="Breadcrumb">
        <Link href="/">الرئيسية</Link>
        <Image src={arrow} alt="ERR404" />
        <Link href="/BookLists">اقسام الكتب</Link>
        <Image src={arrow} alt="ERR404" />
        <p>{decodeURIComponent(props.params.Books)}</p>
        <Image src={arrow} alt="ERR404" />
        <p>{Object.keys(props.searchParams)[0]}</p>
      </div>

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
        ) : displayBooks.length > 0 ? (
          <div className="Maincards">
            {displayBooks.map((book) => (
              <Link href={`/${book.id}`} className="CardCont" key={book.id}>
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
                <RatingStars rating={3} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-data-message">لا توجد كتب في هذا القسم حاليا</div>
        )}
      </div>
    </div>
  );
}
