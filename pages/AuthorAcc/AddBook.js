"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import "./Author.css";
import Image from 'next/image';
import upload from "../../public/Images/vechgfhor.png";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';
const backendUrl = api;
export default function AddBook({ AuthorID }) {
  const [show, setShow] = useState(true);
  const [editionNumber, setEditionNumber] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [bookSeriesId, setBookSeriesId] = useState('');
  const [categories, setCategories] = useState([]);
  const [bookSeriesOptions, setBookSeriesOptions] = useState([]);
  const [bookName, setBookName] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [bookLanguage, setBookLanguage] = useState('');
  const [bookfile, setbookfile] = useState(null);
  const [publishDate, setPublishDate] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageName, setCoverImageName] = useState('');
  const [copyrightImage, setCopyrightImage] = useState(null);
  const [copyrightImageName, setCopyrightImageName] = useState('');
  const [bookfileName, setbookfileName] = useState('');
  const [descriptionParagraphs, setDescriptionParagraphs] = useState(['']);
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleFileChange = (e, setFile, setFileName) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file?.name || '');
  };
  const handleParagraphChange = (index, value) => {
    const paragraphs = [...descriptionParagraphs];
    paragraphs[index] = value;
    setDescriptionParagraphs(paragraphs);
  };
  const handleAddParagraph = () => {
    setDescriptionParagraphs([...descriptionParagraphs, '']);
  };
  const handleDeleteParagraph = (index) => {
    const paragraphs = [...descriptionParagraphs];
    paragraphs.splice(index, 1);
    setDescriptionParagraphs(paragraphs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedDescription = descriptionParagraphs.filter(p => p.trim() !== '').map(p => `<li>${p.trim()}</li>`).join("");
    const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k !== '');
    const formData = new FormData();
    formData.append('title', bookName);
    formData.append('description', formattedDescription);
    formData.append('category_id', subCategoryId || categoryId);
    formData.append('book_series_id', bookSeriesId);
    formData.append('published_at', publishDate);
    formData.append('author_id', AuthorID);
    formData.append('lang', bookLanguage);
    formData.append('file', bookfile);
    formData.append('cover_image', coverImage);
    formData.append('edition_number', editionNumber);
    formData.append('publisher_name', publisherName);
    formData.append('copyright_image', copyrightImage);
    formData.append('keywords', JSON.stringify(keywordsArray));

    console.log(formData);
    
    try {
      const auth_token = Cookies.get('auth_token');
      await axios.post(`${backendUrl}/api/books/`, formData, {
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("لقد تم انشاء الكتاب بنجاح", {
        duration: 4000,
        position: "top-center",
        style: {
          fontSize: "20px",
          width: "50%"
        }
      });
      handleClose();
    } catch (error) {
      toast.error('خطأ فى تسجيل البيانات');
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/category-groups/`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBookSeries = async () => {
      try {
        const auth_token = Cookies.get('auth_token');
        const response = await axios.get(`${backendUrl}/api/book-series/`, {
          headers: { Authorization: `Bearer ${auth_token}` }
        });
        setBookSeriesOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching book series:", error);
      }
    };
    fetchBookSeries();
  }, []);
  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          اضافة كتاب
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder="اسم الكتاب" value={bookName} onChange={(e) => setBookName(e.target.value)} />
            </div>
            <div className="form-row">
              <input type="text" placeholder="دار النشر" value={publisherName} onChange={(e) => setPublisherName(e.target.value)} />
              <input type="text" placeholder="لغة الكتاب" value={bookLanguage} onChange={(e) => setBookLanguage(e.target.value)} />
            </div>
            <div className="form-row">
              <input type="text" placeholder="رقم الطبعة" value={editionNumber} onChange={(e) => setEditionNumber(e.target.value)} />
            </div>
            <div className="form-row">
              <input type="text" placeholder="تاريخ النشر" onChange={(e) => setPublishDate(e.target.value)} />
            </div>
            <div className="form-row">
              <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setSubCategoryId(''); }}>
                <option value="">اختر الفئة الرئيسية</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {categoryId && (
              <div className="form-row">
                <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                  <option value="">اختر الفئة الفرعية</option>
                  {categories.find(category => category.id === parseInt(categoryId))?.categories?.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                  {(!categories.find(category => category.id === parseInt(categoryId))?.categories) && (
                    <option disabled>لا توجد فئات فرعية</option>
                  )}
                </select>
              </div>
            )}
            <div className="form-row">
              <select value={bookSeriesId} onChange={(e) => setBookSeriesId(e.target.value)}>
                <option value="">اختر سلسلة الكتب</option>
                {bookSeriesOptions.map((series) => (
                  <option key={series.id} value={series.id}>
                    {series.title}
                  </option>
                ))}
                {bookSeriesOptions.length === 0 && (
                  <option disabled>لا توجد سلاسل</option>
                )}
              </select>
            </div>
            <div className="form-row">
              <input type="text" placeholder="الكلمات المفتاحية (افصل بين الكلمات بفاصلة)" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="custom-file-upload">
                <Image src={upload} alt="ERR404" className="upload" />
                <span>صورة الكتاب</span>
                <input type="file" onChange={(e) => handleFileChange(e, setCoverImage, setCoverImageName)} />
                {coverImageName && <p>{coverImageName}</p>}
              </div>
              <div className="custom-file-upload">
                <Image src={upload} alt="ERR404" className="upload" />
                <span>صورة إثبات ملكية الكتاب</span>
                <input type="file" onChange={(e) => handleFileChange(e, setCopyrightImage, setCopyrightImageName)} />
                {copyrightImageName && <p>{copyrightImageName}</p>}
              </div>
            </div>
            <div className="custom-file-upload">
              <Image src={upload} alt="ERR404" className="upload" />
              <span>ملف الكتاب</span>
              <input type="file" onChange={(e) => handleFileChange(e, setbookfile, setbookfileName)} />
              {bookfileName && <p>{bookfileName}</p>}
            </div>
            <div className="form-row description">
              <div className="paragraph-container" style={{ maxHeight: "200px", width: "100%", overflowY: "auto" }}>
                {descriptionParagraphs.map((para, index) => (
                  <div key={index} className="paragraph-input" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <textarea placeholder="اكتب الفقرة هنا" value={para} onChange={(e) => handleParagraphChange(index, e.target.value)} style={{ flex: 1, resize: 'both' }} />
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}>
                      {index === descriptionParagraphs.length - 1 && (
                        <button type="button" onClick={handleAddParagraph} style={{ marginBottom: "5px", border: 'none' }}>+</button>
                      )}
                      {descriptionParagraphs.length > 1 && (
                        <button type="button" onClick={() => handleDeleteParagraph(index)} style={{ marginBottom: "5px", border: 'none' }}>-</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="booksubmitbtn" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "إرسال"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
