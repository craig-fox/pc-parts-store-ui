import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-grow p-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-slate-500">
          © 2026 PC Parts Store
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
