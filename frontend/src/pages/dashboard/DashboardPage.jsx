import { useEffect, useState } from "react";

import {
  ArrowRight,
  Zap,
} from "lucide-react";

import axios from "../../api/axios";

import MainLayout from "../../layouts/MainLayout";

import StatsCard from "../../components/StatsCard";
import ResponseTimeChart
from "../../components/charts/ResponseTimeChart";

import {
  getResponseTimes
} from "../../services/analyticsService";

/* MINI CHART */

function Sparkline({
  color = "#22c55e",
  up = true,
}) {

  const points = up
    ? "0,26 8,20 16,22 24,16 32,18 40,12 48,8 56,12 64,6 72,10 80,5"
    : "0,8 8,12 16,10 24,16 32,14 40,20 48,18 56,24 64,22 72,28 80,26";

  return (
    <svg
      width="72"
      height="32"
      viewBox="0 0 80 36"
      fill="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

/* ACTIVITY ROW */

function ActivityRow({
  label,
  value,
  status,
  time,
}) {

  const isUp = status === "UP";

  return (
    <div
      className="
        flex
        items-center
        gap-4

        py-4
        px-3

        border-b
        border-[rgba(255,255,255,0.04)]

        last:border-0

        rounded-xl

        transition-all
        duration-200

        hover:bg-[rgba(255,255,255,0.025)]
      "
    >

      <div
        className={`
          w-2
          h-2
          rounded-full
          flex-shrink-0

          ${
            isUp
              ? "bg-[#22c55e]"
              : "bg-[#ef4444]"
          }
        `}
      />

      <span
        className="
          text-[13px]
          text-[#8a8a8a]

          flex-1
          truncate
        "
      >
        {label}
      </span>

      <span
        className={`
          text-[11px]
          font-semibold
          font-mono

          ${
            isUp
              ? "text-[#4ade80]"
              : "text-[#f87171]"
          }
        `}
      >
        {value}
      </span>

      <span
        className="
          text-[10px]
          text-[#4a4a4a]

          font-mono
          flex-shrink-0
        "
      >
        {time}
      </span>

    </div>
  );
}

function DashboardPage() {

  const [stats, setStats] =
    useState(null);

  const [activities, setActivities] =
    useState([]);
  const [chartData, setChartData] =
  useState([]);

  const [loading, setLoading] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState("");

  const fetchDashboardData =
  async () => {

    try {

      const [
        statsResponse,
        activityResponse,
        analyticsData,
      ] = await Promise.all([

        axios.get(
          "/dashboard/stats"
        ),

        axios.get(
          "/dashboard/activity"
        ),

        getResponseTimes(),
      ]);

      setStats(
        statsResponse.data
      );

      setActivities(
        activityResponse.data
      );

      /*
       * RESPONSE TIME CHART
       */

      // setChartData(
      //   analyticsData.reverse()
      // );
      setChartData(
        [...analyticsData].reverse()
      );

      setLastUpdated(
        new Date().toLocaleTimeString()
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchDashboardData();

    const interval =
      setInterval(async () => {

        await fetchDashboardData();

      }, 15000);

    return () => {

      clearInterval(interval);
    };

  }, []);

  const uptimePercent =
    stats
      ? Math.round(
          stats.uptimePercentage || 0
        )
      : 0;

  return (
    <MainLayout>

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          xl:flex-row

          xl:items-end
          xl:justify-between

          gap-6

          mb-8
        "
      >

        <div className="max-w-[720px]">

          <p
            className="
              text-[10px]
              uppercase

              tracking-[0.28em]

              text-[#22c55e]

              mb-4

              font-semibold
            "
          >
            Infrastructure Intelligence
          </p>

          <h1
            className="
              text-[32px]
              sm:text-[38px]
              xl:text-[46px]

              font-black

              tracking-tight

              leading-[0.95]

              mb-5
            "
          >
            Monitoring
            <span className="text-[#2f2f2f]">
              {" "}Command Center
            </span>
          </h1>

          <p
            className="
              text-[#666]

              text-[14px]
              sm:text-[15px]

              leading-relaxed

              max-w-[680px]
            "
          >
            Real-time infrastructure visibility,
            uptime analytics, latency tracking,
            and intelligent observability insights.
          </p>

          {/* LIVE STATUS */}

          <div
            className="
              flex
              items-center
              gap-2

              mt-5
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
                text-[11px]
                text-[#666]

                font-mono
                tracking-wide
              "
            >
              Live updates • {lastUpdated}
            </span>

          </div>

        </div>

      </div>

      {/* LOADING */}

      {
        loading && (

          <div
            className="
              text-center
              py-24
              text-[#555]
            "
          >
            Loading dashboard...
          </div>

        )
      }

      {/* CONTENT */}

      {
        !loading && stats && (

          <>

            {/* STATS */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4

                gap-5

                mb-6
              "
            >

              <StatsCard
                title="Total Monitors"
                value={stats.totalMonitors}
              />

              <StatsCard
                title="UP Monitors"
                value={stats.upMonitors}
              />

              <StatsCard
                title="DOWN Monitors"
                value={stats.downMonitors}
              />

              <StatsCard
                title="Avg Response"
                value={`${Math.round(
                  stats.averageResponseTime || 0
                )}ms`}
              />

            </div>

            {/* MAIN GRID */}

            <div
              className="
                grid
                grid-cols-1

                xl:grid-cols-[1fr_1.2fr]

                gap-5

                mb-6
              "
            >

              {/* UPTIME */}

              <div
                className="
                  relative

                  rounded-[28px]

                  border
                  border-[rgba(255,255,255,0.05)]

                  bg-[rgba(12,12,12,0.92)]

                  p-6

                  overflow-hidden
                "
              >

                <p
                  className="
                    text-[10px]
                    uppercase

                    tracking-[0.22em]

                    text-[#4f4f4f]

                    mb-6
                  "
                >
                  System Uptime
                </p>

                <div
                  className="
                    flex
                    items-end
                    gap-2

                    mb-8
                  "
                >

                  <span
                    className="
                      text-[54px]
                      xl:text-[64px]

                      font-black

                      leading-none
                    "
                  >
                    {uptimePercent}
                  </span>

                  <span
                    className="
                      text-2xl
                      text-[#444]

                      font-bold

                      mb-1
                    "
                  >
                    %
                  </span>

                </div>

                <div
                  className="
                    h-2.5

                    rounded-full

                    bg-[rgba(255,255,255,0.04)]

                    overflow-hidden
                  "
                >

                  <div
                    className="
                      h-full

                      rounded-full

                      bg-gradient-to-r
                      from-[#22c55e]
                      to-[#4ade80]
                    "
                    style={{
                      width: `${uptimePercent}%`,
                    }}
                  />

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2

                  gap-4
                "
              >

                {
                  [
                    {
                      label: "Health Score",
                      value: uptimePercent,
                      suffix: "/100",
                      trend: "up",
                      color: "#22c55e",
                      sub: "Infrastructure",
                    },
                    {
                      label: "Avg Latency",
                      value: Math.round(
                        stats.averageResponseTime || 0
                      ),
                      suffix: "ms",
                      trend: "down",
                      color: "#f0f0f0",
                      sub: "Response time",
                    },
                    {
                      label: "Active Checks",
                      value: stats.upMonitors,
                      suffix: "",
                      trend: "up",
                      color: "#22c55e",
                      sub: "Running now",
                    },
                    {
                      label: "Alert Rate",
                      value: stats.downMonitors,
                      suffix: "",
                      trend:
                        stats.downMonitors > 0
                          ? "down"
                          : "up",
                      color:
                        stats.downMonitors > 0
                          ? "#ef4444"
                          : "#22c55e",
                      sub: "Incidents",
                    },
                  ].map((item) => (

                    <div
                      key={item.label}
                      className="
                        rounded-[24px]

                        border
                        border-[rgba(255,255,255,0.05)]

                        bg-[rgba(12,12,12,0.92)]

                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                        "
                      >

                        <div>

                          <p
                            className="
                              text-[10px]
                              uppercase

                              tracking-[0.18em]

                              text-[#4f4f4f]

                              mb-4
                            "
                          >
                            {item.label}
                          </p>

                          <div
                            className="
                              flex
                              items-end
                              gap-1
                            "
                          >

                            <span
                              className="
                                text-[30px]

                                font-black

                                leading-none
                              "
                            >
                              {item.value}
                            </span>

                            {
                              item.suffix && (

                                <span
                                  className="
                                    text-[12px]
                                    text-[#555]

                                    mb-1
                                  "
                                >
                                  {item.suffix}
                                </span>

                              )
                            }

                          </div>

                          <p
                            className="
                              text-[11px]
                              text-[#555]

                              mt-3
                            "
                          >
                            {item.sub}
                          </p>

                        </div>

                        <Sparkline
                          color={item.color}
                          up={item.trend === "up"}
                        />

                      </div>

                    </div>

                  ))
                }

              </div>

            </div>
            {/* RESPONSE TIME ANALYTICS */}

            <div className="mb-6">

              <ResponseTimeChart
                data={chartData}
              />

            </div>

            {/* ACTIVITY */}

            <div
              className="
                rounded-[28px]

                border
                border-[rgba(255,255,255,0.05)]

                bg-[rgba(12,12,12,0.92)]

                p-6

                min-h-[420px]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between

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
                      w-10
                      h-10

                      rounded-xl

                      bg-[rgba(34,197,94,0.06)]

                      border
                      border-[rgba(34,197,94,0.10)]

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Zap
                      size={16}
                      className="text-[#22c55e]"
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-[17px]
                        font-semibold
                      "
                    >
                      System Activity
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-[#555]

                        mt-1
                      "
                    >
                      Recent monitoring events
                    </p>

                  </div>

                </div>

                <button
                  className="
                    flex
                    items-center
                    gap-2

                    text-[10px]
                    uppercase

                    tracking-[0.18em]

                    text-[#555]

                    hover:text-[#4ade80]

                    transition-all
                  "
                >

                  Live Feed

                  <ArrowRight size={11} />

                </button>

              </div>

              <div>

                {
                  activities.length > 0 ? (

                    activities.map(
                      (activity, index) => (

                        <ActivityRow
                          key={index}
                          label={
                            activity.monitorName
                          }
                          value={`${activity.responseTime}ms`}
                          status={activity.status}
                          time={activity.checkedAt}
                        />

                      )
                    )

                  ) : (

                    <div
                      className="
                        py-16

                        text-center

                        text-[#444]
                        text-sm
                      "
                    >
                      No recent activity found.
                    </div>

                  )
                }

              </div>

            </div>

          </>

        )
      }

    </MainLayout>
  );
}

export default DashboardPage;