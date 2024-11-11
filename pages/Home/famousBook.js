"use client"
import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import CardImg from "../../public/Images/cardimage.png";
import Editor from "../../public/Images/frame-2888.png";
import defaultBook from "../../public/Images/defaultBook.jpg";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import Link from "next/link";
import RatingStars from "./ratingStar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FamousBook() {


  
  const [Books, setBoooks] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api`); 
        setBoooks(response.data.popularBooks);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

const popularBooks = Books.slice(0, 4);





  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>أشهر الكتب</p>
        </div>

        <Link href="/FamousBook" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link>
      </div>




      <div className="Maincards">

     
        {popularBooks.map((book) => (
        <Link href={`${book.id}`} className="CardCont" key={book.id}>
          <Image className="CardImg44"
           src={book.cover_image || defaultBook}
            alt="ERR404" />
         <div className="lastCardSec">
            <Image src={defaultPortifolio} className="AuthorImg" alt="ERR404" />
            <h6>{book.title}</h6>
            <p>{book.author.name}</p>
          </div>
          
          <RatingStars rating={3} />
        </Link>
      ))}

      </div>





    </div>
  );
}
