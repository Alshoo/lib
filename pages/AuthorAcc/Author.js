"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import edit from "../../public/Images/unnafdfmed.png";
import add from "../../public/Images/unnbfbfamed.png";
import "./Author.css";
import AddBook from "./AddBook";

export default function AuthorPage({AuthorID}) {


    const [authorData, setAuthorData] = useState([]);

    useEffect(() => {
      const fetchAuthors = async () => {
        try {
          const response = await axios.get
          (`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authors/${AuthorID}`); 
            setAuthorData(response.data.data);
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
      <br></br>
      <br></br>

      <div>

        <div className="FirstSec">


            <div className="AuthorFir">
            <div className="ImgContainer">
            <Image 
            className="AuthorImg"
            src={authorData.profile_image || defaultPortifolio } 
            alt="ERR404"/>
            <p>{authorData.name}</p>
            </div>
            

            <div className="EditionContainer">
                <div className="editbtn">
                    <p>تعديل الصفحه</p>
                    <Image src={edit} alt="ERR404" />
                </div>
                <div 
                onClick={togglePopup}
                className="addbtn" 
                >
                    <p>اضافه كتاب</p>
                    <Image src={add} alt="ERR404" />
                </div>
            </div>
            </div>
            <div className="hr"></div>

            <p>
            {authorData.biography}
            </p>


            <div className="hr" 
            style={{
                width:"50%",
                margin:"auto",
                padding:"50px",
            }}
            ></div>


        </div>






      </div>


      {isPopupVisible && (
      <AddBook AuthorID={AuthorID}/>
      )}


    </div>
  )
}
