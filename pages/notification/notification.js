"use client";
import "./style.css";

import "../Home/Home.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import defaultPortifolio from "../../public/Images/defaultPortifolio.jpeg";
import arrow from "../../public/Images/arfegrow.png";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
      if (user) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/user`
        );
        setNotifications(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/read/${notificationId}`,
        {},
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
        toast.success("تم التمييز على انها مقرؤه ");
      } else {
        toast.error("فشل في قراءة الإشعار");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء قراءة الإشعار");
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div>
        <div className="Breadcrumb">
          <Link href="/">الرئيسية</Link>
          <Image src={arrow} alt="ERR404" />
          <p>الإشعارات</p>
        </div>
        <br></br>
        <br></br>
        <div className="notificationsPageContainer">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : notifications ? (
            <div className="notificationsList">
              {notifications.map((notification) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={notification.id}
                  className="notificationCard"
                  style={{cursor:"pointer"}}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notificationContent">
                    <Image
                      src={defaultPortifolio}
                      alt="Notification Icon"
                      className="notificationIcon"
                    />
                    <div>
                      <h6>{notification.type}</h6>
                      <p>{notification.data.message}</p>
                    </div>
                  </div>
                  <p className="notificationTime">{notification.created_at}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-data-message">لا توجد إشعارات حاليا</div>
          )}
        </div>
      </div>
    </>
  );
}
