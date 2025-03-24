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

export default function EditAuthor({data}) {

    const [show, setShow] = useState(true); 
    
    const handleClose = () => setShow(false);

    const [bookName, setBookName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
    const [publishDate, setPublishDate] = useState(data.date);
    const [coverImage, setCoverImage] = useState('');
    
    const [coverImageName, setCoverImageName] = useState('');

    const handleFileChange = (e, setFile, setFileName) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file?.name || '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', bookName);
        formData.append('biography', description);
        formData.append('birthdate', publishDate);
        formData.append('image', coverImage);
    
        try {
            const auth_token = Cookies.get('auth_token');
    
            const response = await axios.post(`${backendUrl}/api/author-requests/${data.id}/update/`, formData, {
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                },
            });
    
            toast.success(`لقد تم تحديث بيانات المؤلف بنجاح`, {
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
           <div>
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    تعديل فى البيانات
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="اسم المؤلف"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                            />
                        </div>
                  
                        <div className="form-row description">
                            <textarea
                                placeholder="السيره الذاتية"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="تاريخ الميلاد"
                                value={publishDate}
                                onChange={(e) => setPublishDate( e.target.value )}
                            />
                        </div>
                
                       


                        <div className="form-row">
                            <div className="custom-file-upload">
                                <Image src={upload} alt="ERR404" className='upload' />
                                <span>صورة المؤلف </span>
                                <input type="file" 
                                onChange={(e) => handleFileChange(e, setCoverImage, setCoverImageName)} />
                                {coverImageName && <p>{coverImageName}</p>}
                                <img src={data.image} alt='ERR404' width={100} height={100}/>
                            </div>
                        </div>
                      
                       
                        <button type="submit" className='booksubmitbtn'>التحديث</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    </div>
  )
}
