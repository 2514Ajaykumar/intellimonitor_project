import { useContext, useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import { AuthContext }
  from "../../context/AuthContext";

import Input from "../../components/ui/Input";

import Button from "../../components/ui/Button";

function LoginPage() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      login(response.data.token);

      toast.success("Access Granted");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Authentication Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        bg-[#050505]
        overflow-hidden
      "
    >

      {/* LEFT SIDE */}

      <div
        className="
          hidden
          lg:flex

          w-[48%]

          relative

          flex-col
          justify-between

          px-14
          py-12

          border-r
          border-[rgba(255,255,255,0.05)]

          overflow-hidden
        "
      >

        {/* BACKGROUND */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-[#080808]
            via-[#050505]
            to-[#030303]
          "
        />

        {/* GLOW */}

        <div
          className="
            absolute
            top-[-120px]
            left-[-100px]

            w-[500px]
            h-[500px]

            rounded-full

            bg-[rgba(34,197,94,0.04)]

            blur-[140px]
          "
        />

        {/* CONTENT */}

        <div className="relative z-10">

          {/* LOGO */}

          <div
            className="
              flex
              items-center
              gap-3
              mb-20
            "
          >

            <div
              className="
                w-10
                h-10

                rounded-2xl

                bg-[rgba(34,197,94,0.10)]

                border
                border-[rgba(34,197,94,0.18)]

                flex
                items-center
                justify-center
              "
            >

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#22c55e]
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-black
                  tracking-tight
                "
              >
                Intelli
                <span className="text-[#22c55e]">
                  Monitor
                </span>
              </h2>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-[#3f3f3f]
                  mt-1
                "
              >
                Observability Platform
              </p>

            </div>

          </div>

          {/* HERO */}

          <div className="max-w-[520px]">

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-[#22c55e]

                mb-6

                font-semibold
              "
            >
              Infrastructure Intelligence
            </p>

            <h1
              className="
                text-[64px]
                xl:text-[72px]

                font-black

                leading-[0.92]

                tracking-tight

                mb-8
              "
            >
              Monitor
              <br />

              <span className="text-[#242424]">
                Every
              </span>

              <br />

              <span className="text-[#4ade80]">
                Signal.
              </span>

            </h1>

            <p
              className="
                text-[#4d4d4d]

                text-[16px]

                leading-relaxed

                max-w-[420px]
              "
            >
              Intelligent infrastructure
              observability engineered for
              modern systems that require
              reliability at scale.
            </p>

          </div>

        </div>

        {/* BOTTOM STATS */}

        <div
          className="
            relative
            z-10

            grid
            grid-cols-3
            gap-4
          "
        >

          {
            [
              {
                label: "Uptime SLA",
                value: "99.9%",
              },
              {
                label: "Latency",
                value: "30ms",
              },
              {
                label: "Monitoring",
                value: "24/7",
              },
            ].map((item) => (

              <div
                key={item.label}
                className="
                  rounded-2xl

                  border
                  border-[rgba(255,255,255,0.05)]

                  bg-[rgba(255,255,255,0.02)]

                  p-5
                "
              >

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.2em]

                    text-[#3d3d3d]

                    mb-3
                  "
                >
                  {item.label}
                </p>

                <h3
                  className="
                    text-2xl
                    font-black
                  "
                >
                  {item.value}
                </h3>

              </div>

            ))
          }

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div
        className="
          flex-1

          flex
          items-center
          justify-center

          px-6
          py-10

          relative
        "
      >

        {/* PANEL */}

        <div
          className="
            w-full
            max-w-[460px]

            rounded-[36px]

            border
            border-[rgba(255,255,255,0.06)]

            bg-[rgba(14,14,14,0.88)]

            backdrop-blur-2xl

            shadow-[0_20px_80px_rgba(0,0,0,0.45)]

            p-10
            lg:p-12
          "
        >

          {/* MOBILE LOGO */}

          <div
            className="
              lg:hidden

              flex
              items-center
              gap-3

              mb-12
            "
          >

            <div
              className="
                w-9
                h-9

                rounded-2xl

                bg-[rgba(34,197,94,0.10)]

                border
                border-[rgba(34,197,94,0.18)]

                flex
                items-center
                justify-center
              "
            >

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#22c55e]
                "
              />

            </div>

            <span
              className="
                text-lg
                font-black
              "
            >
              IntelliMonitor
            </span>

          </div>

          {/* HEADER */}

          <div className="mb-10">

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.35em]

                text-[#3f3f3f]

                mb-4
              "
            >
              Secure Access
            </p>

            <h2
              className="
                text-4xl
                font-black
                tracking-tight

                mb-3
              "
            >
              Welcome back.
            </h2>

            <p
              className="
                text-[#555]
                text-[15px]
                leading-relaxed
              "
            >
              Access your monitoring
              command center securely.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              type="email"
              name="email"
              placeholder="operator@company.com"
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
                disabled={loading}
              >

                {
                  loading
                    ? "Authenticating..."
                    : "Access Dashboard"
                }

              </Button>

            </div>

          </form>

          {/* FOOTER */}

          <p
            className="
              text-[#444]
              text-sm

              mt-8
            "
          >

            No account yet?

            <Link
              to="/register"
              className="
                ml-2

                text-[#22c55e]

                hover:text-[#4ade80]

                transition-all

                font-medium
              "
            >
              Create one →
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;