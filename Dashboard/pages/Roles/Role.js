"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import "./style.css";
import { api } from "@/context/ApiText/APITEXT";

const backendUrl = api;

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role_level: "", 
    permissions: [],
  });
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const auth_token = Cookies.get("auth_token");
      const response = await axios.get(`${backendUrl}/api/roles/`, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      setRoles(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const auth_token = Cookies.get("auth_token");
      const response = await axios.get(`${backendUrl}/api/permissions/`, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      setAvailablePermissions(response.data.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleCheckboxChange = (e, permissionId) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, permissionId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((id) => id !== permissionId),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataPayload = {
      name: formData.name,
      description: formData.description,
      role_level: parseInt(formData.role_level, 10),
      permission_ids: formData.permissions,
    };

    try {
      const auth_token = Cookies.get("auth_token");

      if (editMode) {
        const response = await axios.post(
          `${backendUrl}/api/roles/${currentRoleId}`,
          formDataPayload,
          { headers: { Authorization: `Bearer ${auth_token}` } }
        );

        if (response.status === 200) {
          const updatedRoles = roles.map((role) =>
            role.id === currentRoleId ? response.data.data : role
          );
          setRoles(updatedRoles);
          toast.success("تم تعديل الدور بنجاح");
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/roles/`,
          formDataPayload,
          {
            headers: { Authorization: `Bearer ${auth_token}` },
          }
        );
        setRoles([...roles, response.data.data]);
        toast.success("تمت إضافة الدور بنجاح");
      }

      setIsFormVisible(false);
      setEditMode(false);
      setCurrentRoleId(null);
      setFormData({
        name: "",
        description: "",
        role_level: "",
        permissions: [],
      });
    } catch (error) {
      toast.error("حدث خطأ أثناء العملية");
      console.error(error);
    }
  };

  const handleDelete = async (roleId) => {
    try {
      const auth_token = Cookies.get("auth_token");
      await axios.delete(`${backendUrl}/api/roles/${roleId}`, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      const updatedRoles = roles.filter((role) => role.id !== roleId);
      setRoles(updatedRoles);
      toast.success("تم حذف الدور بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
      console.error(error);
    }
  };

  const handleEdit = (role) => {
    setFormData({
      name: role.name,
      description: role.description || "",
      role_level: role.role_level.toString(),
      permissions: role.permissions || [],
    });
    setEditMode(true);
    setCurrentRoleId(role.id);
    setIsFormVisible(true);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="roles-container">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <h1 className="page-title">إدارة الأدوار</h1>

      <button
        onClick={() => {
          setIsFormVisible(!isFormVisible);
          if (!isFormVisible) {
            setEditMode(false);
            setCurrentRoleId(null);
            setFormData({
              name: "",
              description: "",
              role_level: "",
              permissions: [],
            });
          }
        }}
        className="add-role-btn"
      >
        {isFormVisible ? "إغلاق النموذج" : "إضافة دور"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="role-form">
          <div className="form-group">
            <label>اسم الدور</label>
            <input
              type="text"
              placeholder="اسم الدور"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>الوصف (اختياري)</label>
            <input
              type="text"
              placeholder="الوصف"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>مستوى الدور</label>
            <input
              type="number"
              placeholder="مستوى الدور"
              value={formData.role_level}
              onChange={(e) =>
                setFormData({ ...formData, role_level: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group permissions-container">
            <p>اختر الصلاحيات:</p>
            <div className="checkbox-group">
              {availablePermissions.map((permission) => (
                <div>
                  <input
                    type="checkbox"
                    value={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onChange={(e) => handleCheckboxChange(e, permission.id)}
                  />
                  <label key={permission.id} className="permission-label">
                    <p>{permission.name}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <br></br>
          <button type="submit" className="submit-btn">
            {editMode ? "تحديث" : "حفظ"}
          </button>
        </form>
      )}

      <div className="table-container">
        <table className="roles-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الوصف</th>
              <th>المستوى</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description || "لا يوجد وصف"}</td>
                <td>{role.role_level}</td>
                <td>
                  <div className="BtnCont3">
                  <button onClick={() => handleEdit(role)} className="edit-btn">
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="delete-btn"
                  >
                    حذف
                  </button>
                  </div>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
