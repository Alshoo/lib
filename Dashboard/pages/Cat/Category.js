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
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import { api } from "@/context/ApiText/APITEXT";
import EditCat from "./edit";
import EditSubCat from "./editSub";

const backendUrl = api;

export default function Category() {
  const [openSection, setOpenSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [Cat, setCat] = useState([]);
  const [MainCatId, setMainCatId] = useState([]);
  const [subCatId, setSubCatId] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const auth_token = Cookies.get('auth_token');
        const response = await axios.get(`${backendUrl}/api/category-groups/`,{
          headers: { Authorization: `Bearer ${auth_token}` }
        });
        setCat(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCat();
  }, []);

  const filteredCategories = Cat.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.categories.some(subCategory =>
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const [isPopupVisible1, setIsPopupVisible1] = useState(false);
  const togglePopup1 = (ID) => {
    setMainCatId(ID);
    setIsPopupVisible1(!isPopupVisible1);
  };

  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const togglePopup2 = () => setIsPopupVisible2(!isPopupVisible2);

  const [isPopupVisible3, setIsPopupVisible3] = useState(false);
  const togglePopup3 = () => setIsPopupVisible3(!isPopupVisible3);

  const [isPopupVisible4, setIsPopupVisible4] = useState(false);
  const togglePopup4 = (ID) => {
    setMainCatId(ID);
    setIsPopupVisible4(!isPopupVisible4)
  };

  const [isPopupVisible5, setIsPopupVisible5] = useState(false);
  const togglePopup5 = (ID) => {
    setSubCatId(ID);
    setIsPopupVisible5(!isPopupVisible5)
  };

  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2101);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  
  const handleDeleteCategory = async (categoryId, e) => {
    e.stopPropagation();
    toast(
      (t) => (
        <div>
          <p>هل أنت متأكد أنك تريد حذف هذا القسم</p>
          <button className="confirm-button"
            onClick={async () => {
              try {
                const auth_token = Cookies.get('auth_token');
                await axios.delete(`${backendUrl}/api/category-groups/${categoryId}`, {
                  headers: { "Authorization": `Bearer ${auth_token}` },
                });
                toast.success('تم حذف القسم بنجاح');
                setCat(Cat.filter(category => category.id !== categoryId));
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

  const handleDeleteSubCategory = async (subCategoryId, e) => {
    e.stopPropagation();
    try {
      const auth_token = Cookies.get('auth_token');
      await axios.delete(`${backendUrl}/api/categories/${subCategoryId}`, {
        headers: { "Authorization": `Bearer ${auth_token}` },
      });
      toast.success('تم حذف القسم الفرعي بنجاح');
      setCat(Cat.map(category => ({
        ...category,
        categories: category.categories.filter(subCategory => subCategory.id !== subCategoryId)
      })));
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <br></br>
      {/* <h1 className="title">جميع العناصر</h1> */}
   
      
      <br></br> 
      <div className="CatBTN">
        <div onClick={togglePopup} className="addauthorbtn">
          <p>اضافه قسم</p>
          <Image src={add} alt="ERR404" />
        </div>
        {/* <div onClick={togglePopup1} className="addauthorbtn">
          <p>اضافه قسم فرعى</p>
          <Image src={add} alt="ERR404" />
        </div> */}
      </div>

        <div className="main-Search-container11">
        <div className="search-container11">
                  <i className="fas fa-search search-icon11"></i>
                  <input 
                    type="text"
                    placeholder="البحث عن قسم"
                    className="search-input11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
        </div>



      <br></br>
      <div>
        {filteredCategories.length === 0 ? (
          <p className="no-data-message">لا يوجد نتائج</p>
        ) : (
          filteredCategories.map((category) => (
            <div className="dropdown-section" key={category.id}>
              <div className="dropdown-header">
                <div>
                <span>{category.name}</span>
                </div>
                <div>
                <button className="toggle-btn" onClick={() => {
                  setMainCatId(category);
                  toggleSection(category.name)}}>
                  {openSection === category.name ? "إخفاء القائمة" : "عرض القائمة"}
                </button>
                <button className="edit-sub-btn" onClick={()=>togglePopup4(category)}>تعديل اسم القسم</button>
                <button className="add-sub-btn" onClick={()=>togglePopup1(category)}>إضافة قسم فرعي</button>
                <button className="delete-btn" onClick={(e) => handleDeleteCategory(category.id, e)}>حذف</button>
                </div>
                
              </div>
              {openSection === category.name && (
                <div className="dropdown-content">
                  {category.categories.map((subCategory) => (
                    <div className="dropdown-item" key={subCategory.id}>
                       <div>
                       {subCategory.name}
                       </div>
                       <div>
                       <button className="edit-btn" onClick={() => togglePopup5(subCategory)}>تعديل</button>
                       <button className="delete-btn" onClick={(e) => handleDeleteSubCategory(subCategory.id, e)}>حذف</button>
                       </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {isPopupVisible && <AddCat />}
      {isPopupVisible1 && <AddSubCat MainCatId={MainCatId} />}
      {isPopupVisible2 && <DelCat />}
      {isPopupVisible3 && <DelSubCat />}
      {isPopupVisible4 && <EditCat MainCatId2={MainCatId}/>}
      {isPopupVisible5 && <EditSubCat subCatId={subCatId} MainCatId={MainCatId}/>}
    </div>
  );
}