"use client";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { api } from "@/context/ApiText/APITEXT";

const backendUrl = api;

export default function NotiPage() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendNotification = async () => {
    if (!message.trim()) {
      toast.error("يجب إدخال رسالة للإشعار");
      return;
    }

    setIsSending(true);

    const formData = new FormData();
    formData.append("message", message);

    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');
      const response = await axios.post(
        `${backendUrl}/api/notifications/send/all`,
        formData,
        {
            headers: {
              'X-XSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
          })
 
      if (response?.status === 200) {
        toast.success("تم إرسال الإشعار بنجاح");
        setMessage("");
      } else {
        toast.error("فشل في إرسال الإشعار");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الإشعار");
    } finally {
      setIsSending(false);
    }
  };




  const [loading, setLoading] = useState(true);
      setTimeout(() => {
        setLoading(false);
      }, 1001); 
    if (loading) {
      return (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      );
    }
  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <br></br>
      <h1 className="title">إرسال إشعار للكل</h1>
      <br></br>
      <div className="form-container">
        <textarea
          className="message-input"
          placeholder="اكتب رسالة الإشعار هنا..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className={`send-btn ${isSending ? "disabled" : ""}`}
          onClick={handleSendNotification}
          disabled={isSending}
        >
          {isSending ? "جاري الإرسال..." : "إرسال إشعار"}
        </button>
      </div>
    </div>
  );
}
