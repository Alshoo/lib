"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import arrow from "../../public/images/arfegrow.png";
import arrow2 from "../../public/images/vectogfr-2.png";
import "./style.css";

export default function MainPage() {



    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
      setOpenSection(openSection === section ? null : section);
    };

  return (
    <div>
      

      <div className="Breadcrumb">
            <Link href="/">الرئيسية</Link>
            <Image src={arrow} alt='ERR404'/>
            <Link href="">اقسام الكتب</Link>
        </div>

        
        <div className="main-container">

      <input type="text" placeholder="البحث عن قسم" className="search-input" />

      <div className="dropdown-section">
        <div className="dropdown-header" onClick={() => toggleSection('history')}>
          <span>التاريخ</span>      
                <Image src={arrow2} alt='ERR404' className={`arrow-icon ${openSection === 'history' ? 'rotate' : ''}`}/>
        </div>
        {openSection === 'history' && (
          <div className="dropdown-content">
            <div className="dropdown-item">التاريخ الإسلامي</div>
            <div className="dropdown-item">التاريخ النبائي</div>
            <div className="dropdown-item">التاريخ التركي والمغولي</div>
            <div className="dropdown-item">التاريخ الروماني</div>
            <div className="dropdown-item">التاريخ الأوروبي</div>
          </div>
        )}
      </div>

      <div className="dropdown-section">
        <div className="dropdown-header" onClick={() => toggleSection('literature')}>
          <span>الأدب</span>
          <Image src={arrow2} alt='ERR404' className={`arrow-icon ${openSection === 'history' ? 'rotate' : ''}`}/>
        </div>
        {openSection === 'literature' && (
          <div className="dropdown-content">
            <div className="dropdown-item">الأدب الجاهلي</div>
            <div className="dropdown-item">الأدب العباسي</div>
            <div className="dropdown-item">الأدب الحديث</div>
          </div>
        )}
      </div>

      <div className="dropdown-section">
        <div className="dropdown-header" onClick={() => toggleSection('philosophy')}>
          <span>الفلسفة</span>
          <Image src={arrow2} alt='ERR404' className={`arrow-icon ${openSection === 'history' ? 'rotate' : ''}`}/>
        </div>
        {openSection === 'philosophy' && (
          <div className="dropdown-content">
            <div className="dropdown-item">فلسفة قديمة</div>
            <div className="dropdown-item">فلسفة حديثة</div>
          </div>
        )}
      </div>
    </div>



    </div>
  )
}
