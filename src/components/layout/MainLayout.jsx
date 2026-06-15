import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./layout.css";

function MainLayout({
  children,
  title = "Dashboard",
  subtitle = "Overview of your system",
}) {
  return (
    <div className="st-layout">
      <Sidebar />

      <div className="st-main">
        <Navbar title={title} subtitle={subtitle} />

        <main className="st-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;