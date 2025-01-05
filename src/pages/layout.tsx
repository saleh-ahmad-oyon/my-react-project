import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/common";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;