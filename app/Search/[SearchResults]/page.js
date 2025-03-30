import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import SearchResultpage from "@/pages/SearchResults/page";


export default function SearchReasults(props) {
  return (
    <div>
          <CustomNavbar/>

      <SearchResultpage props={props}/>


 


 

      <Footer/>
    </div>
  )
}
