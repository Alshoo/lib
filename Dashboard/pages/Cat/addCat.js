"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Category.css";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function AddCat() {
    const [show, setShow] = useState(true);
    
    const handleClose = () => setShow(false);

    const [bookName, setBookName] = useState('');
    
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', bookName);
    
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
    
            const response = await axios.post(`${backendUrl}/api/category-groups/`, formData, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            });
    
            toast.success(`لقد تم انشاء القسم بنجاح`, {
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
                    اضافة قسم
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="اسم القسم"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                            />
                        </div>
        

            
                
                       


                      
                       
                        <button type="submit" className='booksubmitbtn'>إرسال</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
