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

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
      if (user) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications?user_id=${user.id}`
        );
        setNotifications(response.data.notifications);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


  return (
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
        ) : notifications.length > 0 ? (
          <div className="notificationsList">
            {notifications.map((notification) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={notification.id}
                className="notificationCard"
              >
                <div className="notificationContent">
                  <Image
                    src={defaultPortifolio}
                    alt="Notification Icon"
                    className="notificationIcon"
                  />
                  <div>
                    <h6>{notification.title}</h6>
                    <p>{notification.message}</p>
                  </div>
                </div>
                <p className="notificationTime">{notification.created_at}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-data-message">لا توجد إشعارات حاليا</div>
        )}
        <div className="notificationsList">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="notificationCard"
        >
          <div className="notificationContent">
            <Image
              src={defaultPortifolio}
              alt="Notification Icon"
              className="notificationIcon"
            />
            <div>
              <h6>notification.title</h6>
              <p>notification.message</p>
            </div>
          </div>
          <p className="notificationTime">notification.created_at</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="notificationCard"
        >
          <div className="notificationContent">
            <Image
              src={defaultPortifolio}
              alt="Notification Icon"
              className="notificationIcon"
            />
            <div>
              <h6>notification.title</h6>
              <p>notification.message</p>
            </div>
          </div>
          <p className="notificationTime">notification.created_at</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="notificationCard"
        >
          <div className="notificationContent">
            <Image
              src={defaultPortifolio}
              alt="Notification Icon"
              className="notificationIcon"
            />
            <div>
              <h6>notification.title</h6>
              <p>notification.message</p>
            </div>
          </div>
          <p className="notificationTime">notification.created_at</p>
        </motion.div>
        </div>
 
      </div>
    </div>
  )
}
