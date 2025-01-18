"use client"
import "./bookDet.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import "../../pages/Famous/famous.css" 
import "../../pages/Home/Home.css"
import Link from 'next/link'
import Comment from "@/public/Images/unnagfgf4rmed.png";
import Editor from "@/public/Images/frame-2888.png";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import download from "../../public/Images/arrow-backup-down-download-save-storage-transfer-1225091.png";
import view from "../../public/Images/unnاamed.png";
import ratings from "../../public/Images/unnamed.png";
import axios from "axios";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import Carousel from 'react-bootstrap/Carousel';
import RatingStars2 from "./ratingStar2";
import AddComment from "./AddComment";
import { api } from "@/context/ApiText/APITEXT";




export default function Comments({props}) {

// Carousels
const [index, setIndex] = useState(0);

const handleSelect = (selectedIndex) => {
  setIndex(selectedIndex);
};
// Carousels



const [Comments, setComments] = useState([]);
const [User, setUser] = useState([]);

useEffect(() => {
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${api}/api/books/${props.params.BookDetails}/comments`); 
      setComments(response.data.data);
      setUser(response.data.data.user.name);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  fetchAuthors();
}, []);






const [isPopupVisible, setIsPopupVisible] = useState(false);

const togglePopup = () => {
  setIsPopupVisible(!isPopupVisible);
};




  return (
    <div>
{Comments && Comments.length > 0 ? (
  <Carousel>
    {Comments.map((comment) => (
      <Carousel.Item interval={5000} key={comment.id}>
        <div className="commCont">
          <div className="commName">
            <p>{comment.user.name}</p>
            <RatingStars2 rating={comment.rating} />
          </div>
          <div className="hr"></div>
          <p style={{ textAlign: 'center' }}>{comment.content}</p>
          <div
            style={{
              width: '30%',
              margin: 'auto',
              padding: '15px',
            }}
            className="hr"
          ></div>
          <p style={{ textAlign: 'center', paddingTop: '10px' }}>
            {comment.created_at}
          </p>
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
) : null}

<div className="commentBtn" onClick={togglePopup} >
  <p>تعليق</p>
  <Image src={Comment} alt="ERR404" />
</div>




{isPopupVisible && (
      <AddComment props={props}/>
)}


    </div>
  )
}
