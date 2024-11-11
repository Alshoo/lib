"use client"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Author.css";
import Image from 'next/image';
import upload from "../../public/Images/vechgfhor.png";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddBook({ AuthorID }) {
    
 
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);




    
    const [authorName, setAuthorName] = useState('');
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
    const [description, setDescription] = useState('');
 


    const handleFileChange = (e, setFile, setFileName) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file?.name || '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', bookName);
        formData.append('description', description);
        formData.append('category_id', 1);
        formData.append('book_series_id', 1);
        formData.append('published_at', publishDate);
        formData.append('author_id', AuthorID);
        formData.append('lang', bookLanguage);
        formData.append('file', bookfile);
        formData.append('cover_image', coverImage);
        formData.append('edition_number', 1);
        formData.append('publisher_name', publisherName);
        formData.append('copyright_image', copyrightImage);
    
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
    
            const response = await axios.post(`${backendUrl}/api/books/`, formData, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            });
    
            // console.log('نجاح:', response.data);
            toast.success(`لقد تم انشاء الكتاب بنجاح`, {
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
                    اضافة كتاب
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
                                type="date"
                                placeholder="تاريخ النشر"
                                value={publishDate}
                                onChange={(e) => setPublishDate(e.target.value)}
                            />
                        </div>
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
                            <textarea
                                placeholder="وصف الكتاب"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className='booksubmitbtn'>إرسال</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
