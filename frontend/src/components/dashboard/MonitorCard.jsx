import {
  Activity,
  Clock3,
  Trash2,
  ExternalLink,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import Card from "../ui/Card";

import StatusBadge
  from "../ui/StatusBadge";

function MonitorCard({
  monitor,
  onDelete,
}) {

  const navigate =
    useNavigate();

  const isUp =
    monitor.status === "UP";

  const openDetails = () => {

    navigate(
      `/monitors/${monitor.id}`
    );
  };

  return (
    <div
      onClick={openDetails}
      className="cursor-pointer"
    >

      <Card
        className="
          group

          min-h-[248px]

          flex
          flex-col
          justify-between

          relative

          transition-all
          duration-300

          hover:scale-[1.01]
        "
      >

        {/* TOP GLOW */}

        {
          isUp && (
            <div
              className="
                absolute
                top-0
                left-10
                right-10

                h-px

                bg-gradient-to-r
                from-transparent
                via-[rgba(34,197,94,0.35)]
                to-transparent
              "
            />
          )
        }

        {/* HEADER */}

        <div>

          <div
            className="
              flex
              items-start
              justify-between

              mb-5
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
                className={`
                  w-11
                  h-11

                  rounded-[20px]

                  flex
                  items-center
                  justify-center

                  border

                  flex-shrink-0

                  ${
                    isUp
                      ? `
                        bg-[rgba(34,197,94,0.08)]

                        border-[rgba(34,197,94,0.15)]
                      `
                      : `
                        bg-[rgba(239,68,68,0.06)]

                        border-[rgba(239,68,68,0.12)]
                      `
                  }
                `}
              >

                <Activity
                  size={18}
                  className={
                    isUp
                      ? "text-[#22c55e]"
                      : "text-[#ef4444]"
                  }
                />

              </div>

              {/* INFO */}

              <div>

                <h3
                  className="
                    text-[17px]
                    font-bold

                    tracking-[-0.02em]

                    text-[#f5f5f5]

                    leading-tight

                    mb-2
                  "
                >
                  {monitor.name}
                </h3>

                <div
                  className="
                    inline-flex
                    items-center

                    px-2.5
                    py-1

                    rounded-lg

                    bg-[rgba(255,255,255,0.03)]

                    border
                    border-[rgba(255,255,255,0.04)]
                  "
                >

                  <span
                    className="
                      text-[11px]

                      font-mono

                      text-[#666]

                      tracking-wide
                    "
                  >
                    {monitor.method}
                  </span>

                </div>

              </div>

            </div>

            {/* DELETE */}

            <button
              onClick={(e) => {

                e.stopPropagation();

                onDelete(monitor.id);
              }}
              className="
                w-9
                h-9

                rounded-xl

                flex
                items-center
                justify-center

                text-[#444]

                hover:text-[#ef4444]

                hover:bg-[rgba(239,68,68,0.08)]

                transition-all
                duration-300

                opacity-0
                group-hover:opacity-100
              "
            >

              <Trash2 size={15} />

            </button>

          </div>

          {/* URL SECTION */}

          <div
            className="
              rounded-[20px]

              border
              border-[rgba(255,255,255,0.04)]

              bg-[rgba(255,255,255,0.02)]

              px-4
              py-3.5

              mb-5
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex-1
                  min-w-0
                "
              >

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.18em]

                    text-[#3f3f3f]

                    mb-2
                  "
                >
                  Endpoint
                </p>

                <p
                  className="
                    text-[13px]

                    font-mono

                    text-[#8a8a8a]

                    truncate
                  "
                >
                  {monitor.url}
                </p>

              </div>

              <div
                className="
                  w-9
                  h-9

                  rounded-[16px]

                  border
                  border-[rgba(255,255,255,0.05)]

                  bg-[rgba(255,255,255,0.02)]

                  flex
                  items-center
                  justify-center

                  text-[#555]

                  transition-all
                  duration-300

                  hover:bg-[rgba(34,197,94,0.08)]
                  hover:text-[#22c55e]

                  flex-shrink-0
                "
              >

                <ExternalLink size={14} />

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            items-center
            justify-between

            pt-1
          "
        >

          <StatusBadge
            status={monitor.status}
          />

          <div
            className="
              flex
              items-center
              gap-2

              px-3
              py-2

              rounded-[16px]

              bg-[rgba(255,255,255,0.02)]

              border
              border-[rgba(255,255,255,0.04)]
            "
          >

            <Clock3
              size={13}
              className="text-[#555]"
            />

            <span
              className="
                text-[12px]

                font-mono

                text-[#777]
              "
            >
              {monitor.intervalSeconds}s
            </span>

          </div>

        </div>

      </Card>

    </div>
  );
}

export default MonitorCard;