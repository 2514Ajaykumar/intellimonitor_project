import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {

  return (
    <div
      className="
        min-h-screen

        bg-black

        text-white

        flex
      "
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <main
        className="
          flex-1

          min-w-0

          overflow-x-hidden
        "
      >

        <div
          className="
            w-full

            px-8
            xl:px-12

            py-8
            xl:py-10
          "
        >

          <div
            className="
              max-w-[1680px]

              mx-auto
            "
          >

            {children}

          </div>

        </div>

      </main>

    </div>
  );
}

export default MainLayout;