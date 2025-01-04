import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@/components/common";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mt-[80px]">
        <Outlet />
      </main>
        <footer>
            <Footer />
        </footer>
    </div>
  );
};

export default RootLayout;