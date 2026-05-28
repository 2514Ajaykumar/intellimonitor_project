import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Activity,
  SlidersHorizontal,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../../api/axios";

import MainLayout
  from "../../layouts/MainLayout";

import Button
  from "../../components/ui/Button";

import MonitorCard
  from "../../components/dashboard/MonitorCard";

import CreateMonitorModal
  from "../../components/dashboard/CreateMonitorModal";

/* EMPTY STATE */

function EmptyState({
  onAdd,
}) {

  return (
    <div
      className="
        min-h-[420px]

        rounded-[34px]

        border
        border-dashed
        border-[rgba(255,255,255,0.06)]

        bg-[rgba(14,14,14,0.45)]

        flex
        flex-col
        items-center
        justify-center

        text-center

        px-6
      "
    >

      <div
        className="
          w-16
          h-16

          rounded-3xl

          bg-[rgba(34,197,94,0.07)]

          border
          border-[rgba(34,197,94,0.12)]

          flex
          items-center
          justify-center

          mb-7
        "
      >

        <Activity
          size={24}
          className="
            text-[#22c55e]
          "
        />

      </div>

      <h2
        className="
          text-2xl
          font-black
          mb-3
        "
      >
        No monitors configured
      </h2>

      <p
        className="
          text-[#555]

          text-[15px]

          leading-relaxed

          max-w-[420px]

          mb-8
        "
      >
        Deploy your first endpoint
        monitor to begin tracking
        uptime, latency, and
        infrastructure availability.
      </p>

      <Button
        onClick={onAdd}
      >

        <Plus size={16} />

        Create First Monitor

      </Button>

    </div>
  );
}

function MonitorsPage() {

  const [monitors, setMonitors] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [filter, setFilter] =
    useState("ALL");

  const fetchMonitors =
    async () => {

      try {

        const response =
          await api.get("/monitors");

        // setMonitors(response.data);
        setMonitors(
        [...response.data]
      );

      } catch (error) {

        console.log(error);
      }
    };

  // useEffect(() => {

  //   fetchMonitors();

  // }, []);
  useEffect(() => {

    fetchMonitors();

    const interval = setInterval(() => {

        fetchMonitors();

    }, 3000);

    return () => clearInterval(interval);

}, []);

  const createMonitor =
    async (data) => {

      try {

        await api.post(
          "/monitors",
          data
        );

        toast.success(
          "Monitor Created"
        );

        setShowModal(false);

        fetchMonitors();

      } catch (error) {

        toast.error(
          "Failed to create monitor"
        );
      }
    };

  const deleteMonitor =
    async (id) => {

      try {

        await api.delete(
          `/monitors/${id}`
        );

        toast.success(
          "Monitor Deleted"
        );

        fetchMonitors();

      } catch (error) {

        toast.error(
          "Delete failed"
        );
      }
    };

  const filtered =
    monitors.filter((m) => {

      if (filter === "ALL")
        return true;

      return m.status === filter;
    });

  const upCount =
    monitors.filter(
      (m) => m.status === "UP"
    ).length;

  const downCount =
    monitors.filter(
      (m) => m.status === "DOWN"
    ).length;

  return (
    <MainLayout>

      {/* TOP SECTION */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between

          gap-6

          mb-6

          flex-wrap
        "
      >

        {/* LEFT */}

        <div>

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.35em]

              text-[#22c55e]

              mb-3

              font-semibold
            "
          >
            Infrastructure Monitoring
          </p>

          <h1
            className="
              text-[clamp(2.4rem,4vw,3.4rem)]

              font-black

              tracking-[-0.06em]

              leading-[0.95]

              mb-3
            "
          >
            Monitor
            <span className="text-[#2b2b2b]">
              {" "}Management
            </span>
          </h1>

          <p
            className="
              text-[#5f5f5f]

              text-[15px]

              leading-relaxed

              max-w-[620px]
            "
          >
            Create, manage, and track
            infrastructure endpoints with
            intelligent uptime monitoring
            and real-time observability.
          </p>

        </div>

        {/* RIGHT */}

        <Button
          onClick={() =>
            setShowModal(true)
          }
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            rounded-[18px]
          "
        >

          <Plus size={16} />

          New Monitor

        </Button>

      </div>

      {/* FILTER BAR */}

      {
        monitors.length > 0 && (

          <div
            className="
              flex
              items-center
              justify-between

              gap-4

              flex-wrap

              mb-6

              rounded-[26px]

              border
              border-[rgba(255,255,255,0.05)]

              bg-[rgba(14,14,14,0.72)]

              px-4
              py-3
            "
          >

            {/* TABS */}

            <div
              className="
                flex
                items-center
                gap-3

                flex-wrap
              "
            >

              {
                [
                  {
                    label: "All",
                    value: "ALL",
                    count: monitors.length,
                  },

                  {
                    label: "Online",
                    value: "UP",
                    count: upCount,
                    activeColor:
                      "text-[#4ade80]",
                  },

                  {
                    label: "Offline",
                    value: "DOWN",
                    count: downCount,
                    activeColor:
                      "text-[#f87171]",
                  },
                ].map((tab) => (

                  <button
                    key={tab.value}
                    onClick={() =>
                      setFilter(tab.value)
                    }
                    className={`
                      flex
                      items-center
                      gap-3

                      px-4
                      py-2.5

                      rounded-[18px]

                      text-sm
                      font-semibold

                      transition-all
                      duration-300

                      border

                      ${
                        filter === tab.value
                          ? `
                            bg-[rgba(34,197,94,0.06)]

                            border-[rgba(34,197,94,0.12)]

                            text-white
                          `
                          : `
                            border-transparent

                            text-[#5a5a5a]

                            hover:bg-[rgba(255,255,255,0.03)]

                            hover:text-[#d4d4d4]
                          `
                      }
                    `}
                  >

                    <span>
                      {tab.label}
                    </span>

                    <span
                      className={`
                        text-xs

                        ${
                          filter === tab.value
                            ? tab.activeColor ||
                              "text-[#999]"
                            : "text-[#3d3d3d]"
                        }
                      `}
                    >
                      {tab.count}
                    </span>

                  </button>

                ))
              }

            </div>

            {/* RIGHT */}

            <div
              className="
                flex
                items-center
                gap-3

                px-4
                py-2.5

                rounded-[18px]

                border
                border-[rgba(255,255,255,0.05)]

                bg-[rgba(255,255,255,0.02)]
              "
            >

              <SlidersHorizontal
                size={14}
                className="text-[#555]"
              />

              <span
                className="
                  text-[12px]
                  text-[#666]
                  uppercase
                  tracking-[0.18em]
                "
              >
                Filters Active
              </span>

            </div>

          </div>

        )
      }

      {/* GRID */}

      {
        monitors.length === 0 ? (

          <EmptyState
            onAdd={() =>
              setShowModal(true)
            }
          />

        ) : (

          <div
            className="
              grid

              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-3

              gap-4
            "
          >

            {
              filtered.map((monitor) => (

                <MonitorCard
                  key={monitor.id}
                  monitor={monitor}
                  onDelete={deleteMonitor}
                />

              ))
            }

          </div>

        )
      }

      {/* NO FILTER RESULTS */}

      {
        monitors.length > 0 &&
        filtered.length === 0 && (

          <div
            className="
              py-24

              text-center
            "
          >

            <p
              className="
                text-[#4d4d4d]
                text-lg
              "
            >
              No monitors match
              the selected filter.
            </p>

          </div>

        )
      }

      {/* MODAL */}

      {
        showModal && (

          <CreateMonitorModal
            onClose={() =>
              setShowModal(false)
            }
            onCreate={createMonitor}
          />

        )
      }

    </MainLayout>
  );
}

export default MonitorsPage;