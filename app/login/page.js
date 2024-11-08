"use client";

import './login.css';
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import Cookies from "js-cookie";
// import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const res = await signIn("credentials", {
  //     redirect: false,
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   });

  //   if (res && !res.error ) {

  //     Cookies.set("authToken", res.token, { expires: 7 });

  //     toast.success(res.message, {
  //       position: "top-center",
  //       autoClose: 2000,
  //       onClose: () => router.push("/"), 
  //     });
  //   } else {
  //     const errorMessage = res?.errors || "فشل في تسجيل الدخول: Invalid credentials.";
  //     toast.error(errorMessage, {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  return (
    <div className='loginContainer'> 
      <form
      //  onSubmit={handleLogin}
       >
        <h6>تسجيل الدخول</h6>
        <p>مكتبة غير محدودة من الكتب العربية</p>
        <input name="email" type="email" placeholder="البريد الإلكتروني" required />
        <input name="password" type="password" placeholder="كلمة المرور" required />
        <button type="submit">تسجيل الدخول</button>
        <span onClick={() => router.push("/register")}>إنشاء حساب جديد</span>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
}
