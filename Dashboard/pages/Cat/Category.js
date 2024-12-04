

"use client"
import "./Category.css"
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import add from "../../../public/Images/unnbfbfamed.png";
import AddCat from "./addCat";
import AddSubCat from "./addSubCat";
import DelCat from "./delCat";
import DelSubCat from "./delSubCat";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export default function Category() {



    
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
      setIsPopupVisible(!isPopupVisible);
    };
 
 
    const [isPopupVisible1, setIsPopupVisible1] = useState(false);

    const togglePopup1 = () => {
      setIsPopupVisible1(!isPopupVisible1);
    };



    const [isPopupVisible2, setIsPopupVisible2] = useState(false);

    const togglePopup2 = () => {
      setIsPopupVisible2(!isPopupVisible2);
    };
 
 
    const [isPopupVisible3, setIsPopupVisible3] = useState(false);

    const togglePopup3 = () => {
      setIsPopupVisible3(!isPopupVisible3);
    };
  
  





    const [loading, setLoading] = useState(true);
      setTimeout(() => {
        setLoading(false);
      }, 2101); 
    if (loading) {
      return (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      );
    }
  
    


  return (
    <div>
    <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    <br />
    <br />
    <h1 className="title">اضافه عناصر</h1>
            <div className="CatBTN">
            <div 
                        onClick={togglePopup}
                        className="addauthorbtn" 
                        >
                            <p>اضافه قسم</p>
                            <Image src={add} alt="ERR404" />
                    </div>
                <div 
                        onClick={togglePopup1}
                        className="addauthorbtn" 
                        >
                            <p>اضافه قسم فرعى</p>
                            <Image src={add} alt="ERR404" />
                    </div>
            </div>

    <br />
    <br />
    <br />
 
    <h1 className="title">حذف عناصر</h1>
            <div className="CatBTN">
                <div 
                    onClick={togglePopup2}
                    className="addauthorbtn" 
                    >
                        <p>حذف قسم</p>
                        <Image src={add} alt="ERR404" />
                </div>
            <div 
                    onClick={togglePopup3}
                    className="addauthorbtn" 
                    >
                        <p>حذف قسم فرعى</p>
                        <Image src={add} alt="ERR404" />
                </div>
                </div>

{isPopupVisible && (
      <AddCat/>
      )}


{isPopupVisible1 && (
      <AddSubCat/>
      )}

{isPopupVisible2 && (
      <DelCat/>
      )}


{isPopupVisible3 && (
      <DelSubCat/>
      )}

  </div>
  )
}
