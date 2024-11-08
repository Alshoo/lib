import Image from "next/image";
import bookIcon from "../../public/Images/iconoir-book-solid.png";
import LinkIcon from "../../public/Images/vector44.png";
import CardImg from "../../public/Images/frame-3036.png";
import bookicon from "../../public/Images/rret4.png";
import Link from "next/link";

export default function Authors() {
  return (
    <div className="CardSecContainer">
      <div className="CardSecHeadLine">
        <div className="betweenItems1">
          <Image src={bookIcon} alt="ERR404" />
          <p>المؤلفين</p>
        </div>

        <Link href="/Authors" className="betweenItems2">
          <p>المزيد</p>
          <Image src={LinkIcon} alt="ERR404" />
        </Link>
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
  );
}
