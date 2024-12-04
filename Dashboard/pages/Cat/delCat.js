"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import "./Category.css";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function DelCat() {
    const [show, setShow] = useState(true);
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

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

            await axios.delete(`${backendUrl}/api/category-groups/${categoryId}`, {
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

    return (
        <div>
            <Toaster position="top-center" />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>حذف قسم</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <option value="">اختر القسم المراد حذفه</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="booksubmitbtn">حذف</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
