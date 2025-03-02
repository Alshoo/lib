"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Category.css";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function EditCat({MainCatId2}) {
    const [show, setShow] = useState(true);
    
    const handleClose = () => setShow(false);

    const [bookName, setBookName] = useState('');
    




    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const Raw = {
            name: bookName,
        }
    
        try {
            const auth_token = Cookies.get('auth_token');
    
            const response = await axios.put(`${backendUrl}/api/category-groups/${MainCatId2.id}`, Raw, {
                headers: {
                    "Authorization": `Bearer ${auth_token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            toast.success(`لقد تم تعديل اسم القسم بنجاح`, {
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
                    تعديل اسم القسم
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>

                    <div className="form-row">
                        <p> اسم القسم الحالى : {MainCatId2.name}</p>
                        
                            {/* <select
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
                            </select> */}
                        </div>
               



                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="اسم القسم الجديد"
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
