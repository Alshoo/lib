"use client"
import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import "./bookDet.css"
import Image from "next/image";
import productImage from "../../public/Images/rwrwqr3.png";
import { useState } from "react";
import "../../pages/Famous/famous.css"
import "../../pages/Home/Home.css"
import Link from 'next/link'
import RatingStars from '../../pages/Home/ratingStar'
import CardImg from "@/public/Images/cardimage.png";
import Editor from "@/public/Images/frame-2888.png";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import download from "../../public/Images/arrow-backup-down-download-save-storage-transfer-1225091.png";
import view from "../../public/Images/unnاamed.png";
import ratings from "../../public/Images/unnamed.png";



export default function BookPage() {


  const [activeTab, setActiveTab] = useState('description');

  const toggleTab = (tab) => {
      setActiveTab(tab);
  }; 


  return (
    <div>
    <CustomNavbar/>




<div  style={{
  boxShadow:" 0 4px 46px rgba(0, 0, 0, 0.3)",
  paddingTop:"50px",
  paddingBottom:"50px",
}}>


    <div className="book-section">
      


    <div className="firstSection">
    <div className="details">

       <div>
       <Image src={productImage} alt="Book Cover" className="book-cover" />
       </div>
                <div className="info">
                <h3>فن الرعب</h3>
                    <p><strong>القسم:</strong> و العربية</p>
                    <p><strong>المؤلف:</strong> العربية</p>
                    <p><strong>اللغة:</strong> العربية</p>
                    <p><strong>الصفحات:</strong> العربية</p>
                    <p><strong>رقم الطبعة:</strong> العربية</p>
                    <p><strong>دار النشر:</strong> 544</p>
                    <p><strong>نوع الملف:</strong> 5/10/2019</p>
                    <p><strong>حجم الملف:</strong> 5/10/2019</p>
                    <p><strong>تاريخ النشر:</strong> 5/10/2019</p>
                </div>
         

           
            </div>

            <button className="down-button">تحميل</button>
            <button className="view-button">مشاهده</button>


            <div className="rating">
                    <span>45</span>
                    <span>9875</span>
                    <span>4567</span>
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
                        onClick={() => toggleTab('description')} 
                        className={activeTab === 'description' ? 'active' : ''}
                    >
                        وصف الكتاب
                    </p>
                    <p 
                        onClick={() => toggleTab('author')} 
                        className={activeTab === 'author' ? 'active' : ''}
                    >
                        المؤلف
                    </p>
                </div>

                <div className="tab-content">
                    {activeTab === 'description' && (
                        <p>
                          لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني البارع. السعادة البشرية. لا أحد يرفض أو يكره أو يتجنب المتعة نفسها ، لأنها متعة ،
لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني البارع. السعادة البشرية. لا أحد يرفض أو يكره أو يتجنب المتعة نفسها ، لأنها متعة ، 
لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني البارع. السعادة البشرية. لا أحد يرفض أو يكره أو يتجنب المتعة نفسها ، لأنها متعة ،
                        </p>
                    )}
                    
                    {activeTab === 'author' && (
                        <p>
                            هذا هو المؤلف. يمكنك هنا كتابة معلومات عن المؤلف وتفاصيل حول سيرته الذاتية.
                        </p>
                    )}
                </div>
            </div>

        </div>

        </div>








<br></br>
<br></br>
<br></br>
<br></br>

        <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>ذات صله</p>
        </div>

        {/* <Link href="#" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link> */}
      </div>



        <div className="Maincards">

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSec">
    <Image src={Editor} alt="ERR404" />
    <h6>الداء والدواء</h6>
    <p>ابن القيم الجوزية</p>
    <RatingStars rating={3} />
  </div>
</Link>

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSec">
    <Image src={Editor} alt="ERR404" />
    <h6>الداء والدواء</h6>
    <p>ابن القيم الجوزية</p>
    <RatingStars rating={3} />
  </div>
</Link>

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSec">
    <Image src={Editor} alt="ERR404" />
    <h6>الداء والدواء</h6>
    <p>ابن القيم الجوزية</p>
    <RatingStars rating={3} />
  </div>
</Link>

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSec">
    <Image src={Editor} alt="ERR404" />
    <h6>الداء والدواء</h6>
    <p>ابن القيم الجوزية</p>
    <RatingStars rating={3} />
  </div>
</Link>


</div>



      <Footer/>
    </div>
  )
}

