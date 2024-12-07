import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import "./bookDet.css"

import "../../pages/Famous/famous.css" 
import "../../pages/Home/Home.css"

import BookDet from "./bookDet";
import Relations from "./relations";
import Comments from "./Comments";

export default function BookPage(props) {


  





  return (
    <div>
    <CustomNavbar/>



      <BookDet props={props}/>
        <br></br>
<br></br>
<br></br>
<br></br>




<Comments props={props}/>






<br></br>
<br></br>
<br></br>
<br></br>


      <Relations/>


      <Footer/>
    </div>
  )
}

