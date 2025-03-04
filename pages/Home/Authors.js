"use client";
import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import bookicon from "../../public/Images/rret4.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { api } from "@/context/ApiText/APITEXT";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${api}/api/authors`);
        setAuthors(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>المؤلفين</p>
        </div>

        <Link href="/Authors" className="betweenItems2">
          <p>المزيد</p>
          <i className="fa-solid fa-arrow-left iifram"></i>
        </Link>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : authors == "" ? (
        <div className="notFundTxt">لا توجد مؤلفين حاليا هنا</div>
      ) : (
        <div className="MaincardsAuthor">
          {authors.map((author) => (
            <motion.div
              whileHover={{ scale: 1.001 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={author.id}
            >
              <Link href={`Authors/${author.id}`} className="CardContAuthor">
                {author.profile_image ? (
                  <img
                    src={author.profile_image}
                    alt="ERR404"
                    className="CardImg44Author"
                  />
                ) : (
                  <Image
                    src={defaultPortifolio}
                    alt="ERR404"
                    className="CardImg44Author"
                  />
                )}
                <div className="lastCardSecAuthor">
                  <h6>{author.name}</h6>
                  <div className="bookNum">
                    <p>عدد الكتب: {author.books_count || "0"}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      <br />
    </div>
  );
}
