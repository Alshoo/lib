
"use client"
import Image from "next/image";
import defaultBook from "../../public/Images/defaultBook.jpg";
import { useEffect, useState } from "react";
import "../../pages/Home/Home.css"
import Link from 'next/link'
import RatingStars from '../../pages/Home/ratingStar'
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import axios from "axios";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { api } from "@/context/ApiText/APITEXT";



export default function History({AuthorID,AuthorName,AuthorImage}) {


  

  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${api}/api/authors/${AuthorID}/books`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);

const HistoryBooks = Books;




return (
  <div>
    <br></br>
    <br></br>
    <br></br>

    
    {HistoryBooks.length > 0 ? (
      <div>
        <div className="CardSecHeadLine">
          <div className="betweenItems1">
            <Image src={bookIcon} alt="ERR404" />
            <p>السجل</p>
          </div>
        </div>

        {loading ? (
          <div className="spinner-container"> 
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="Maincards">
            {HistoryBooks.map((book) => (
              <div 
              className="cardmaincont"
              >
              <Link href={`/${book.id}`} className="CardCont" key={book.id}>
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
                  <img src={AuthorImage || defaultPortifolio} className="AuthorImg" alt="ERR404" />
                  <h6>{book.title}</h6>
                  <p>{AuthorName}</p>
                </div>
                <RatingStars rating={book.average_rating || 0 } />
              </Link>
              </div>

            ))}
          </div>
        )}
      </div>
    ) : null}
  </div>
);
}
