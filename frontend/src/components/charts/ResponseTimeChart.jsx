import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ResponseTimeChart({
  data
}) {

  return (
    <div
      className="
        bg-[#0d0d0d]
        border
        border-white/5
        rounded-3xl
        p-6
      "
    >

      {/* HEADER */}

      <div className="mb-8">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-[#22c55e]
            font-semibold
            mb-3
          "
        >
          ANALYTICS
        </p>

        <h2
          className="
            text-3xl
            font-black
            text-white
          "
        >
          Response Time Trends
        </h2>

      </div>

      {/* CHART */}

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />

            <XAxis
              dataKey="time"
              stroke="#666"
              tick={{
                fontSize: 11,
              }}
            />

            <YAxis
              stroke="#666"
              tick={{
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                background:
                  "#0d0d0d",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius:
                  "18px",

                color:
                  "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ResponseTimeChart;