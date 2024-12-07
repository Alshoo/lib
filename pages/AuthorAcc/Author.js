"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import edit from "../../public/Images/unnafdfmed.png";
import add from "../../public/Images/unnbfbfamed.png";
import "./Author.css";
import AddBook from "./AddBook";
import History from "./history";
import AuthorUpdate from "./AuthorUpdate";
import useAuthContext from "@/hooks/useAuthContext";
import Cookies from "js-cookie";

export default function AuthorPage({AuthorID}) {

    const [authorData, setAuthorData] = useState([]);
    const [loading, setLoading] = useState(true); 

    const [user, setUser] = useState(null);
    const updateUser = () => {
      const userData = Cookies.get("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    useEffect(() => {
      updateUser();
    }, []);

    useEffect(() => {
      const fetchAuthors = async () => {
        try { 
          const response = await axios.get
          (`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authors/${AuthorID}`); 
            setAuthorData(response.data.data);
            setLoading(false); 
        } catch (error) {
          console.error("Error fetching authors:", error);
          setLoading(false); 
        }
      };
  
      fetchAuthors();
    }, []);

    const [isPopupVisible1, setIsPopupVisible1] = useState(false);
    const togglePopup1 = () => {
      setIsPopupVisible1(!isPopupVisible1);
    };
    const [isPopupVisible2, setIsPopupVisible2] = useState(false);
    const togglePopup2 = () => {
      setIsPopupVisible2(!isPopupVisible2);
    };


    
  return (
    <div>
      <br></br>
      <br></br>

      <div>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
   
          <div className="FirstSec">

          <div className="AuthorFir">
          <div className="ImgContainer">
              {authorData.profile_image ? (
                <img 
                  src={authorData.profile_image} 
                  alt="ERR404"
                   className="AuthorImg2"
                />
              ) : (
                <Image 
                  src={defaultPortifolio} 
                    alt="ERR404"
                   className="AuthorImg2"
                />
              )}
          
          <p>{authorData.name}</p>
          </div>
          

          <div className="EditionContainer">
              {user && (
                <>

                {
                  user.id == AuthorID&&(
                    <div>
                    <div
                  onClick={togglePopup2}
                   className="editbtn">
                      <p>تعديل الصفحه</p>
                      <Image src={edit} alt="ERR404" />
                  </div>
                    </div>
                  )
                }
                
                  <div 
                  onClick={togglePopup1}
                  className="addbtn" 
                  >
                      <p>اضافه كتاب</p>
                      <Image src={add} alt="ERR404" />
                  </div>
                </>
              )}
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
        )}

      </div>

      {isPopupVisible1 && (
      <AddBook AuthorID={AuthorID}/>
      )}

      {isPopupVisible2 && (
      <AuthorUpdate AuthorID={AuthorID}
       AuthorName={authorData.name} 
       AuthorBiography={authorData.biography}
       profile_image={authorData.profile_image}
       />
      )}

      <History AuthorID={AuthorID} AuthorName={authorData.name}/>

    </div>
  )
}
