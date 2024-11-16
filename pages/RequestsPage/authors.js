"use client";
import { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import Image from 'next/image';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Authors() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

    setTimeout(() => {
      fetchBooks();
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
                      <img 
                        src={author.request_image} 
                        alt={author.name} 
                        className="book-image" 
                      />
                    ) : (
                      <Image
                        src={defaultPortifolio} 
                        alt={author.name} 
                        className="book-image" 
                      />
                    )}



                <h3 className="book-title">{author.name}</h3>
                <p className="book-description">{author.biography || "لا توجد سيرة ذاتية متاحة"}</p>
                <p className="book-info"><strong>تاريخ الميلاد:</strong> {author.birthdate || "غير محدد"}</p>
                <button 
                  className="approve-btn" 
                  onClick={() => handleApproval(author.id, "approved")}>
                  قبول
                </button>
                <button 
                  className="reject-btn" 
                  onClick={() => handleApproval(author.id, "rejected")}>
                  رفض
                </button>
           
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
