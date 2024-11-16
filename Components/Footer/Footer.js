import './Footer.css'
import FaceBook from '../../public/Images/facebook-02.png'
import Insta from '../../public/Images/instagram.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div  
    style={{
        paddingTop:"2vh"
    }}
    >
     <footer className="footer">
      <div className="footer-container">
      

        <div className="footer-right">
          <div className="footer-section">
            <h4>الاقسام</h4> 
            <ul>
              <li><a href="#">الاسلام</a></li>
              <li><a href="#">الاسلام</a></li>
              <li><a href="#">الاسلام</a></li>
              <li><a href="#">الاسلام</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>المجموعات</h4>
            <ul>
              <li><a href="#">التاريخ</a></li>
              <li><a href="#">التاريخ</a></li>
              <li><a href="#">التاريخ</a></li>
              <li><a href="#">التاريخ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>الصفحات </h4>
            <ul>
              <li><a href="/Authors">المؤلفين</a></li>
              <li><a href="/RecentBook">احدث الكتب</a></li>
              <li><a href="/FamousBook">اشهر الكتب</a></li>
              <li><a href="/HighBook">الاعلي تقييما</a></li>
            </ul>
          </div>
        </div>



        <div className="footer-left">
          <div className="logo">Logo</div>
          <p className="description">
          أكبر منصة تواصل عربية مفتوحة لمشاركة الكتب الالكترونية والورقية، تسعى إلى إحداث أثر كبير في عالم المعرفة وإثراء المحتوى العربي على الانترنت والتسهيل على المؤلفين نشر الكتب وتفادي التكاليف الكبيرة للنشر والتسهيل على القراء اختيار الكتاب المناسب في أي مجال عن طريق عرض مراجعات واقتباسات للكتب و آراء المستخدمين في كل كتاب.
          </p>
    
        </div>


      </div>
     
        <div className='lastFooterSec'>
        <div className='socialIcn'>
            <Link href='#' >
            <Image alt='ERR404' src={FaceBook} />
            </Link>
          
            <Link href='#' >
            <Image alt='ERR404' src={Insta} />
            </Link>
            </div>


    <div className='lastFooterLink'>
          <Link href="/About">عنا</Link>
                <Link href="/Terms">اتفاقيه الاستخدام</Link>
                <Link href="/policy">السياسه الخصوصيه</Link>
    </div>
        
            
            


           
        </div>



    </footer>
    
    
    </div>
  )
}
