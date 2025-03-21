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
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        role_level: "",
    });
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentRoleId, setCurrentRoleId] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, []); 

    const fetchRoles = async () => {
        try {
            const auth_token = Cookies.get('auth_token');
            const response = await axios.get(`${backendUrl}/api/roles/`,{
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                }
            });
            setRoles(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching roles:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataPayload = {
            name: formData.name,
            description: formData.description,
            role_level: parseInt(formData.role_level, 10),
            permission_ids: [1,2,3],
        };

        try {
            const auth_token = Cookies.get("auth_token");

            if (editMode) {
                const response = await axios.post(`${backendUrl}/api/roles/${currentRoleId}`, formDataPayload, {
                    headers: {
                        "Authorization": `Bearer ${auth_token}`,
                    },
                });

                if (response.status === 200) {
                    const updatedRoles = roles.map((role) => (role.id === currentRoleId ? response.data.data : role));
                    setRoles(updatedRoles);
                    toast.success("تم تعديل الدور بنجاح");
                }
            } else {
                const response = await axios.post(`${backendUrl}/api/roles/`, formDataPayload, {
                    headers: {
                        "Authorization": `Bearer ${auth_token}`,
                    },
                });

                
                    setRoles([...roles, response.data.data]);
                toast.success("تمت إضافة الدور بنجاح");
            }

            setIsFormVisible(false);
            setEditMode(false);
            setCurrentRoleId(null);
            setFormData({ name: "", description: "", role_level: "" });
        } catch (error) {
            toast.error("حدث خطأ أثناء العملية");
            console.error(error);
        }
    };

    const handleDelete = async (roleId) => {
        try {
            const auth_token = Cookies.get("auth_token");

            const response = await axios.delete(`${backendUrl}/api/roles/${roleId}`, {
                headers: {
                    "Authorization": `Bearer ${auth_token}`,
                },
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
            <h1>إدارة الأدوار</h1>

            <button
                onClick={() => {
                    setIsFormVisible(!isFormVisible);
                    if (!isFormVisible) {
                        setEditMode(false);
                        setCurrentRoleId(null);
                        setFormData({ name: "", description: "", role_level: "" });
                    }
                }}
                className="add-role-btn"
            >
                {isFormVisible ? "إغلاق النموذج" : "إضافة دور"}
            </button>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="role-form">
                    <input
                        type="text"
                        placeholder="اسم الدور"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="الوصف (اختياري)"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="مستوى الدور"
                        value={formData.role_level}
                        onChange={(e) => setFormData({ ...formData, role_level: e.target.value })}
                        required
                    />
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
                                <button onClick={() => handleEdit(role)} className="edit-btn">
                                    تعديل
                                </button>
                                <button onClick={() => handleDelete(role.id)} className="delete-btn">
                                    حذف
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
           
        </div>
    );
}