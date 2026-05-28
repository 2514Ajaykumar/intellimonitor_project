import { useState } from "react";

import {
  X,
  Clock3,
  Timer,
  AlertCircle,
  Zap,
  Globe,
} from "lucide-react";

import Input from "../ui/Input";

import Button from "../ui/Button";

function CreateMonitorModal({
  onClose,
  onCreate,
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      url: "",
      method: "GET",
      intervalSeconds: 60,
      timeoutSeconds: 5,
      failureThreshold: 3,
    });

  const methods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ];

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onCreate(formData);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/80
        backdrop-blur-xl

        p-5

        animate-fadeIn
      "
      onClick={(e) =>
        e.target === e.currentTarget &&
        onClose()
      }
    >

      {/* MODAL */}

      <div
        className="
          relative

          w-full
          max-w-[720px]

          rounded-[36px]

          border
          border-[rgba(255,255,255,0.06)]

          bg-[linear-gradient(
            180deg,
            rgba(18,18,18,0.98),
            rgba(10,10,10,0.96)
          )]

          shadow-[0_40px_120px_rgba(0,0,0,0.75)]

          overflow-hidden

          animate-fadeUp
        "
      >

        {/* TOP LIGHT */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-[rgba(255,255,255,0.12)]
            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            px-10
            pt-9
            pb-7

            border-b
            border-[rgba(255,255,255,0.05)]
          "
        >

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >

            {/* LEFT */}

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              {/* ICON */}

              <div
                className="
                  w-12
                  h-12

                  rounded-2xl

                  bg-[rgba(34,197,94,0.08)]

                  border
                  border-[rgba(34,197,94,0.15)]

                  flex
                  items-center
                  justify-center

                  flex-shrink-0
                "
              >

                <Zap
                  size={18}
                  className="
                    text-[#22c55e]
                  "
                />

              </div>

              {/* TEXT */}

              <div>

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.3em]

                    text-[#22c55e]

                    mb-3

                    font-semibold
                  "
                >
                  Infrastructure Setup
                </p>

                <h2
                  className="
                    text-3xl
                    font-black
                    tracking-tight

                    mb-3
                  "
                >
                  Create Monitor
                </h2>

                <p
                  className="
                    text-[#555]

                    text-[15px]

                    leading-relaxed

                    max-w-[440px]
                  "
                >
                  Configure endpoint monitoring
                  with custom intervals,
                  timeout policies,
                  and intelligent failure
                  detection.
                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              onClick={onClose}
              className="
                w-10
                h-10

                rounded-2xl

                border
                border-[rgba(255,255,255,0.05)]

                bg-[rgba(255,255,255,0.02)]

                flex
                items-center
                justify-center

                text-[#555]

                hover:text-white

                hover:bg-[rgba(255,255,255,0.05)]

                transition-all
                duration-300

                flex-shrink-0
              "
            >

              <X size={17} />

            </button>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            px-10
            py-8
          "
        >

          <div className="space-y-7">

            {/* BASIC */}

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2

                  mb-5
                "
              >

                <Globe
                  size={14}
                  className="text-[#22c55e]"
                />

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.25em]

                    text-[#666]

                    font-semibold
                  "
                >
                  Endpoint Configuration
                </p>

              </div>

              <div className="space-y-5">

                <Input
                  name="name"
                  label="Monitor Name"
                  placeholder="Production API Health"
                  value={formData.name}
                  onChange={handleChange}
                />

                <Input
                  name="url"
                  label="Endpoint URL"
                  placeholder="https://api.company.com/health"
                  value={formData.url}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* SETTINGS */}

            <div
              className="
                rounded-[28px]

                border
                border-[rgba(255,255,255,0.05)]

                bg-[rgba(255,255,255,0.02)]

                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2

                  mb-6
                "
              >

                <Clock3
                  size={14}
                  className="text-[#22c55e]"
                />

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.25em]

                    text-[#666]

                    font-semibold
                  "
                >
                  Monitoring Settings
                </p>

              </div>

              {/* METHOD */}

              <div className="mb-6">

                <label
                  className="
                    block

                    text-[11px]
                    uppercase
                    tracking-[0.2em]

                    text-[#555]

                    mb-3
                  "
                >
                  HTTP Method
                </label>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {
                    methods.map((m) => (

                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            method: m,
                          })
                        }
                        className={`
                          px-4
                          py-3

                          rounded-2xl

                          text-[12px]
                          font-mono
                          font-semibold

                          border

                          transition-all
                          duration-300

                          ${
                            formData.method === m
                              ? `
                                bg-[rgba(34,197,94,0.10)]

                                border-[rgba(34,197,94,0.18)]

                                text-[#4ade80]
                              `
                              : `
                                border-[rgba(255,255,255,0.05)]

                                bg-[rgba(255,255,255,0.02)]

                                text-[#666]

                                hover:text-[#ddd]
                              `
                          }
                        `}
                      >

                        {m}

                      </button>

                    ))
                  }

                </div>

              </div>

              {/* GRID */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-5
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-3
                    "
                  >

                    <Clock3
                      size={13}
                      className="text-[#555]"
                    />

                    <label
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.18em]

                        text-[#555]
                      "
                    >
                      Interval
                    </label>

                  </div>

                  <Input
                    type="number"
                    name="intervalSeconds"
                    value={formData.intervalSeconds}
                    onChange={handleChange}
                    placeholder="60"
                  />

                </div>

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-3
                    "
                  >

                    <Timer
                      size={13}
                      className="text-[#555]"
                    />

                    <label
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.18em]

                        text-[#555]
                      "
                    >
                      Timeout
                    </label>

                  </div>

                  <Input
                    type="number"
                    name="timeoutSeconds"
                    value={formData.timeoutSeconds}
                    onChange={handleChange}
                    placeholder="5"
                  />

                </div>

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-3
                    "
                  >

                    <AlertCircle
                      size={13}
                      className="text-[#555]"
                    />

                    <label
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.18em]

                        text-[#555]
                      "
                    >
                      Failures
                    </label>

                  </div>

                  <Input
                    type="number"
                    name="failureThreshold"
                    value={formData.failureThreshold}
                    onChange={handleChange}
                    placeholder="3"
                  />

                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div
              className="
                flex
                items-center
                justify-end

                gap-4

                pt-2
              "
            >

              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="
                  min-w-[140px]
                "
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="
                  min-w-[180px]
                "
              >
                Deploy Monitor
              </Button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateMonitorModal;