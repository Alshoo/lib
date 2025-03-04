"use client";
import "./bookDet.css";
import Image from "next/image";
import defaultBook from "../../public/Images/defaultBook.jpg";
import { useEffect, useState } from "react";
import "../../pages/Famous/famous.css";
import "../../pages/Home/Home.css";
import Link from "next/link";
import download from "../../public/Images/arrow-backup-down-download-save-storage-transfer-1225091.png";
import view from "../../public/Images/unnاamed.png";
import ratings from "../../public/Images/unnamed.png";
import axios from "axios";
import { api } from "@/context/ApiText/APITEXT";

export default function BookDet({ props }) {
  const [activeTab, setActiveTab] = useState("description");
  const [details, setDetails] = useState([]);
  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          `${api}/api/books/${props.params.BookDetails}`
        );
        setDetails(response.data.data);
        setCategory(response.data.data.category);
        setAuthor(response.data.data.author);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `${api}/api/books/${props.params.BookDetails}/download`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${details.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  console.log(details.description);

  return (
    <div>
      <div
        style={{
          boxShadow: "0 4px 46px rgba(0, 0, 0, 0.3)",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="book-section">
            <div className="firstSection">
              <div className="details">
                <div>
                  {details.cover_image ? (
                    <img
                      src={details.cover_image}
                      alt="Book Cover"
                      className="book-cover"
                    />
                  ) : (
                    <Image
                      src={defaultBook}
                      alt="Default Book Cover"
                      className="book-cover"
                    />
                  )}
                </div>
                <div className="info">
                  <h3>{details.title}</h3>
                  <p>
                    <strong>القسم:</strong> {category.name}
                  </p>
                  <p>
                    <strong>المؤلف:</strong> {author.name}
                  </p>
                  <p>
                    <strong>اللغة:</strong> {details.lang}
                  </p>
                  <p>
                    <strong>الصفحات:</strong> {details.number_pages}
                  </p>
                  <p>
                    <strong>رقم الطبعة:</strong> {details.edition_number}
                  </p>
                  <p>
                    <strong>دار النشر:</strong> {details.publisher_name}
                  </p>
                  <p>
                    <strong>حجم الملف:</strong> {details.size} MB
                  </p>
                  <p>
                    <strong>نوع الملف:</strong> {details?.file.split(".")[3]}
                  </p>
                  <p>
                    <strong>تاريخ النشر:</strong>{" "}
                    {details.published_at.split(" ")[2]}
                  </p>
                </div>
              </div>

              <button className="down-button" onClick={downloadFile}>
                تحميل
              </button>
              <Link
                className="view-button"
                href={`${details.file}`}
                target="_blank"
              >
                مشاهده
              </Link>

              <div className="rating">
                <span>{details.downloads_count || 0}</span>
                <span>{details.views_count || 0}</span>
                <span>{details.average_rating || 0}</span>
              </div>
              <div className="ratingIcons">
                <div>
                  <Image src={download} alt="ERR404" />
                </div>
                <div>
                  <Image src={view} alt="ERR404" />
                </div>
                <div>
                  <Image src={ratings} alt="ERR404" />
                </div>
              </div>

              <div className="ratingText">
                <div>
                  <p>التحميلات</p>
                </div>
                <div>
                  <p>المشاهدات</p>
                </div>
                <div>
                  <p>التقييمات</p>
                </div>
              </div>
            </div>

            <div className="sidebar">
              <div className="tab-buttons">
                <p
                  onClick={() => toggleTab("description")}
                  className={activeTab === "description" ? "active" : ""}
                >
                  وصف الكتاب
                </p>
                <p
                  onClick={() => toggleTab("author")}
                  className={activeTab === "author" ? "active" : ""}
                >
                  المؤلف
                </p>
              </div>

              <div className="tab-content">
                {activeTab === "description" && (
                  <ul
                    dangerouslySetInnerHTML={{ __html: details.description }}
                  />
                )}

                {activeTab === "author" && <p>{author.biography}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
