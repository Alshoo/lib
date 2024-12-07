import Head from "next/head";
import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import "./bookDet.css";
import "../../pages/Famous/famous.css";
import "../../pages/Home/Home.css";
import BookDet from "./bookDet";
import Relations from "./relations";
import Comments from "./Comments";

export default function BookPage(props) {
  const keywords = props?.props?.data?.[0]?.keywords?.join(", ") || "";

  return (
    <div>
      <Head>
        <title>تفاصيل الكتاب</title>
        <meta name="description" content="تفاصيل الكتاب في المكتبة الإلكترونية" />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Ahmed" />
      </Head>

      <CustomNavbar />

      <BookDet props={props} />
      <br />
      <br />
      <br />
      <br />

      <Comments props={props} />

      <br />
      <br />
      <br />
      <br />

      <Relations />

      <Footer />
    </div>
  );
}
