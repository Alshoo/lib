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
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { api } from "@/context/ApiText/APITEXT";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
      if (user) {
        const auth_token = Cookies.get("auth_token");
        const response = await axios.get(`${api}/api/notifications/user`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
        if (response.data.data && response.data.data.length) {
          setNotifications(response.data.data);
        } else {
          setNotifications([]);
        }

        const readResponse = await axios.get(
          `${api}/api/notifications/user/read`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        if (readResponse.data.data && readResponse.data.data.length) {
          setReadNotifications(readResponse.data.data);
        } else {
          setReadNotifications([]);
        }
      } else {
        setNotifications([]);
        setReadNotifications([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const response = await axios.post(
        `${api}/api/notifications/read/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
        setReadNotifications((prevReadNotifications) => [
          ...prevReadNotifications,
          notifications.find(
            (notification) => notification.id === notificationId
          ),
        ]);
      } else {
        toast.error("فشل في قراءة الإشعار");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء قراءة الإشعار");
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = (notificationId) => {
    toast(
      (t) => (
        <div>
          <p>هل أنت متأكد أنك تريد حذف هذا الإشعار؟</p>
          <button
            className="confirm-button"
            onClick={async () => {
              try {
                const response = await axios.delete(
                  `${api}/api/notifications/${notificationId}`,
                  {
                    headers: {
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
                    },
                  }
                );

                if (response.status === 200) {
                  setNotifications((prevNotifications) =>
                    prevNotifications.filter(
                      (notification) => notification.id !== notificationId
                    )
                  );
                  setReadNotifications((prevNotifications) =>
                    prevNotifications.filter(
                      (notification) => notification.id !== notificationId
                    )
                  );
                  toast.success("تم حذف الإشعار");
                } else {
                  toast.error("فشل في حذف الإشعار");
                }
              } catch (error) {
                toast.error("حدث خطأ أثناء حذف الإشعار");
                console.error("Error deleting notification:", error);
              }
              toast.dismiss(t.id);
            }}
          >
            نعم
          </button>
          <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>
            لا
          </button>
        </div>
      ),
      { duration: 4000 }
    );
  };

  const deleteAllNotifications = () => {
    toast(
      (t) => (
        <div>
          <p>هل أنت متأكد أنك تريد حذف جميع الإشعارات؟</p>
          <button
            className="confirm-button"
            onClick={async () => {
              try {
                const response = await axios.delete(
                  `${api}/api/notifications/delete-all`,
                  {
                    headers: {
                      Authorization: `Bearer ${Cookies.get("auth_token")}`,
                    },
                  }
                );

                if (response.status === 200) {
                  setNotifications([]);
                  setReadNotifications([]);
                  toast.success("تم حذف جميع الإشعارات");
                } else {
                  toast.error("فشل في حذف جميع الإشعارات");
                }
              } catch (error) {
                toast.error("حدث خطأ أثناء حذف جميع الإشعارات");
                console.error("Error deleting all notifications:", error);
              }
              toast.dismiss(t.id);
            }}
          >
            نعم
          </button>
          <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>
            لا
          </button>
        </div>
      ),
      { duration: 4000 }
    );
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const handleNotificationAction = (action) => {
    if (action === "markAsRead") {
      markAsRead(selectedNotification.id);
      handleCloseModal();
    } else if (action === "delete") {
      deleteNotification(selectedNotification.id);
      handleCloseModal();
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{minHeight:"50vh"}}>
      <div>
        {/* <div className="Breadcrumb">
          <Link href="/">الرئيسية</Link>
          <Image src={arrow} alt="ERR404" />
          <p>الإشعارات</p>
        </div> */}

        <br />
        <br />
        <div className="notificationsPageContainer">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div>
              {notifications.length > 0 || readNotifications.length > 0 ? (
                <>
                  {notifications.length > 0 || readNotifications.length > 0 ? (
                    <button
                      className="actionButton"
                      onClick={deleteAllNotifications}
                    >
                      حذف جميع الإشعارات
                    </button>
                  ) : null}
                  <br />
                  <br />
                  {notifications.length > 0 && (
                    <div>
                      <h1 className="title">غير المقروءة</h1>
                      <br />
                      <div className="notificationsList">
                        {notifications.map((notification) => (
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            key={notification.id}
                            className="notificationCard"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <div className="notificationContent">
                              <div>
                                {/* <h6>{notification.type}</h6> */}
                                <p>{notification.data.message}</p>
                              </div>
                            </div>
                            <p className="notificationTime">
                              {notification.created_at}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  <br />
                  <br />
                  {readNotifications.length > 0 && (
                    <div>
                      <h1 className="title">المقروءة</h1>
                      <br />
                      <div className="notificationsList">
                        {readNotifications.map((notification) => (
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            key={notification.id}
                            className="notificationCard"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <div className="notificationContent">
                              <div>
                                {/* <h6>{notification.type}</h6> */}
                                <p>{notification.data.message}</p>
                              </div>
                            </div>
                            <p className="notificationTime">
                              {notification.created_at}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-data-message" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>لا توجد إشعارات حالياً</div>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>{selectedNotification?.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedNotification?.data.message}</p>
            <p>{selectedNotification?.created_at}</p>
          </Modal.Body>
          <Modal.Footer className="modal-footer-buttons">
            <button className="close-button" onClick={handleCloseModal}>
              إغلاق
            </button>
            {notifications.includes(selectedNotification) && (
              <>
                <button
                  className="cos-button"
                  onClick={() => handleNotificationAction("markAsRead")}
                >
                  تمييز كـ مقروء
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleNotificationAction("delete")}
                >
                  حذف
                </button>
              </>
            )}
            {readNotifications.includes(selectedNotification) && (
              <button
                className="delete-button"
                onClick={() => handleNotificationAction("delete")}
              >
                حذف
              </button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
