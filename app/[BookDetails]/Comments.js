"use client";
import "./bookDet.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import "../../pages/filtered/filtered.css";
import "../../pages/Home/Home.css";
import Comment from "@/public/Images/unnagfgf4rmed.png";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import RatingStars2 from "./ratingStar2";
import AddComment from "./AddComment";
import { api } from "@/context/ApiText/APITEXT";

export default function Comments({ props }) { 
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
        const response = await axios.get(
          `${api}/api/books/${props.params.BookDetails}/comments`
        );
        setComments(response.data.data);
        setUser(response.data.data.user.name);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);
 console.log(Comments)
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
                <p style={{ textAlign: "center" }}>{comment.content}</p>
                <div
                  style={{
                    width: "30%",
                    margin: "auto",
                    padding: "15px",
                  }}
                  className="hr"
                ></div>
                <p style={{ textAlign: "center", paddingTop: "10px" }}>
                  {comment.created_at}
                </p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}

      <button className="commentBtn" onClick={togglePopup}>
        <p>تعليق</p>
        <Image src={Comment} alt="ERR404" />
      </button>

      {isPopupVisible && <AddComment props={props} />}
    </div>
  );
}
