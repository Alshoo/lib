"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Category.css";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddSubCat() {
    const [show, setShow] = useState(true);
    
    const handleClose = () => setShow(false);

    const [bookName, setBookName] = useState('');
    
    const [categoryId, setCategoryId] = useState('');
    const [bookSeriesId, setBookSeriesId] = useState('');
    const [categories, setCategories] = useState([]);
    






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

    



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', bookName);
        formData.append('category_group_id', categoryId);
    
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
    
            const response = await axios.post(`${backendUrl}/api/categories/`, formData, {
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
                        {/* {categoryId && (
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
                        )}  */}



                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="اضافه قسم فرعى جديد"
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
