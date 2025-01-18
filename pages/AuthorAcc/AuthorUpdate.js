"use client"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Author.css";
import Image from 'next/image';
import upload from "../../public/Images/vechgfhor.png";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function AuthorUpdate({ AuthorID ,AuthorName,AuthorBiography,profile_image}) {
    
 
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);




    
    const [authorName, setAuthorName] = useState(AuthorName);
    const [description, setDescription] = useState(AuthorBiography);
    const [publishDate, setPublishDate] = useState('');
    const [coverImage, setCoverImage] = useState(null);



    const [coverImageName, setCoverImageName] = useState('');
 


    const handleFileChange = (e, setFile, setFileName) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file?.name || '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', authorName);
        formData.append('biography', description);
        formData.append('birthdate', publishDate);
        formData.append('image', coverImage);
    
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
    
            const response = await axios.post(
                `${backendUrl}/api/author-requests/${AuthorID}/update/`, formData, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            });
    
            // console.log('نجاح:', response.data);
            toast.success(`لقد تم تحديث البيانات بنجاح`, {
                duration: 4000,
                position: "top-center",
                style: {
                  fontSize: "20px",
                  width: "50%",
                },
              });
            handleClose();
        } catch (error) {
            // console.error('خطأ:', error);
            toast.error('خطأ فى تسجيل البيانات');

        }
    };
    

    return (
        <div>
                  <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    تعديل بيانات الكاتب
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="اسم المؤلف"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="الوصف "
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                       
                        <div className="form-row">
                            <input
                                type="date"
                                placeholder="تاريخ الميلاد"
                                value={publishDate}
                                onChange={(e) => setPublishDate(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <div className="custom-file-upload">
                                <Image src={upload} alt="ERR404" className='upload' />
                                <span>صورة الكاتب</span>
                                <input type="file" onChange={(e) => handleFileChange(e, setCoverImage, setCoverImageName)} />
                                {coverImageName && <p>{coverImageName}</p>}
                            </div>
                        </div>
                       
                       
                        <button type="submit" className='booksubmitbtn'>إرسال</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
