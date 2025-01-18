"use client"
import './Footer.css'
import FaceBook from '../../public/Images/facebook-02.png'
import Insta from '../../public/Images/instagram.png'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '@/context/ApiText/APITEXT'

export default function Footer() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${api}/api/category-groups/`
        )
        setCategories(response.data.data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div style={{ paddingTop: '2vh' }}>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="logo">Logo</div>
            <p className="description">
              أكبر منصة تواصل عربية مفتوحة لمشاركة الكتب الالكترونية والورقية، تسعى إلى إحداث أثر كبير في عالم المعرفة وإثراء المحتوى العربي على الانترنت والتسهيل على المؤلفين نشر الكتب وتفادي التكاليف الكبيرة للنشر والتسهيل على القراء اختيار الكتاب المناسب في أي مجال عن طريق عرض مراجعات واقتباسات للكتب و آراء المستخدمين في كل كتاب.
            </p>
          </div>

          <div className="footer-right">
            <div className="footer-section">
              <h4>الصفحات</h4>
              <ul>
                <li><Link href="/Authors">المؤلفين</Link></li>
                <li><Link href="/RecentBook">احدث الكتب</Link></li>
                <li><Link href="/FamousBook">اشهر الكتب</Link></li>
                <li><Link href="/HighBook">الاعلي تقييما</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>المجموعات</h4>
              <ul>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/BookLists`}>
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>لا توجد مجموعات</li>
                )}
              </ul>
            </div>

            <div className="footer-section">
              <h4>الاقسام</h4>
              <ul>
                {categories.length > 0 ? (
                  categories[0].categories.map((subCategory) => (
                    <li key={subCategory.id}>
                      <Link href={`/BookLists/${categories[0].name} ?${subCategory.name}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>لا توجد أقسام</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className='lastFooterSec'>
          <div className='lastFooterLink'>
            <Link href="/About">عنا</Link>
            <Link href="/Terms">اتفاقيه الاستخدام</Link>
            <Link href="/policy">السياسه الخصوصيه</Link>
          </div>

          <div className='socialIcn'>
            <Link href='#'>
              <Image alt='ERR404' src={FaceBook} />
            </Link>
            <Link href='#'>
              <Image alt='ERR404' src={Insta} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
