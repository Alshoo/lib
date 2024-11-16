"use client"
import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import bookicon from "../../public/Images/rret4.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Authors() {


  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authors`); 
        setAuthors(response.data.data.slice(0, 4));
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
          <Image src={LinkIcon} alt="ERR404" />
        </Link>
      </div>






      {loading ? (
           <div className="spinner-container">
           <div className="spinner"></div> 
         </div>
      ) : (
       
        <div className="Maincards">

        {authors.map((author) => (
        <Link href={`Authors/${author.id}`} className="CardCont" key={author.id}>
                {author.profile_image ? ( 
                <img 
                  src={author.profile_image} 
                  alt="ERR404" 
                  className="CardImg44"
                />
              ) : (
                <Image 
                  src={defaultPortifolio} 
                  alt="ERR404" 
                   className="CardImg44"
                />
              )}
          <div className="lastCardSecAuthor">
            <h6>{author.name}</h6>
            <div className="bookNum">
              <Image src={bookicon} alt="ERR404" />
              <p>عدد الكتب: {author.book_count || "غير معروف"}</p> 
            </div>
          </div>
        </Link>
      ))}
      </div>
      )}



    </div>
  );
}
