"use client"
import "./Category.css"
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import add from "../../../public/Images/unnbfbfamed.png";
import AddCat from "./addCat";
import axios from "axios";
import Cookies from 'js-cookie';
import { api } from "@/context/ApiText/APITEXT";
import EditCat from "./edit";

const backendUrl = api;

export default function BookSeries() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [series, setSeries] = useState([]);
  const [MainCatId, setMainCatId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible4, setIsPopupVisible4] = useState(false);

  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const togglePopup4 = (ID) => {
    setMainCatId(ID);
    setIsPopupVisible4(!isPopupVisible4);
  };

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const auth_token = Cookies.get('auth_token');
        const response = await axios.get(`${backendUrl}/api/book-series/`, {
          headers: { Authorization: `Bearer ${auth_token}` }
        });
        setSeries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCat();
  }, []);

  setTimeout(() => setLoading(false), 2101);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const filteredSeries = series.filter(ser =>
    ser.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCategory = async (categoryId, e) => {
    e.stopPropagation();
    toast(
      (t) => (
        <div>
          <p>هل أنت متأكد أنك تريد حذف هذه السلسه</p>
          <button className="confirm-button"
            onClick={async () => {
              try {
                const auth_token = Cookies.get('auth_token');
                await axios.delete(`${backendUrl}/api/category-groups/${categoryId}`, {
                  headers: { "Authorization": `Bearer ${auth_token}` },
                });
                toast.success('تم حذف السلسه بنجاح');
                setSeries(series.filter(category => category.id !== categoryId));
              } catch (error) {
                toast.error('حدث خطأ أثناء الحذف');
              }
              toast.dismiss(t.id);
            }}
          >
            نعم
          </button>
          <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>لا</button>
        </div>
      ),
      { duration: 4000 }
    );
  };

  return (
    <div>
    <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    <br></br>
 
    
    <br></br> 
    <div className="CatBTN">
      <div onClick={togglePopup} className="addauthorbtn">
        <p>اضافه </p>
        <Image src={add} alt="ERR404" />
      </div>
    </div>


    <div className="main-Search-container11">
        <div className="search-container11">
                  <i className="fas fa-search search-icon11"></i>
                  <input 
                    type="text"
                    placeholder="البحث عن سلسله"
                    className="search-input11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
        </div>



      <br />
      <div className="dropdown-container23">
        {filteredSeries.length === 0 ? (
          <p className="no-data-message">لا يوجد نتائج</p>
        ) : (
          filteredSeries.map((ser) => (
            <div className="dropdown-section" key={ser.id}>
              <div className="dropdown-header">
                <div>
                  <span>{ser.title}</span>
                </div>
                <div> 
                  <button className="edit-sub-btn" onClick={() => togglePopup4(ser)}>تعديل </button>
                  <button className="delete-btn" onClick={(e) => handleDeleteCategory(ser.id, e)}>حذف</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {isPopupVisible && <AddCat />}
      {isPopupVisible4 && <EditCat MainCatId2={MainCatId} />}
    </div>
  );
}
