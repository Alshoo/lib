"use client";

import { createContext, useEffect, useState } from "react";
import axios from "../app/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
      Cookies.set("user", JSON.stringify(data), { expires: 7 });
    } catch (e) {
      console.warn("Error ", e);
    }
  };

  const login = async (data) => {
    setErrors({});
    setLoading(true);

    try {
      // const response = await axios.post("/login", data);
      const response = await axios.post("/api/login", data);
      
      // Set token from response
      const token = response.data.token;
      Cookies.set("auth_token", token, { expires: 7 });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await getUser();

      toast.success("تم تسجيل الدخول بنجاح", {
        duration: 4000,
        position: "top-center",
        style: {
          fontSize: "15px",
        },
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    } catch (e) {
      if (e.response) {
        console.warn(e.response.data);
        setErrors(e.response.data.errors);
        toast.error("خطأ في بيانات تسجيل الدخول");
      } else {
        console.warn(e);
        toast.error("حدث خطأ أثناء محاولة تسجيل الدخول");
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const register = async (data) => {
    setErrors({});
    setLoading(true);

    try {
      // await axios.post("/register", data);
      const response = await axios.post("/api/register", data);
      
      // Set token from response
      const token = response.data.token;
      Cookies.set("auth_token", token, { expires: 7 });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await getUser();

      toast.success("تم التسجيل بنجاح", {
        duration: 4000,
        position: "top-center",
        style: {
          fontSize: "15px",
        },
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (e) {
      if (e.response) {
        console.warn(e.response.data);
        setErrors(e.response.data.errors);
        toast.error("خطأ في عملية التسجيل");
      } else {
        console.warn(e);
        toast.error("حدث خطأ أثناء محاولة التسجيل");
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const logout = async () => {
    try {
      // await axios.post("/api/logout");
      await axios.post("/api/logout");
      
      // Clear token and headers
      Cookies.remove("auth_token");
      delete axios.defaults.headers.common["Authorization"];
      
      setUser(null);
      Cookies.remove("user");
      
      toast.success("تم تسجيل الخروج بنجاح!", {
        duration: 4000,
        position: "top-center",
        style: {
          backgroundColor: "#4CAF50",
          color: "#ffffff",
          fontSize: "15px",
        },
      });
    } catch (e) {
      console.warn(e);
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  useEffect(() => {
    // Initialize auth token on app load
    const token = Cookies.get("auth_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const fetchUser = async () => {
      try {
        await getUser();
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <AuthContext.Provider
        value={{
          errors,
          user,
          login,
          register,
          logout,
          loading,
          status,
          setStatus,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}