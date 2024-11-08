
import "../Home/Home.css"
import "./Authors.css"
import Image from 'next/image'
import Link from 'next/link'
import CardImg from "../../public/Images/frame-3036.png";
import bookicon from "../../public/Images/rret4.png";
import arrow from "../../public/Images/arfegrow.png";
import searchIcon from "@/public/Images/navSearch.png";


export default function AuthorsPage() {
  return (
    <div>
        
        <div className="Breadcrumb">
            <Link href="/">الرئيسية</Link>
            <Image src={arrow} alt='ERR404'/>
            <Link href="">المؤلفين</Link>
        </div>
      


      
<div  className="bookPageContainer">
<div className="searchContainer2">
            <div className="iconWrapper2">
              <Image src={searchIcon} alt="ERR404" />
            </div>

            <input
              type="text"
              placeholder="ابحث عن كتاب"
              className="inputArea2"
            />

            <button className="actionButton2">بحث</button>
          </div>










          <div className="Maincards">

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSecAuthor">
    <h6>حسن الجندي</h6>
    <div className="bookNum">
        <Image src={bookicon} alt="ERR404" />
        <p>70 كتاب</p>
    </div>
  </div>
</Link>

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSecAuthor">
    <h6>حسن الجندي</h6>
    <div className="bookNum">
        <Image src={bookicon} alt="ERR404" />
        <p>70 كتاب</p>
    </div>
  </div>
</Link>

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSecAuthor">
    <h6>حسن الجندي</h6>
    <div className="bookNum">
        <Image src={bookicon} alt="ERR404" />
        <p>70 كتاب</p>
    </div>
  </div>
</Link>

<Link href="#" className="CardCont">
  <Image className="CardImg44" src={CardImg} alt="ERR404" />
  <div className="lastCardSecAuthor">
    <h6>حسن الجندي</h6>
    <div className="bookNum">
        <Image src={bookicon} alt="ERR404" />
        <p>70 كتاب</p>
    </div>
  </div>
</Link>



</div>







</div>




    </div>
  )
}
