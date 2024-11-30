import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import AuthorPage from "@/pages/AuthorAcc/Author";


export default function AuthorAcc(props) {


  console.log();

  
  return (
    <div>
            <CustomNavbar/>


{/* <AuthorPage AuthorID={props.params.AuthorAcc}/> */}
<AuthorPage AuthorID={props?.params?.AuthorAcc || "defaultAuthorID"} />


<Footer/>
    </div>
  )
}
