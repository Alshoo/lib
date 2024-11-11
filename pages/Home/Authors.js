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

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authors`); 
        setAuthors(response.data.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching authors:", error);
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




      <div className="Maincards">

        {/* <Link href="#" className="CardCont">
          <Image className="CardImg44" src={CardImg} alt="ERR404" />
          <div className="lastCardSecAuthor">
            <h6>حسن الجندي</h6>
            <div className="bookNum">
                <Image src={bookicon} alt="ERR404" />
                <p>70 كتاب</p>
            </div>
          </div>
        </Link> */}

        {authors.map((author) => (
        <Link href={`Authors/${author.id}`} className="CardCont" key={author.id}>
          <Image className="CardImg44"
           src={author.profile_image || defaultPortifolio}
            alt="ERR404" />
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





    </div>
  );
}
