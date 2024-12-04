"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'; // استيراد التنبيهات
import "./style.css";
import Cookies from "js-cookie";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users`);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users");
        setLoading(false);
        toast.error("حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${backendUrl}/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("تم حذف المستخدم بنجاح");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("فشل حذف المستخدم");
    }
  };

  const addRoleToUser = async (userId, roleId) => {
    const formData = new FormData();
    formData.append('role_id', roleId);

    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');

      const response = await axios.post(`${backendUrl}/api/users/${userId}/roles/add`, formData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("تم إضافة الدور للمستخدم بنجاح");
      } else {
        toast.error('حدث خطأ أثناء المعالجة');
      }
    } catch (error) {
      toast.error("فشل إضافة الدور للمستخدم");
      console.error(error);
    }


  };
  const removeRoleFromUser = async (userId, roleId) => {
    const formData = new FormData();
    formData.append('role_id', roleId);

    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');

      const response = await axios.post(`${backendUrl}/api/users/${userId}/roles/remove`, formData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("تم إزالة الدور من المستخدم بنجاح");
      } else {
        toast.error('حدث خطأ أثناء المعالجة');
      }
    } catch (error) {
      toast.error("فشل إزالة الدور من المستخدم");
      console.error(error);
    }


  };


  


  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <h1>قائمه المستخدمين</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد الالكترونى</th>
            <th>الدور</th>
            <th>تعديل الصلاحيات</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role.length > 0 ? (
                  user.role.map((role) => (
                    <div key={role.id} className="role-item">
                      <span>    {role.name}</span>
                      <button
                        className="remove-role-btn"
                        onClick={() => removeRoleFromUser(user.id, role.id)}
                      >
                         حذف الدور
                      </button>
                    </div>
                  ))
                ) : (
                  "لا توجد أدوار"
                )}
              </td>
       
              <td>
                <select
                  onChange={(e) => addRoleToUser(user.id, e.target.value)}
                >
                  <option value="">اختر دورًا</option>
                  <option value="1">SuperAdmin</option>
                  <option value="2">Editor</option>
                  <option value="3">User</option>
                </select>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
