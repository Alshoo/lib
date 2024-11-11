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

          <div className="searchContainer">
            <div className="iconWrapper">
              <Image src={searchIcon} alt="ERR404" />
            </div>

            <input
              type="text"
              placeholder="ابحث عن كاتب او مؤلف او قسم كتب"
              className="inputArea"
            />

            <button className="actionButton">بحث</button>
          </div>

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
