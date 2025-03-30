"use client";
import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import Link from "next/link";
import "./login.css";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, errors, loading } = useAuthContext();

  const handleLogin = async (e) => { 
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("من فضلك أكمل جميع الحقول.");
      return; 
    }
    login({ email, password });
  };

  return (
    <div>            
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className='loginContainer'>
        <form method="POST" onSubmit={handleLogin}>
          <h6>تسجيل الدخول</h6>
          <p>مكتبة غير محدودة من الكتب العربية</p>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="showPasswordContainer">
            <input 
              type="checkbox" 
              id="showPassword" 
              checked={showPassword} 
              onChange={(e) => setShowPassword(e.target.checked)} 
            />
            <label htmlFor="showPassword" className="showPasswordTxt">عرض كلمه المرور</label>
          </div>

          {errors?.email && (
            <span style={{ color: "red", fontSize: "12px", marginBottom: "5px" }}>
              {errors.email[0]}
            </span>
          )}

          {errors?.password && (
            <span style={{ color: "red", fontSize: "12px", marginBottom: "5px" }}>
              {errors.password[0]}
            </span>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          <Link href="/register">إنشاء حساب جديد</Link>
        </form>
      </div>
    </div>
  );
}
