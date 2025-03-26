"use client";
import { useState, useEffect } from 'react';
import "./Authors.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import defaultPortifolio from "../../../public/Images/defaultPortifolio.jpeg";
import Image from 'next/image';
import AddAuthor from './addauthor';
import add from "../../../public/Images/unnbfbfamed.png";
import { api } from '@/context/ApiText/APITEXT';
import EditAuthor from './editAuthor';
import Link from 'next/link';

const backendUrl = api;

export default function Authors() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible1, setIsPopupVisible1] = useState(false);
  const [books, setBooks] = useState([]);
  const [books1, setBooks1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [CurrentAuthor, setCurrentAuthor] = useState({
    id: '',
    name: '',
    description: '',
    date: '',
    image: '',
  });
  const [popupAuthor, setPopupAuthor] = useState(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const togglePopup1 = () => {
    setIsPopupVisible1(!isPopupVisible1);
  };

  useEffect(() => {
    const fetchAuthorsRequest = async () => {
      try {
        const auth_token = Cookies.get('auth_token');
        const response = await axios.get(`${backendUrl}/api/author-requests`, {
          headers: { Authorization: `Bearer ${auth_token}` },
        });
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author requests:", error);
        setLoading(false);
      }
    };

    const fetchAuthors = async () => {
      try {
        const auth_token = Cookies.get('auth_token');
        const response = await axios.get(`${backendUrl}/api/authors/`, {
          headers: { Authorization: `Bearer ${auth_token}` },
        });
        setBooks1(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchAuthorsRequest();
      fetchAuthors();
    }, 2101);
  }, []);

  const handleApproval = async (authorId, status) => {
    const formData = new FormData();
    formData.append('status', status);
    try {
      const auth_token = Cookies.get('auth_token');
      const response = await axios.post(`${backendUrl}/api/author-requests/${authorId}/handle`, formData, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      if (response.status === 200) {
        const updated = books.filter((a) => a.id !== authorId);
        setBooks(updated);
        toast.success('تم تحديث حالة المؤلف');
      } else {
        toast.error('حدث خطأ أثناء المعالجة');
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء المعالجة');
      console.error(error);
    }
  };

  const handledelete = async (authorId) => {
    try {
      const auth_token = Cookies.get('auth_token');
      const response = await axios.delete(`${backendUrl}/api/authors/${authorId}`, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      if (response.status === 200) {
        const updated = books1.filter((a) => a.id !== authorId);
        setBooks1(updated);
        toast.success('تم حذف المؤلف بنجاح', {
          duration: 4000,
          position: "top-center",
          style: { fontSize: "20px", width: "50%" },
        });
      } else {
        toast.error('حدث خطأ أثناء الحذف', {
          duration: 4000,
          position: "top-center",
          style: { fontSize: "18px", width: "60%" },
        });
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف. يرجى المحاولة لاحقاً.', {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "18px", width: "60%" },
      });
      console.error(error);
    }
  };

  const filteredAuthors = books1.filter((author) => {
    return (
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.biography.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.birthdate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
      <br /><br />
      <h1 className="title">اضافه عناصر</h1>
      <div style={{ width: "85%", margin: "auto" }}>
        <div onClick={togglePopup} className="addauthorbtn">
          <p>اضافه مؤلف</p>
          <Image src={add} alt="ERR404" />
        </div>
      </div>
      <br /><br />
      <h1 className="title">المؤلفون في انتظار الموافقة</h1>
      {books.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد مؤلفين في انتظار الموافقة</p>
        </div>
      ) : (
        <ul className="pending-list">
          {books.map((author) => (
            <li key={author.id} className="pending-item" onClick={() => setPopupAuthor(author)}>
              <div className="titleContainer">
                {author.request_image ? (
                  <img src={author.request_image} alt={author.name} className="pending-small-image" />
                ) : (
                  <Image src={defaultPortifolio} alt={author.name} className="pending-small-image" />
                )}
                <h3 className="pending-title">{author.name}</h3>
              </div>
              <button className="pending-popup-btn" onClick={() => setPopupAuthor(author)}>ℹ️</button>
            </li>
          ))}
        </ul>
      )}
      {popupAuthor && (
        <div className="popup-overlay" onClick={() => setPopupAuthor(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={() => setPopupAuthor(null)}>X</button>
            {popupAuthor.request_image ? (
              <img src={popupAuthor.request_image} alt={popupAuthor.name} className="popup-image" />
            ) : (
              <Image src={defaultPortifolio} alt={popupAuthor.name} className="popup-image" />
            )}
            <h3 className="popup-title">{popupAuthor.name}</h3>
            <div className="descript">
              <p className="popup-description">{popupAuthor.biography || "لا توجد سيرة ذاتية متاحة"}</p>
            </div>
            <p className="popup-info"><strong>تاريخ الميلاد:</strong> {popupAuthor.birthdate || "غير محدد"}</p>
            <div className="popup-buttons">
              <button className="approve-btn" onClick={() => { handleApproval(popupAuthor.id, "approved"); setPopupAuthor(null); }}>قبول</button>
              <button className="reject-btn" onClick={() => { handleApproval(popupAuthor.id, "rejected"); setPopupAuthor(null); }}>رفض</button>
            </div>
          </div>
        </div>
      )}
      <br /><br />
      <h1 className="title">حذف عناصر</h1>
      <div className="search-container">
        <input type="text" placeholder="ابحث عن مؤلف بالاسم أو السيرة الذاتية أو تاريخ الميلاد..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
      </div>
      {filteredAuthors.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد مؤلفين مطابقين للبحث</p>
        </div>
      ) : (
        <ul className="books-list22">
          {filteredAuthors.map((author) => (
            <li key={author.id} className="book-item">
              <div className="card-content">
                {author.profile_image ? (
                  <img src={author.profile_image} alt="ERR404" className="book-image" />
                ) : (
                  <Image src={defaultPortifolio} alt="ERR404" className="book-image" />
                )}
                <div className="card-body">
                  <Link href={`/Authors/${author.id}`} className="book-title">{author.name}</Link>
                  <p className="book-info"><strong>تاريخ الميلاد:</strong> {author.birthdate || "غير محدد"}</p>
                </div>
              </div>
              <div className="authorEdition">
                <button className="edit-btn11" onClick={()=>{
                  togglePopup1();
                  setCurrentAuthor({
                    id: author.id,
                    name: author.name,
                    description: author.biography,
                    date: author.birthdate,
                    image: author.profile_image,
                  });
                }}>تعديل</button>
                <button className="reject-btn11" onClick={() => handledelete(author.id)}>حذف</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isPopupVisible && <AddAuthor />}
      {isPopupVisible1 && <EditAuthor data={CurrentAuthor} />}
    </div>
  );
}
