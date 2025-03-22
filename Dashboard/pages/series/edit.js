"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Category.css";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function EditCat({ MainCatId2 }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (MainCatId2) {
      setTitle(MainCatId2.title);
      setDescription(MainCatId2.description);
    }
  }, [MainCatId2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if(image) {
      formData.append('image', image);
    }
    try {
      const auth_token = Cookies.get('auth_token');
      await axios.post(`${backendUrl}/api/book-series/${MainCatId2.id}`, formData, {
        headers: {
          "Authorization": `Bearer ${auth_token}`,
        },
      });
      toast.success(`لقد تم تعديل السلسلة بنجاح`, {
        duration: 4000,
        position: "top-center",
        style: {
          fontSize: "20px",
          width: "50%",
        },
      });
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'خطأ غير معروف';
        toast.error(`خطأ: ${errorMessage}`, {
          duration: 4000,
          position: "top-center",
          style: {
            fontSize: "18px",
            width: "60%",
          },
        });
      } else {
        toast.error('حدث خطأ في الشبكة. حاول مرة أخرى.', {
          duration: 4000,
          position: "top-center",
          style: {
            fontSize: "18px",
            width: "60%",
          },
        });
      }
    }
  };

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          تعديل السلسلة
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <p>السلسلة الحالية : {MainCatId2.title}</p>
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="اسم السلسلة الجديد"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-row">
              <textarea
                placeholder="الوصف"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label htmlFor="image">صورة السلسه:</label>
            <br></br>
            <div className="form-row">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className='booksubmitbtn'>إرسال</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
