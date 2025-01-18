"use client"
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import Link from "next/link";
import RatingStars from "./ratingStar";
import { motion } from "framer-motion";
import { api } from "@/context/ApiText/APITEXT";

export default function HighBook() {
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

  const topRatedBooks = Books.slice(0, 4);

  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>الأعلى تقييما</p>
        </div>

        <Link href="/HighBook" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        topRatedBooks == "" ? (
          <div className="notFundTxt">
          لا توجد كتب حاليا هنا
        </div>
        ):(
        <div className="Maincards">
          {topRatedBooks.map((book) => (
            <motion.div
            whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={book.id}
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
                  <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
                  <h6>{book.title}</h6>
                  <p>{book.author?.name || "غير معرف"}</p>
                </div>

                <RatingStars rating={Books.average_rating||0} />
              </Link>
            </motion.div>
          ))}
        </div>
        )
      )}
    </div>
  );
}
