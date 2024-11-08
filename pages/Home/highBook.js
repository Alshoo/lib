

// import axios from "axios";
// import FirstApi from "@/Components/APIs/MainApi";
import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import CardImg from "../../public/Images/cardimage.png";
import Editor from "../../public/Images/frame-2888.png";
import Link from "next/link";
import RatingStars from "./ratingStar";




export default  function HighBook() {
  // async







      //   const response = await axios.get(
      //     `${FirstApi}/books/`
      //   );
      
    
      // const products = response.data.data;

      //   const sliceProduct = products.slice(0,4);
    










  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>الاعلي تقييما</p>
        </div>

        <Link href="/HighBook" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link>
      </div> 




      <div className="Maincards">

      {/* {sliceProduct.map((card, index) => (
        <Link href="#" className="CardCont" key={index}>
          <Image className="CardImg44" src={card.cover_image} alt="ERR404" />
          <div className="lastCardSec">
            <Image src={card.author.profile_image} alt="ERR404" />
            <h6>{card.title}</h6>
            <p>{card.author.name}</p>
            <RatingStars rating={card.size} />
          </div>
        </Link>
      ))} */}








<Link href="/init" className="CardCont">
          <Image className="CardImg44" src={CardImg} alt="ERR404" />
          <div className="lastCardSec">
            <Image src={Editor} alt="ERR404" />
            <h6>الداء والدواء</h6>
            <p>ابن القيم الجوزية</p>
            <RatingStars rating={3} />
          </div>
        </Link>
<Link href="/init" className="CardCont">
          <Image className="CardImg44" src={CardImg} alt="ERR404" />
          <div className="lastCardSec">
            <Image src={Editor} alt="ERR404" />
            <h6>الداء والدواء</h6>
            <p>ابن القيم الجوزية</p>
            <RatingStars rating={3} />
          </div>
        </Link>
<Link href="/init" className="CardCont">
          <Image className="CardImg44" src={CardImg} alt="ERR404" />
          <div className="lastCardSec">
            <Image src={Editor} alt="ERR404" />
            <h6>الداء والدواء</h6>
            <p>ابن القيم الجوزية</p>
            <RatingStars rating={3} />
          </div>
        </Link>
<Link href="/init" className="CardCont">
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
  );
}
