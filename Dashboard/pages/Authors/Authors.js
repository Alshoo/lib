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

const backendUrl = api;

export default function Authors() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [books, setBooks] = useState([]); 
  const [books1, setBooks1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/author-requests`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    const fetchBooks1 = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/authors/`);
        setBooks1(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchBooks();
      fetchBooks1();
    }, 2101);
  }, []);

  const handleApproval = async (authorId, status) => {
    const formData = new FormData();
    formData.append('status', status);

    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');
      const response = await axios.post(`${backendUrl}/api/author-requests/${authorId}/handle`, formData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const updatedBooks = books.filter((book) => book.id !== authorId);
        setBooks(updatedBooks);
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
      const csrfToken = Cookies.get('XSRF-TOKEN');
      const response = await axios.delete(`${backendUrl}/api/books/${authorId}`, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const updatedBooks = books1.filter((book) => book.id !== authorId);
        setBooks1(updatedBooks);
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
      console.error("Error deleting book:", error);
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
      <br />
      <br />
      <h1 className="title">اضافه عناصر</h1>
      <div style={{ width: "85%", margin: "auto" }}>
        <div onClick={togglePopup} className="addauthorbtn">
          <p>اضافه مؤلف</p>
          <Image src={add} alt="ERR404" />
        </div>
      </div>

      <br />
      <br />
      <h1 className="title">المؤلفون في انتظار الموافقة</h1>
      {books.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد مؤلفين في انتظار الموافقة</p>
        </div>
      ) : (
        <ul className="books-list">
          {books.map((author) => (
            <li key={author.id} className="book-item">
              {author.request_image ? (
                <img src={author.request_image} alt={author.name} className="book-image" />
              ) : (
                <Image src={defaultPortifolio} alt={author.name} className="book-image" />
              )}
              <h3 className="book-title">{author.name}</h3>
              <div className="descript">
                <p className="book-description">{author.biography || "لا توجد سيرة ذاتية متاحة"}</p>
              </div>
              <p className="book-info"><strong>تاريخ الميلاد:</strong> {author.birthdate || "غير محدد"}</p>
              <button className="approve-btn" onClick={() => handleApproval(author.id, "approved")}>قبول</button>
              <button className="reject-btn" onClick={() => handleApproval(author.id, "rejected")}>رفض</button>
            </li>
          ))}
        </ul>
      )}

      <br />
      <br />
      <h1 className="title">حذف عناصر</h1>

   
   
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث عن مؤلف بالاسم أو السيرة الذاتية أو تاريخ الميلاد..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredAuthors.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد مؤلفين مطابقين للبحث</p>
        </div>
      ) : (
        <ul className="books-list">
          {filteredAuthors.map((author) => (
            <li key={author.id} className="book-item">
              {author.request_image ? (
                <img src={author.request_image} alt={author.name} className="book-image" />
              ) : (
                <Image src={defaultPortifolio} alt={author.name} className="book-image" />
              )}
              <h3 className="book-title">{author.name}</h3>
              <div className="descript">
                <p className="book-description">{author.biography || "لا توجد سيرة ذاتية متاحة"}</p>
              </div>
              <p className="book-info"><strong>تاريخ الميلاد:</strong> {author.birthdate || "غير محدد"}</p>
              <button className="reject-btn" onClick={() => handledelete(author.id)}>حذف</button>
            </li>
          ))}
        </ul>
      )}

      {isPopupVisible && <AddAuthor />}
    </div>
  );
}