'use client'
import { useState } from "react";
import "./about.css";

export default function About() {
  const sections = [
    {
      title: "عن المكتبة",
      content: `"المكتبة الأندلسية" هي أكبر منصة عربية مفتوحة لمشاركة الكتب الإلكترونية والورقية .

تهدف المكتبة إلى إثراء المحتوى العربي على الإنترنت وتسهيل نشر الكتب للمؤلفين دون تكاليف كبيرة. يمكن للقراء اختيار الكتب المناسبة في مجالات متنوعة من خلال مراجعات واقتباسات الكتب وآراء المستخدمين. يمكن للقراء الاطلاع على معلومات الكتب وتقديم تقييماتهم ومراجعاتهم. أما بالنسبة للكتب المحمية بحقوق النشر، فيتم إضافتها أيضًا إلى قاعدة البيانات، ولكن لا يمكن تحميلها. يتم توفير معلومات عنها كغلاف وعنوان ووصف للتقييم والمراجعة من قبل القراء حول العالم، ما لم يُتاح تحميلها من قبل المؤلف نفسه.`
    },
    {
      title: "رؤية المكتبة",
      content: `رؤية "المكتبة الاندلسية" هي أن تصبح أكبر مجتمع عربي للمهتمين بالقراءة والكتابة والتأليف، سواءً في الكتب الورقية أو الإلكترونية.`
    }
  ];
  
  const [activeIndices, setActiveIndices] = useState([0]);
  
  const toggleSection = (index) => {
    if(index === 0) return;
    if(activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter(i => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className="AboutContainer">
      <h1 className="AboutTitle">عن مكتبة نور</h1>
      <div className="Accordion">
        {sections.map((section, index) => (
          <div key={index} className="AccordionItem">
            <button className="AccordionTitle" onClick={() => toggleSection(index)}>
              <span>{section.title}</span>
              <span className={`AccordionIcon ${activeIndices.includes(index) ? "open" : ""}`}>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <div className={`AccordionContent ${activeIndices.includes(index) ? "open" : ""}`}>
              {section.content.split("\n").map((line, i) => (
                <p key={i}>{line.trim()}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
