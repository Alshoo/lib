"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Category.css";
import axios from 'axios'; 
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/context/ApiText/APITEXT';

const backendUrl = api;

export default function DelSubCat() {
    const [show, setShow] = useState(true);
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [bookSeriesId, setBookSeriesId] = useState('');


    const handleClose = () => setShow(false);

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
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');

            await axios.delete(`${backendUrl}/api/categories/${bookSeriesId}`, {
                headers: { 'X-XSRF-TOKEN': csrfToken },
                withCredentials: true,
            });

            toast.success(`تم حذف القسم بنجاح`, {
                duration: 4000,
                position: "top-center",
                style: { fontSize: "20px", width: "50%" },
            });

            setCategories(categories.filter((category) => category.id !== categoryId));
            setCategoryId('');
            handleClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء الحذف';
            toast.error(`خطأ: ${errorMessage}`, {
                duration: 4000,
                position: "top-center",
                style: { fontSize: "18px", width: "60%" },
            });
        }
    };
    


    console.log(bookSeriesId);
    console.log(bookSeriesId);
    
    return (
        <div>
            <Toaster position="top-center" />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> حذف قسم فرعى</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <option value="">اختر القسم الرئيسى </option>
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
                                    <option value="">اختر الفئة الفرعية المراد حذفها</option>
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


                        <button type="submit" className="booksubmitbtn">حذف</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
