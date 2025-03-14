"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import upload from "../../../public/Images/vechgfhor.png";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function EditBook({ data }) {
  const [show, setShow] = useState(true);
  const [editionNumber, setEditionNumber] = useState(data.edition_number);
  const [categoryId, setCategoryId] = useState('');
  const [bookSeriesId, setBookSeriesId] = useState('');
  const [categories, setCategories] = useState([]);
  const handleClose = () => setShow(false);
  const [bookName, setBookName] = useState(data.title);
  const [publisherName, setPublisherName] = useState(data.publisher_name);
  const [bookLanguage, setBookLanguage] = useState(data.lang);
  const [bookfile, setbookfile] = useState(null);
  const [publishDate, setPublishDate] = useState(data.published_at);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageName, setCoverImageName] = useState('');
  const [copyrightImage, setCopyrightImage] = useState(null);
  const [copyrightImageName, setCopyrightImageName] = useState('');
  const [bookfileName, setbookfileName] = useState('');
  const [descriptionParagraphs, setDescriptionParagraphs] = useState(['']);


  console.log(data);
  
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
    const formattedDescription = descriptionParagraphs.filter(p => p.trim() !== '').map(p => `<li>${p.trim()}</li>`).join("");
    const formData = new FormData();
    if(bookName !== data.title) formData.append('title', bookName);
    if(formattedDescription !== data.description) formData.append('description', formattedDescription);
    if(bookSeriesId) formData.append('category_id', bookSeriesId);
    if(1 !== data.book_series_id) formData.append('book_series_id', 1);
    if(publishDate !== data.published_at) formData.append('published_at', publishDate);
    if(data.author.id) formData.append('author_id', data.author.id);
    if(bookLanguage !== data.lang) formData.append('lang', bookLanguage);
    if(bookfile) formData.append('file', bookfile);
    if(coverImage) formData.append('cover_image', coverImage);
    if(editionNumber !== data.edition_number) formData.append('edition_number', editionNumber);
    if(publisherName !== data.publisher_name) formData.append('publisher_name', publisherName);
    if(copyrightImage) formData.append('copyright_image', copyrightImage);
    try {
      const auth_token = Cookies.get('auth_token');
      await axios.post(`${backendUrl}/api/books/${data.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(`لقد تم تعديل البيانات`, {
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
              <input
                type="text"
                placeholder="اسم الكتاب"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="دار النشر"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
              />
              <input
                type="text"
                placeholder="لغة الكتاب"
                value={bookLanguage}
                onChange={(e) => setBookLanguage(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="رقم الطبعة"
                value={editionNumber}
                onChange={(e) => setEditionNumber(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="تاريخ النشر"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>
            <div className="form-row">
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setBookSeriesId('');
                }}
              >
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
                <select
                  value={bookSeriesId}
                  onChange={(e) => setBookSeriesId(e.target.value)}
                >
                  <option value="">اختر الفئة الفرعية</option>
                  {categories
                    .find(category => category.id === parseInt(categoryId))
                    ?.categories?.map((subCategory) => (
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
              <div className="custom-file-upload">
                <Image src={upload} alt="ERR404" className='upload' />
                <span>صورة الكتاب</span>
                <input type="file" onChange={(e) => handleFileChange(e, setCoverImage, setCoverImageName)} />
                {coverImageName && <p>{coverImageName}</p>}
              </div>
              <div className="custom-file-upload">
                <Image src={upload} alt="ERR404" className='upload' />
                <span>صورة إثبات ملكية الكتاب</span>
                <input type="file" onChange={(e) => handleFileChange(e, setCopyrightImage, setCopyrightImageName)} />
                {copyrightImageName && <p>{copyrightImageName}</p>}
              </div>
            </div>
            <div className="custom-file-upload">
              <Image src={upload} alt="ERR404" className='upload' />
              <span>ملف الكتاب</span>
              <input type="file" onChange={(e) => handleFileChange(e, setbookfile, setbookfileName)} />
              {bookfileName && <p>{bookfileName}</p>}
            </div>
            <div className="form-row description">
              <div className="paragraph-container" style={{ maxHeight: "200px", width: "100%", overflowY: "auto" }}>
                {descriptionParagraphs.map((para, index) => (
                  <div key={index} className="paragraph-input" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <textarea
                      placeholder="اكتب الفقرة هنا"
                      value={para}
                      onChange={(e) => handleParagraphChange(index, e.target.value)}
                      style={{ flex: 1, resize: 'both' }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}>
                      {index === descriptionParagraphs.length - 1 && (
                        <button type="button" onClick={handleAddParagraph} style={{ marginBottom: "5px", border: 'none' }}>+</button>
                      )}
                      {descriptionParagraphs.length > 1 && (
                        <button type="button" style={{ marginBottom: "5px", border: 'none' }} onClick={() => handleDeleteParagraph(index)}>-</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className='booksubmitbtn'>تحديث</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
