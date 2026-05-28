import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex">
      <Sidebar />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10 py-5 lg:py-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;