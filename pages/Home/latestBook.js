"use client"

import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import Link from "next/link";
import RatingStars from "./ratingStar";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { api } from "@/context/ApiText/APITEXT";

export default function LatestBook() {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/api`);
        setBooks(response.data.latestBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const latestBooks = Books.slice(0, 6);

  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>أحدث الكتب</p>
        </div>

        <Link href="/filteredBooks" className="betweenItems2">
          <p>المزيد</p>
          <i className="fa-solid fa-arrow-left iifram"></i>
        </Link>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        latestBooks == "" ? (
          <div className="notFundTxt">
          لا توجد كتب حاليا هنا
        </div>
        ):(
        <div className="Maincards">
          {latestBooks.map((book) => (
            <motion.div
            whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={book.id}
                className="cardmaincont"
            >
              <Link href={`${book.id}`} className="CardCont">
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
                  <img src={book.author? book.author.profile_image : defaultPortifolio} className="AuthorImg" alt="ERR404" />
                  <h6>{book.title}</h6>
                  <p>{book.author?.name || "غير معرف"}</p>
                </div>

                <RatingStars rating={book.average_rating||0} />
              </Link>
            </motion.div>
          ))}
        </div>
        )
      )}
    </div>
  );
}
