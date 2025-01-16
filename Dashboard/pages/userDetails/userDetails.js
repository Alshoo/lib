"use client";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import defaultPortifolio from "../../../public/Images/defaultPortifolio.jpeg";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = Cookies.get("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData({
          name: parsedUser.name,
          email: parsedUser.email,
          password: "",
          image: null,
        });
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      toast.error("بيانات المستخدم غير متوفرة");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    if (formData.password) {
      formDataToSend.append("password", formData.password);
    }
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');
      console.log("CSRF Token:", csrfToken);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.id}`,
        formDataToSend,
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("تم تحديث بيانات المستخدم بنجاح");
        Cookies.remove("user"); 
        Cookies.remove("laravel_session"); 
        Cookies.remove("XSRF-TOKEN"); 
        router.push("/login");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("حدث خطأ أثناء تحديث بيانات المستخدم");
    }
  };

  if (!user) {
    return <div>جارٍ تحميل بيانات المستخدم...</div>;
  }

  return (
    <div className="user-details-container mt-3">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <h1>تفاصيل المستخدم</h1>
      <form onSubmit={handleSubmit} className="user-details-form">
        <div className="form-group">
          <label>الاسم:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>كلمة المرور:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="اتركه فارغًا إذا كنت لا تريد تغييره"
          />
        </div>
        <div className="form-group">
          <label>الصورة:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
          {user.image && (
            <Image
              src={user.image || defaultPortifolio}
              alt="صورة المستخدم"
              width={100}
              height={100}
            />
          )}
        </div>
        <button type="submit" className="submit-button">
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}