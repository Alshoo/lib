"use client";
import { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import Image from 'next/image';



const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/books/pending/approval`);
        setBooks(response.data.data);
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

  const handleApproval = async (bookId, status) => {
    const formData = new FormData();
    formData.append('status', status);

    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');

      const response = await axios.post(`${backendUrl}/api/books/${bookId}/approve`, formData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
        toast.success('تم تحديث حالة الكتاب');
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
      <h1 className="title">الكتب في انتظار الموافقة</h1>
      {books.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد كتب في انتظار الموافقة</p>
        </div>
      ) : (
        <ul className="books-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <div>
                {book.cover_image ? (
                      <img 
                        src={book.cover_image} 
                        alt={book.title} className="book-image" 
                      />
                    ) : (
                      <Image
                        src={defaultPortifolio} 
                        alt={book.title} className="book-image"  
                      />
                    )}

                <h3 className="book-title">{book.title}</h3>
                <p className="book-description">{book.description}</p>
                <p className="book-info"><strong>المؤلف:</strong> {book.author.name}</p>
                <p className="book-info"><strong>الفئة:</strong> {book.category.name}</p>
                <button className="approve-btn" onClick={() => handleApproval(book.id, "approved")}>قبول</button>
                <button className="reject-btn" onClick={() => handleApproval(book.id, "rejected")}>رفض</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
