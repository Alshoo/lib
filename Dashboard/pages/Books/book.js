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
  const [pendingBooks, setPendingBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [CurrentBook, setCurrentBook] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupBook, setPopupBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const fetchPendingBooks = async () => {
      try {
        const auth_token = Cookies.get("auth_token");
        const response = await axios.get(`${backendUrl}/api/books/pending/approval`, {
          headers: { Authorization: `Bearer ${auth_token}` }
        });
        setPendingBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending books:", error);
        setLoading(false);
      }
    };
    const fetchAllBooks = async () => {
      try {
        const auth_token = Cookies.get("auth_token");
        const response = await axios.get(`${backendUrl}/api/books/`, {
          headers: { Authorization: `Bearer ${auth_token}` }
        });
        setAllBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };
    setTimeout(() => {
      fetchPendingBooks();
      fetchAllBooks();
    }, 2101);
  }, []);

  const handleApproval = async (bookId, status) => {
    const formData = new FormData();
    formData.append("status", status);
    try {
      const auth_token = Cookies.get("auth_token");
      const response = await axios.post(
        `${backendUrl}/api/books/${bookId}/approve`,
        formData,
        { headers: { Authorization: `Bearer ${auth_token}` } }
      );
      if (response.status === 200 || response.status === 204) {
        const updated = pendingBooks.filter((book) => book.id !== bookId);
        setPendingBooks(updated);
        toast.success("تم تحديث حالة الكتاب");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث حالة الكتاب");
      console.error(error);
    }
  };


  console.log(pendingBooks)

  
  const handledelete = async (bookId) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const response = await axios.delete(`${backendUrl}/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${auth_token}` }
      });
      if (response.status === 200) {
        const updated = allBooks.filter((book) => book.id !== bookId);
        setAllBooks(updated);
        toast.success("تم حذف الكتاب بنجاح", {
          duration: 4000,
          position: "top-center",
          style: { fontSize: "20px", width: "50%" }
        });
      } else {
        toast.error("حدث خطأ أثناء الحذف", {
          duration: 4000,
          position: "top-center",
          style: { fontSize: "18px", width: "60%" }
        });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف. يرجى المحاولة لاحقاً.", {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "18px", width: "60%" }
      });
      console.error("Error deleting book:", error);
    }
  };

  const filteredBooks = allBooks.filter((book) => {
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
      {pendingBooks.length === 0 ? (
        <div className="no-books-message-container">
          <p className="no-books-message">لا توجد كتب في انتظار الموافقة</p>
        </div>
      ) : (
        <ul className="pending-list">
          {pendingBooks.map((book) => (
            <li
              key={book.id}
              className="pending-item"
              onClick={() => setPopupBook(book)}
            >
              <div className="titleContainer">
                {book.cover_image ? (
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="pending-small-image"
                  />
                ) : (
                  <Image
                    src={defaultPortifolio}
                    alt={book.title}
                    className="pending-small-image"
                  />
                )}
                <h3 className="pending-title">{book.title}</h3>
              </div>
              <button
                className="pending-popup-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupBook(book);
                }}
              >
                ℹ️
              </button>
            </li>
          ))}
        </ul>
      )}
      {popupBook && (
        <div className="popup-overlay" onClick={() => setPopupBook(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup-close-btn"
              onClick={() => setPopupBook(null)}
            >
              X
            </button>
            {popupBook.cover_image ? (
              <img
                src={popupBook.cover_image}
                alt={popupBook.title}
                className="popup-image"
              />
            ) : (
              <Image
                src={defaultPortifolio}
                alt={popupBook.title}
                className="popup-image"
              />
            )}

          
            <h3 className="popup-title">{popupBook.title}</h3>
            <div className="descript">
              <p className="popup-description">
                {popupBook.description || "لا يوجد وصف متاح"}
              </p>
            </div>
            <p className="popup-info">
              <strong>المؤلف:</strong> {popupBook.author.name}
            </p>
            <p className="popup-info">
              <strong>الفئة:</strong> {popupBook.category.name}
            </p>

            <h3 className="popup-title">صورة اثبات الملكيه :</h3>
            {popupBook.copyright_image ? (
              <img
                src={popupBook.copyright_image}
                alt={popupBook.title}
                className="popup-image2"
              />
            ) : (
              <Image
                src={defaultPortifolio}
                alt={popupBook.title}
                className="popup-image2"
              />
            )}
            <br></br>
            <br></br>
            <div className="popup-buttons">
              <button
                className="approve-btn"
                onClick={() => {
                  handleApproval(popupBook.id, "approved");
                  setPopupBook(null);
                }}
              >
                قبول
              </button>
              <button
                className="reject-btn"
                onClick={() => {
                  handleApproval(popupBook.id, "rejected");
                  setPopupBook(null);
                }}
              >
                رفض
              </button>
            </div>
          </div>
        </div>
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
                <Link href={`/${book.id}`} className="book-title">
                  {book.title}
                </Link>
                <div className="descript">
                  <p className="book-info">
                    <strong>المؤلف:</strong> {book.author.name}
                  </p>
                </div>
                <p className="book-info">
                  <strong>الفئة:</strong> {book.category.name}
                </p>
                <div className="bookEdition">
                  <button
                    className="edit-btn21"
                    onClick={() => {
                      togglePopup();
                      setCurrentBook(book);
                    }}
                  >
                    تعديل
                  </button> 
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
      {isPopupVisible && <EditBook data={CurrentBook} />}
    </div>
  );
}
