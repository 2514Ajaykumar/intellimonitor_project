import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import {
  getPublicStatus
} from "../../services/publicStatusService";

function StatusPage() {

  const [monitors, setMonitors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchStatus = async () => {

    try {

      const data =
        await getPublicStatus();

      setMonitors(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchStatus();

    const interval =
      setInterval(
        fetchStatus,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const allOperational =
    monitors.every(
      (monitor) =>
        monitor.status === "UP"
    );

  return (
    <div
      className="
        min-h-screen
        bg-[#050505]
        text-white
      "
    >

      {/* HERO */}

      <div
        className="
          border-b
          border-white/5
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto

            px-6
            py-16
          "
        >

          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#22c55e]
              font-semibold
              mb-5
            "
          >
            PUBLIC STATUS PAGE
          </p>

          <h1
            className="
              text-6xl
              font-black
              tracking-tight
              mb-5
            "
          >
            System Status
          </h1>

          <p
            className="
              text-xl
              text-neutral-400
              max-w-3xl
              leading-9
            "
          >
            Live operational status
            and uptime monitoring
            across all IntelliMonitor
            infrastructure services.
          </p>

        </div>

      </div>

      {/* STATUS BANNER */}

      <div
        className="
          max-w-6xl
          mx-auto

          px-6
          py-8
        "
      >

        <div
          className={`
            rounded-3xl
            border
            p-6

            flex
            items-center
            gap-4

            ${
              allOperational
                ? `
                  bg-[rgba(34,197,94,0.08)]
                  border-[rgba(34,197,94,0.15)]
                `
                : `
                  bg-[rgba(239,68,68,0.08)]
                  border-[rgba(239,68,68,0.15)]
                `
            }
          `}
        >

          {
            allOperational ? (

              <CheckCircle2
                size={28}
                className="text-[#22c55e]"
              />

            ) : (

              <AlertTriangle
                size={28}
                className="text-[#ef4444]"
              />

            )
          }

          <div>

            <h2
              className="
                text-2xl
                font-bold
                mb-1
              "
            >

              {
                allOperational
                  ? "All Systems Operational"
                  : "Some Systems Experiencing Issues"
              }

            </h2>

            <p className="text-neutral-400">

              Live system monitoring
              updates every 10 seconds.

            </p>

          </div>

        </div>

      </div>

      {/* MONITORS */}

      <div
        className="
          max-w-6xl
          mx-auto

          px-6
          pb-16
        "
      >

        <div className="space-y-4">

          {
            loading ? (

              <div
                className="
                  text-center
                  text-neutral-500
                  py-10
                "
              >
                Loading systems...
              </div>

            ) : (

              monitors.map(
                (monitor) => {

                  const isUp =
                    monitor.status === "UP";

                  return (

                    <div
                      key={monitor.id}
                      className="
                        bg-[#0d0d0d]
                        border
                        border-white/5

                        rounded-3xl

                        px-6
                        py-5

                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        <div
                          className={`
                            w-12
                            h-12

                            rounded-2xl

                            flex
                            items-center
                            justify-center

                            ${
                              isUp
                                ? `
                                  bg-[rgba(34,197,94,0.1)]
                                `
                                : `
                                  bg-[rgba(239,68,68,0.1)]
                                `
                            }
                          `}
                        >

                          <Activity
                            size={20}
                            className={
                              isUp
                                ? "text-[#22c55e]"
                                : "text-[#ef4444]"
                            }
                          />

                        </div>

                        <div>

                          <h3
                            className="
                              text-xl
                              font-bold
                            "
                          >
                            {monitor.name}
                          </h3>

                          <p
                            className="
                              text-sm
                              text-neutral-500
                              mt-1
                            "
                          >
                            {monitor.url}
                          </p>

                        </div>

                      </div>

                      <div
                        className={`
                          px-4
                          py-2

                          rounded-xl

                          text-sm
                          font-semibold

                          ${
                            isUp
                              ? `
                                bg-[rgba(34,197,94,0.1)]
                                text-[#4ade80]
                              `
                              : `
                                bg-[rgba(239,68,68,0.1)]
                                text-[#ef4444]
                              `
                          }
                        `}
                      >

                        {
                          isUp
                            ? "Operational"
                            : "Down"
                        }

                      </div>

                    </div>
                  );
                }
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default StatusPage;