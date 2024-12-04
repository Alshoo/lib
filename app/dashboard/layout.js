import Sidebar from "@/Dashboard/slidebar/SideBar";
import "./dash.css"




export default function DashboardLayout({ children }) {
  return (

      <div className="MainDashContainer">
        <Sidebar />
        {children}

      </div>
  );
}
