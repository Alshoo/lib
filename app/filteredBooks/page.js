import Footer from "@/Components/Footer/Footer";
import CustomNavbar from "@/Components/NavBar/navbar";
import FilteredPage from "@/pages/filtered/filtered";

export default function FamousBook() {
  return (
    <div>
      <CustomNavbar />

      <FilteredPage  />

      <Footer />
    </div>
  );
}
