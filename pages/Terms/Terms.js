"use client";
import { useState } from "react";
import "./Terms.css";

export default function About() {
  const sections = [
    {
      title: "الشروط العامة",
      content:
        "متابعينا وزوارنا الكرام في موقع المكتبة الاندلسية نتشرف ونسعد دائما بزيارتكم ونتمنى أن نكون على قدر المستوى الذي يلبي بعض احتياجاتكم. ما نقدمه من خدمات مجانية هو متاح للجميع للاستخدام والنقل مع مراعاة هذه الشروط التي لا نسامح من خالفها ولم يلتزم بها.\n\nأولا عدم استخدام ما نقدم في أي شيء يخالف الشريعة الإسلامية.\nثانيا عدم حذف الحقوق الخاصة بنا و بموقعنا.\nثالثا ما يخص النقل نسمح بنقل المشاركات فقط مع الالتزام بذكر مصدر المشاركة الأصلي في موقعنا.\nرابعا نرفض ان يتربح أحد من خدماتنا المجانية التي نقدمها فينشرها مقابل المال.",
    },
    {
      title: "سياسة النشر",
      content:
        "سياسة النشر :-\n\nإن المواد المنشورة في الموقع تعبر عن رأي كاتبها والمصدر الذي تم نقل الخبر منه ولا تعبر بالضرورة عن رأي الموقع.\nتعتذر إدارة الموقع مسبقاً عن نشر أي مواد تعبر عن أي تعصب أو انحياز أعمى لفئة أو دين أو مذهب أو تسيء إليهم أو تؤدي إلى إثارة الخلافات والفتن الطائفية والإقليمية أو تسيء إلى الديانات والكتب السماوية والذات الإلهية أو تتضمن ألفاظاً وصوراً وعبارات منافية للآداب والأخلاق العامة، أو تتضمن أياً من أشكال التجريح والتهديد والعنف اللفظي.\nلا تلتزم إدارة الموقع بنشر كل ما يرد إليها، ويخضع توقيت ومكان النشر إلى اعتبارات فنية وتقنية خاصة بها.\nتعتذر إدارة الموقع عن نشر أي مواد مكتوبة أو مصورة مخالفة للقانون او الآداب العامة.\nلا تدفع إدارة الموقع مبالغ نقدية كتعويض عن المواد المرسلة إليها سواء تم نشرها او لم يتم ذلك.\nتعتبر إدارة الموقع أن الشخص الذي يطلب نشر مادة في الموقع قد اطلع على هذه الشروط وتفهمها.",
    },
    {
      title: "سياسة نشر التعليقات",
      content:
        "سياسة نشر التعليقات :-\n\nالتعليقات متاحة للزوار عبر خدمة تعليقات الموقع وفق الشروط التالية:\nيجب أن يكون التعليق على المادة المنشورة فقط.\nيتم إلغاء وحذف التعليقات التي تتضمن إساءة شخصية، والخارجة عن الأخلاق العامة والمسيئة للذات الإلهية والأديان السماوية، وكل ما يتضمن أي شكل من أشكال التجريح والتهديد والعنف اللفظي، كما سيتم حظر أي مستخدم يسيء استخدام خدمة التعليقات.\nيحق لإدارة الموقع حذف أو تعديل أي تعليق لا يتوافق مع سياسة النشر.\nالتعليقات المنشورة لا تعبر بالضرورة عن سياسة و رأي إدارة الموقع.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleSection = (index) =>
    setActiveIndex(activeIndex === index ? index : index);

  return (
    <div className="AboutContainer">
      <h1 className="AboutTitle">اتفاقية الاستخدام</h1>
      <div className="Accordion">
        {sections.map((section, index) => (
          <div key={index} className="AccordionItem">
            <button
              className="AccordionTitle"
              onClick={() => toggleSection(index)}
            >
              <span>{section.title}</span>
              <span
                className={`AccordionIcon ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`AccordionContent ${
                activeIndex === index ? "open" : ""
              }`}
            >
              {section.content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
