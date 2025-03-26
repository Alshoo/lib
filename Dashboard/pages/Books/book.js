"use client";
import "./book.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import defaultPortifolio from "../../../public/Images/defaultPortifolio.jpeg";
import Image from "next/image";
import { api } from "@/context/ApiText/APITEXT";
import EditBook from "./editBook";
import Link from "next/link";

const backendUrl = api;

export default function Book() {
  const [books, setBooks] = useState([]);
  const [CurrentBook, setCurrentBook] = useState('');
  const [books1, setBooks1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const auth_token = Cookies.get("auth_token");
        const response = await axios.get(
          `${backendUrl}/api/books/pending/approval`,
          {
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          }
        );
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    const fetchBooks1 = async () => {
      try {
        const auth_token = Cookies.get("auth_token");
        const response = await axios.get(`${backendUrl}/api/books/`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
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

  const handleApproval = async (bookId, status) => {
    const formData = new FormData();
    formData.append("status", status);

    try {
      // const csrfToken = Cookies.get('XSRF-TOKEN');
      const auth_token = Cookies.get("auth_token");
      const response = await axios.post(
        `${backendUrl}/api/books/${bookId}/approve`,
        formData,
        {
          headers: {
            // 'X-XSRF-TOKEN': csrfToken,
            Authorization: `Bearer ${auth_token}`,
          },
          // withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 204) {
        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
        toast.success("تم تحديث حالة الكتاب");
      }
    } catch (error) {
      // toast.error('حدث خطأ أثناء المعالجة');
      toast.success("تم تحديث حالة الكتاب");
      console.error(error);
    }
  };

  const handledelete = async (bookId) => {
    try {
      // const csrfToken = Cookies.get('XSRF-TOKEN');
      const auth_token = Cookies.get("auth_token");
      const response = await axios.delete(`${backendUrl}/api/books/${bookId}`, {
        headers: {
          // 'X-XSRF-TOKEN': csrfToken,
          Authorization: `Bearer ${auth_token}`,
        },
        // withCredentials: true,
      });

      if (response.status === 200) {
        const updatedBooks = books1.filter((book) => book.id !== bookId);
        setBooks1(updatedBooks);
        toast.success("تم حذف الكتاب بنجاح", {
          duration: 4000,
          position: "top-center",
          style: { fontSize: "20px", width: "50%" },
        });
      } else {
        toast.error("حدث خطأ أثناء الحذف", {
          duration: 4000,
          position: "top-center",
          style: { fontSize: "18px", width: "60%" },
        });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف. يرجى المحاولة لاحقاً.", {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "18px", width: "60%" },
      });
      console.error("Error deleting book:", error);
    }
  };

  const filteredBooks = books1.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h1 className="title">الكتب في انتظار الموافقة</h1>
      {books.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد كتب في انتظار الموافقة</p>
        </div>
      ) : (
        <ul className="books-list12">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <div>
                {book.cover_image ? (
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="book-image"
                  />
                ) : (
                  <Image
                    src={defaultPortifolio}
                    alt={book.title}
                    className="book-image"
                  />
                )}
                <Link href={`/${book.id}`} className="book-title">{book.title}</Link>
                {/* <p className="book-description">{book.description}</p> */}
                <p className="book-info">
                  <strong>المؤلف:</strong> {book.author.name}
                </p>
                <p className="book-info"> 
                  <strong>الفئة:</strong> {book.category.name}
                </p>
                <button
                  className="approve-btn"
                  onClick={() => handleApproval(book.id, "approved")}
                >
                  قبول
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleApproval(book.id, "rejected")}
                >
                  رفض
                </button>
              </div>
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
          placeholder="ابحث عن كتاب بالعنوان أو المؤلف أو الفئة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد كتب مطابقة للبحث</p>
        </div>
      ) : (
        <ul className="books-list12">
          {filteredBooks.map((book) => (
            <li key={book.id} className="book-item">
              <div>
                {book.cover_image ? (
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="book-image"
                  />
                ) : (
                  <Image
                    src={defaultPortifolio}
                    alt={book.title}
                    className="book-image"
                  />
                )}
                <Link href={`/${book.id}`} className="book-title">{book.title}</Link>
                <div className="descript">
                  {/* <p className="book-description">{book.description}</p> */}
                  
                </div>
                <div className="descript">
                <p className="book-info">
                  <strong>المؤلف:</strong> {book.author.name}
                </p>
                </div>

             
                <p className="book-info">
                  <strong>الفئة:</strong> {book.category.name}
                </p>
                <div className='bookEdition'> 
                <button className="edit-btn21" onClick={()=>{
              togglePopup();
              setCurrentBook(book);
              }}>تعديل</button>
                <button
                  className="reject-btn21"
                  onClick={() => handledelete(book.id)}
                >
                  حذف
                </button>

                </div>
              </div>
            </li>
          ))}
        </ul>
      )}



            {isPopupVisible && <EditBook data = {CurrentBook}/>}
    </div>
  );
}
