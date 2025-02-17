
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
import { redirect } from "next/dist/server/api-utils";
import { api } from "@/context/ApiText/APITEXT";



export default function BookDet({props}) {


     
  const [activeTab, setActiveTab] = useState('description');

  const toggleTab = (tab) => {
      setActiveTab(tab);
  }; 





  const [Details, setDetails] = useState([]);
  const [category, setcategory] = useState([]);
  const [author, setauthor] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${api}/api/books/${props.params.BookDetails}`); 
        setDetails(response.data.data);     
        setcategory(response.data.data.category);
        setauthor(response.data.data.author);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);


  


  

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `${api}/api/books/${props.params.BookDetails}/download`, {
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${Details.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };




  return (
    <div>
      
<div  style={{
  boxShadow:" 0 4px 46px rgba(0, 0, 0, 0.3)",
  paddingTop:"50px",
  paddingBottom:"50px",
}}>


{loading ? (
           <div className="spinner-container">
           <div className="spinner"></div> 
         </div>
      ) : (
       
        <div className="book-section">
       


    <div className="firstSection">
    <div className="details">

       <div>
       {Details.cover_image ? (
        <img 
          src={Details.cover_image} 
          alt="Book Cover" 
          className="book-cover" 
        />
      ) : (
        <Image 
          src={defaultBook} 
          alt="Default Book Cover" 
          className="book-cover" 
        />
      )}
       </div>
                <div className="info">
                <h3>{Details.title}</h3>
                    <p><strong>القسم:</strong> {category.name} </p>
                    <p><strong>المؤلف:</strong> {author.name}</p>
                    <p><strong>اللغة:</strong> {Details.lang}</p>
                    <p><strong>الصفحات:</strong> {Details.number_pages}</p>
                    <p><strong>رقم الطبعة:</strong> {Details.edition_number}</p>
                    <p><strong>دار النشر:</strong> {Details.publisher_name}</p>
                    <p><strong>حجم الملف:</strong> {Details.size} MB</p>
                    <p><strong>تاريخ النشر:</strong> {Details.published_at}</p>
                </div>
         

           
            </div>

            <button className="down-button" onClick={downloadFile}>تحميل</button>
            <Link className="view-button" href={`${Details.file}`} target="_blank">مشاهده</Link>


            <div className="rating">
                    <span>{Details.downloads_count||0}</span>
                    <span>{Details.views_count||0}</span>
                    <span>{Details.average_rating||0}</span>
                </div>
            <div className="ratingIcons">
              <div>
              <Image src={download} alt="ERR404" />
              </div>
              <div>
              <Image src={view} alt="ERR404" />
              </div>
              <div>
              <Image src={ratings} alt="ERR404" />
              </div>
                </div>


            <div className="ratingText">
              <div>
              <p>التحميلات</p>
              </div>
              <div>
              <p>المشاهدات</p>
              </div>
              <div>
              <p>التقييمات</p>
              </div>
                </div>




            </div>
     
  






            <div className="sidebar">
                <div className="tab-buttons">
                    <p 
                        onClick={() => toggleTab('description')} 
                        className={activeTab === 'description' ? 'active' : ''}
                    >
                        وصف الكتاب
                    </p>
                    <p 
                        onClick={() => toggleTab('author')} 
                        className={activeTab === 'author' ? 'active' : ''}
                    >
                        المؤلف
                    </p>
                </div>

                <div className="tab-content">
                    {activeTab === 'description' && (
                        <p>
                          {Details.description}
                        </p>
                    )}
                    
                    {activeTab === 'author' && (
                        <p>
                            {author.biography}
                        </p>
                    )}
                </div>
            </div>

        </div>
      )}



        </div>
    </div>
  )
}
