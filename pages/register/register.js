"use client";
import "./register.css";
import { useState } from 'react';
import useAuthContext from "@/hooks/useAuthContext";
import Link from "next/link";







export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const { register, errors, loading } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    register({ name, email, password, password_confirmation });
  };

  return (
    <div >
    

    <div className="registerContainer">
      <div className="alignPage">
        <form
        method="POST" onSubmit={handleRegister}
        >
          <h6>إنشاء حساب</h6>
          <p>مكتبة غير محدودة من الكتب العربية</p>


         <input
           id="name"
           name="name"
           type="text"
           value={name}
           placeholder="الاسم"
           onChange={(e) => setName(e.target.value)}
         />

       {errors.name && (
         <span className="text-red-400 text-sm">{errors.name[0]}</span>
       )}

         <input
           id="email"
           name="email"
           type="email"
           autoComplete="email"
           value={email}
            placeholder="البريد الإلكتروني"
           onChange={(e) => setEmail(e.target.value)}
         />
       {errors.email && (
         <span 
         style={{
            color: "red",
            fontSize: "12px",
            marginBottom: "5px"
         }}
         >{errors.email[0]}</span>
       )}



         <input
           id="password"
           name="password"
           type="password"
            placeholder="كلمة المرور"
           autoComplete="current-password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
      

         <input
           id="password_confirmation"
           name="password_confirmation"
           type="password"
            placeholder="تأكيد كلمة المرور"
           autoComplete="current-password"
           value={password_confirmation}
           onChange={(e) => setPasswordConfirmation(e.target.value)}
         />
    {errors.password && (
         <span style={{color:"red!important"}}>{errors.password[0]}</span>
       )}
   
            <button
              type="submit"
              disabled={loading}
            >
                إنشاء حساب
            </button>
          <Link href="/login">تسجيل الدخول</Link>
        </form>
      </div>

    </div>

    </div>
  );
}


