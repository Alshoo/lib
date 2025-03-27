"use client";
import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import "./bookDet.css";
import Image from "next/image";
import productImage from "../../public/Images/rwrwqr3.png";
import defaultBook from "../../public/Images/defaultBook.jpg";
import { useEffect, useState } from "react";
import "../../pages/filtered/filtered.css";
import "../../pages/Home/Home.css";
import Link from "next/link";
import RatingStars from "../../pages/Home/ratingStar";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import axios from "axios";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { api } from "@/context/ApiText/APITEXT";

export default function Relations() {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/api`);
        setBooks(response.data.popularBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const popularBooks = Books.slice(0, 6);

  return (
    <div>
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>ذات صله</p>
        </div>

        {/* <Link href="#" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link> */}
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="Maincards">
          {popularBooks.map((book) => (
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
                  <img
                    src={book.author? book.author.profile_image : defaultPortifolio}
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
      )}
    </div>
  );
}
