"use client";
import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import Link from "next/link";
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors, loading } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div>
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
            type="password"
            placeholder="كلمة المرور"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.email && <span className="error-message">{errors.email[0]}</span>}
          {errors.password && <span className="error-message">{errors.password[0]}</span>}

          <button type="submit" disabled={loading}>
            <span>تسجيل الدخول</span>
          </button>

          <Link href="/register">إنشاء حساب جديد</Link>
        </form>
      </div>
    </div>
  );
}
