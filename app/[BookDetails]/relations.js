"use client"
import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import "./bookDet.css"
import Image from "next/image";
import productImage from "../../public/Images/rwrwqr3.png";
import defaultBook from "../../public/Images/defaultBook.jpg";
import { useEffect, useState } from "react";
import "../../pages/Famous/famous.css" 
import "../../pages/Home/Home.css"
import Link from 'next/link'
import RatingStars from '../../pages/Home/ratingStar'
import CardImg from "@/public/Images/cardimage.png";
import Editor from "@/public/Images/frame-2888.png";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import download from "../../public/Images/arrow-backup-down-download-save-storage-transfer-1225091.png";
import view from "../../public/Images/unnاamed.png";
import ratings from "../../public/Images/unnamed.png";
import axios from "axios";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import Carousel from 'react-bootstrap/Carousel';

export default function Relations() {
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
  )
}
