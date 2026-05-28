import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  Activity,
  Clock,
  ShieldCheck,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import axios from "../../api/axios";

import MainLayout from "../../layouts/MainLayout";

import Card from "../../components/ui/Card";

function MonitorDetailsPage() {

  const { id } = useParams();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHistory = async () => {

    try {

      const response =
        await axios.get(
          `/monitors/${id}/history`
        );

      const formatted =
        [...response.data].reverse();

      setHistory(formatted);

    } catch (error) {

      console.error(
        "Failed to load history",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchHistory();

    const interval =
      setInterval(fetchHistory, 30000);

    return () =>
      clearInterval(interval);

  }, [id]);

  const averageResponse = history.length
    ? Math.round(
        history.reduce(
          (acc, item) =>
            acc + item.responseTime,
          0
        ) / history.length
      )
    : 0;

  const upCount =
  history.filter(
    (item) =>
      item.status === "SUCCESS"
  ).length;

  const uptime =
    history.length
      ? Math.round(
          (upCount / history.length) * 100
        )
      : 0;

  return (
    <MainLayout>

      <div className="space-y-8">

        {/* TOP */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

          <div>

            <Link
              to="/monitors"
              className="
                inline-flex
                items-center
                gap-2

                text-sm
                text-[#666]

                hover:text-[#22c55e]

                transition-colors

                mb-4
              "
            >
              <ArrowLeft size={15} />
              Back to monitors
            </Link>

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.28em]

                text-[#22c55e]

                mb-2
                font-semibold
              "
            >
              Monitor Analytics
            </p>

            <h1
              className="
                text-4xl
                md:text-5xl

                font-black
                leading-none
              "
            >
              Monitor Details
            </h1>

            <p
              className="
                text-[#666]
                mt-3
                max-w-2xl
              "
            >
              Real-time monitoring
              insights, uptime tracking,
              latency analytics,
              and historical response
              metrics.
            </p>

          </div>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >

          <Card>

            <div
              className="
                flex
                items-center
                justify-between
                mb-5
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.24em]
                  text-[#555]
                "
              >
                Average Latency
              </p>

              <Clock
                size={18}
                className="text-[#22c55e]"
              />

            </div>

            <h2
              className="
                text-5xl
                font-black
                text-white
              "
            >
              {averageResponse}
              <span
                className="
                  text-xl
                  text-[#777]
                  ml-1
                "
              >
                ms
              </span>
            </h2>

          </Card>

          <Card>

            <div
              className="
                flex
                items-center
                justify-between
                mb-5
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.24em]
                  text-[#555]
                "
              >
                Uptime
              </p>

              <ShieldCheck
                size={18}
                className="text-[#22c55e]"
              />

            </div>

            <h2
              className="
                text-5xl
                font-black
                text-[#4ade80]
              "
            >
              {uptime}
              <span
                className="
                  text-xl
                  text-[#777]
                  ml-1
                "
              >
                %
              </span>
            </h2>

          </Card>

          <Card>

            <div
              className="
                flex
                items-center
                justify-between
                mb-5
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.24em]
                  text-[#555]
                "
              >
                Total Checks
              </p>

              <Activity
                size={18}
                className="text-[#22c55e]"
              />

            </div>

            <h2
              className="
                text-5xl
                font-black
                text-white
              "
            >
              {history.length}
            </h2>

          </Card>

        </div>

        {/* CHART */}

        <Card
          className="
            p-7
            min-h-[420px]
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >

            <div>

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.24em]
                  text-[#22c55e]
                  mb-2
                "
              >
                Response Analytics
              </p>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Response Time Trend
              </h2>

            </div>

            <div
              className="
                flex
                items-center
                gap-2

                px-3
                py-2

                rounded-xl

                bg-[rgba(34,197,94,0.08)]
                border
                border-[rgba(34,197,94,0.18)]
              "
            >

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#22c55e]
                  animate-pulse
                "
              />

              <span
                className="
                  text-sm
                  text-[#4ade80]
                  font-medium
                "
              >
                Live
              </span>

            </div>

          </div>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={history}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="checkedAt"
                  tickFormatter={(value) =>
                    new Date(value)
                      .toLocaleTimeString()
                  }
                  tick={{
                    fill: "#666",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  tick={{
                    fill: "#666",
                    fontSize: 11,
                  }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: "#22c55e",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </Card>

        {/* HISTORY */}

        <Card className="p-0 overflow-hidden">

          <div
            className="
              px-6
              py-5

              border-b
              border-[rgba(255,255,255,0.05)]
            "
          >

            <h2
              className="
                text-xl
                font-bold
              "
            >
              Recent Checks
            </h2>

          </div>

          <div>

            {loading ? (

              <div
                className="
                  p-8
                  text-center
                  text-[#666]
                "
              >
                Loading history...
              </div>

            ) : history.length === 0 ? (

              <div
                className="
                  p-8
                  text-center
                  text-[#666]
                "
              >
                No monitoring history found.
              </div>

            ) : (

              history.map(
                (item, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      justify-between

                      px-6
                      py-4

                      border-b
                      border-[rgba(255,255,255,0.04)]

                      hover:bg-[rgba(255,255,255,0.02)]

                      transition-colors
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
                          w-2.5
                          h-2.5
                          rounded-full

                          ${
                            item.status === "UP"
                              ? "bg-[#22c55e]"
                              : "bg-[#ef4444]"
                          }
                        `}
                      />

                      <div>

                        <p
                          className="
                            font-medium
                            text-white
                          "
                        >
                          {item.status}
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#666]
                          "
                        >
                          {item.checkedAt}
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        text-right
                      "
                    >

                      <p
                        className="
                          text-lg
                          font-bold
                          text-white
                        "
                      >
                        {item.responseTime}ms
                      </p>

                    </div>

                  </div>
                )
              )
            )}

          </div>

        </Card>

      </div>

    </MainLayout>
  );
}

export default MonitorDetailsPage;