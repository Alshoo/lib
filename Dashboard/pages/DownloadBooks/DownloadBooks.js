"use client";
import "./style.css";

import Image from "next/image";
import bookIcon from "../../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../../public/Images/vector44.png";
import defaultBook from "../../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../../public/Images/defaultPortifolio.jpeg";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../../../pages/Home/Home.css";
import { api } from "@/context/ApiText/APITEXT";

export default function DownloadBooks() {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const auth_token = Cookies.get("auth_token");
        const response = await axios.get(
          `${api}/api`,{
          headers: {
            "Authorization": `Bearer ${auth_token}`,
          }
        }
        );
        setBooks(response.data.popularBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const popularBooks = Books.slice(0, 4);

  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>الكتب التى تم تنزيلها</p>
        </div>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : popularBooks == "" ? (
        <div className="notFundTxt">لا توجد كتب حاليا هنا</div>
      ) : (
        <div className="Maincards">
          {popularBooks.map((book) => (
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={book.id}
            >
              <Link href={`/${book.id}`} className="CardCont">
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
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
