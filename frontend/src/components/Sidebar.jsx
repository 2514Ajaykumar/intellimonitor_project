import {
  LayoutDashboard,
  Activity,
  LogOut,
  Radio,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useContext } from "react";

import { AuthContext }
  from "../context/AuthContext";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Monitors",
      path: "/monitors",
      icon: Activity,
    },
    {
    name: "Incidents",
    path: "/incidents",
    icon: Activity, // You can replace this with an appropriate icon for Incidents
  }
  ];

  return (
    <aside className="hidden lg:flex w-[248px] shrink-0 sticky top-0 h-screen flex-col justify-between border-r border-[rgba(255,255,255,0.05)] bg-[#070707] px-5 py-5">
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[rgba(34,197,94,0.12)] to-transparent" />

      <div>
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[18px] border border-[rgba(34,197,94,0.12)] bg-[rgba(34,197,94,0.08)]">
              <Radio size={16} className="text-[#22c55e]" />
            </div>

            <div>
              <h1 className="text-[16px] font-bold leading-none tracking-tight">
                Intelli<span className="text-[#22c55e]">Monitor</span>
              </h1>
              <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-[#3d3d3d]">
                Observability Platform
              </p>
            </div>
          </div>
        </div>

        <div className="mb-3 px-1">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#3a3a3a]">
            Navigation
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 rounded-[18px] border px-3 py-2.5 transition-[background-color,border-color,transform,color] duration-200 ${
                  active
                    ? "border-[rgba(34,197,94,0.12)] bg-[rgba(34,197,94,0.07)] text-[#f5f5f5]"
                    : "border-transparent text-[#5d5d5d] hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.03)] hover:text-[#d4d4d4]"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r-full bg-[#22c55e]" />
                )}

                <Icon size={16} className={active ? "text-[#22c55e]" : "text-[#4a4a4a]"} />

                <span className="text-sm font-medium">{item.name}</span>

                {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#22c55e]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="mb-4 h-px bg-[rgba(255,255,255,0.04)]" />

        <div className="rounded-[20px] border border-[rgba(34,197,94,0.08)] bg-[rgba(34,197,94,0.03)] px-3 py-3">
          <div className="flex items-start gap-2">
            <div className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            <div>
              <p className="text-[12px] font-semibold text-[#4ade80]">Systems Operational</p>
              <p className="mt-1 text-[10px] leading-relaxed text-[#4d4d4d]">
                All monitoring services active
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-[18px] px-3 py-2.5 text-[#666] transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[rgba(239,68,68,0.05)] hover:text-[#ef4444]"
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;