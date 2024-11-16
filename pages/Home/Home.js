"use client"

import Image from "next/image";
import "./Home.css";
import HomeImage from "@/public/Images/MainHomeImg.png";
import pattern from "@/public/Images/pattern.png";
import searchIcon from "@/public/Images/navSearch.png";
import Link from "next/link";
import FamousBook from "./famousBook";
import LatestBook from "./latestBook";
import HighBook from "./highBook";
import Authors from "./Authors";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Home() {


  return (
    <div>





      <div className="CustomizeHeight">
        <div className="MainHomeImg">
          <Image src={HomeImage} alt="ERR404" />
        </div>
        <div className="MainHomeImg">
          <Image src={pattern} alt="ERR404" />
        </div>

        <div className="MainHeadlineContainer">
          <div className="headLineText">
            <h3>مرحبا بك فى قارئ</h3>
            <h4>استمتع بقراءة الكتب المفضلة لديك في أي وقت وأي مكان</h4>
          </div>
          <Dropdown>
          <div className="searchContainer">
            <div className="iconWrapper">
              <Image src={searchIcon} alt="ERR404" />
            </div>

            <input
              type="text"
              placeholder="ابحث عن مؤلف او قسم كتب"
              className="inputArea"
            />

            <Dropdown.Toggle className="actionButton" id="dropdown-basic">
            بحث
            </Dropdown.Toggle>
          </div>


       
            <Dropdown.Menu>
              <Dropdown.Item href="/Authors">بحث عن مؤلف </Dropdown.Item>
              <Dropdown.Item href="/BookLists">بحث عن قسم</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>





          <div className="HeadLinks2">
            <Link href="/FamousBook">
              <button>اشهر الكتب</button>
            </Link>
            <Link href="/RecentBook">
              <button>احدث الكتب</button>
            </Link>
            <Link href="/HighBook">
              <button>الاعلى تقييم</button>
            </Link>
          </div>
        </div>
      </div>






    <FamousBook/>


    <LatestBook/>


    <HighBook/>

    
    <Authors/>


    </div>
  );
}
