
import "../Home/Home.css"
import "./High.css"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RatingStars from '../Home/ratingStar'
import CardImg from "../../public/Images/cardimage.png";
import Editor from "../../public/Images/frame-2888.png";
import arrow from "../../public/Images/arfegrow.png";
import searchIcon from "../../public/Images/navSearch.png";


export default function FamousPage() {
  return (
    <div>
        
        <div className="Breadcrumb">
            <Link href="/">الرئيسية</Link>
            <Image src={arrow} alt='ERR404'/>
            <Link href="">الأعلى تقييما</Link>
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





</div>




    </div>
  )
}
