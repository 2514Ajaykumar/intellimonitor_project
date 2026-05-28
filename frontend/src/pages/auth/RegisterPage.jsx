import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      toast.success("Account Created");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex dot-pattern" style={{ background: "#050505" }}>

      {/* Left Panel */}
      <div className="hidden lg:flex w-[55%] relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#050505] to-[#030303]" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[rgba(34,197,94,0.05)] blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grid-texture opacity-40" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-8 h-8 rounded-xl bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.25)] flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <span className="text-sm font-bold font-display">IntelliMonitor</span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#22c55e] mb-6 font-medium">
            Join the Platform
          </p>

          <h1 className="text-[72px] font-black leading-none tracking-tight mb-8 font-display">
            Start
            <br />
            <span className="text-[#222]">Monitoring</span>
            <br />
            <span className="gradient-text">Now.</span>
          </h1>

          <p className="text-[#3d3d3d] text-lg leading-relaxed max-w-[400px]">
            Set up your infrastructure surveillance in minutes. No DevOps expertise required.
          </p>
        </div>

        <div className="relative z-10 flex gap-4">
          {[
            { icon: "⚡", label: "Instant Setup" },
            { icon: "🔒", label: "Enterprise Security" },
            { icon: "📊", label: "Real-time Analytics" },
          ].map((feat) => (
            <div
              key={feat.label}
              className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 text-center"
            >
              <div className="text-xl mb-2">{feat.icon}</div>
              <p className="text-xs text-[#3a3a3a] font-medium">{feat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.01)] border-l border-[rgba(255,255,255,0.05)]" />

        <div className="relative w-full max-w-[400px]">
          <div className="animate-fadeUp">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#333] mb-4 font-medium">
              New Account
            </p>
            <h2 className="text-4xl font-black mb-2 font-display">Create access.</h2>
            <p className="text-[#3d3d3d] text-sm mb-10">
              Join the platform and start monitoring your infrastructure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Alex Chen"
                label="Full Name"
                onChange={handleChange}
                value={formData.name}
              />

              <Input
                type="email"
                name="email"
                placeholder="alex@company.com"
                label="Email Address"
                onChange={handleChange}
                value={formData.email}
              />

              <Input
                type="password"
                name="password"
                placeholder="••••••••••••"
                label="Password"
                onChange={handleChange}
                value={formData.password}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>

            <p className="text-[#333] text-sm mt-8">
              Already have access?{" "}
              <Link
                to="/login"
                className="text-[#22c55e] hover:text-[#4ade80] transition-colors font-medium"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
