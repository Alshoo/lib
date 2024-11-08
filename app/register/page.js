"use client";

import "./register.css";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import FirstApi from "@/Components/APIs/MainApi";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // const res = await axios.post(`${FirstApi}/register`, {
      const res = await axios.post("https://dipndipapi.mass-fluence.com/api/login", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        password_confirmation: e.target.password_confirmation.value,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if (res.status === 200) {
        toast.success("تم إنشاء الحساب بنجاح!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => router.push("/"),
        });
      } else {
        toast.error("فشل في إنشاء الحساب: " + res.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("حدث خطأ أثناء إنشاء الحساب.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='registerContainer'> 
      <div className="alignPage">
        <form onSubmit={handleRegister}>
          <h6>إنشاء حساب</h6>
          <p>مكتبة غير محدودة من الكتب العربية</p>
          <input name="name" type="text" placeholder="الاسم" required />
          <input name="email" type="email" placeholder="البريد الإلكتروني" required />
          <input name="password" type="password" placeholder="كلمة المرور" required />
          <input name="password_confirmation" type="password" placeholder="تأكيد كلمة المرور" required />
          <button type="submit">إنشاء حساب</button>
          <span onClick={() => router.push("/login")}>تسجيل الدخول</span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
