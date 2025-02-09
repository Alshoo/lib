"use client"
import { api } from '@/context/ApiText/APITEXT';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast'


const backendUrl = api;

export default function AddComment({props}) {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);






    const [Comment, setComment] = useState('');
    const [rating, setRating] = useState(0); 
    const handleRating = (index) => {
      setRating(index);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('content', Comment);
        formData.append('rating', rating);
    
        try {
            // const csrfToken = Cookies.get('XSRF-TOKEN');
            const auth_token = Cookies.get('auth_token');
    
            const response = await axios.post(`${backendUrl}/api/books/${props.params.BookDetails}/comments`, formData, {
                headers: {
                    "Authorization": `Bearer ${auth_token}`,
                    // 'X-XSRF-TOKEN': csrfToken,
                },
                // withCredentials: true,
            });
    
            // console.log('نجاح:', response.data);
            toast.success(`تم نشر تعليقك بنجاح`, {
                duration: 4000,
                position: "top-center",
                style: {
                  fontSize: "20px",
                  width: "50%",
                },
              });
            handleClose();
        } catch (error) {
            console.error('خطأ:', error);
            toast.error('خطأ فى تسجيل البيانات');

        }
    };





  return (
    <div>
                        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    اضافة تعليق
                </Modal.Header>
                <Modal.Body>
                

                <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="التعليق"
                                value={Comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                   
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <span
                            key={index}
                            onClick={() => handleRating(index)}
                            style={{
                                fontSize: '2rem',
                                color: index <= rating ? '#4E342E' : '#C0C0C0',
                                cursor: 'pointer',
                            }}
                            >
                            ★
                            </span>
                        ))}
                        <p style={{ margin: '15px' }}>{rating} من 5</p>
                    </div>

                        <button type="submit" className='booksubmitbtn'>إرسال</button>
                    </form>


                </Modal.Body>
            </Modal>
    </div>
  )
}
