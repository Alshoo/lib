"use client"

import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import CardImg from "../../public/Images/cardimage.png";
import Editor from "../../public/Images/frame-2888.png";
import Link from "next/link";
import RatingStars from "./ratingStar";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";



export default function LatestBook() {

  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api`);
        setBooks(response.data.popularBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);



const latestBooks = Books.slice(0, 4);



  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>احدث الكتب</p>
        </div>

        <Link href="/RecentBook" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link>
      </div>




 

      {loading ? (
           <div className="spinner-container">
           <div className="spinner"></div> 
         </div>
      ) : (
       
        <div className="Maincards">

      {latestBooks.map((book) => (
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
            <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
            <h6>{book.title}</h6>
            <p>{book.author.name}</p>
          </div>
          
          <RatingStars rating={3} />
        </Link>
      ))}

       


      </div>
      )}



    </div>
  );
}
