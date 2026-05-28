import Card from "./ui/Card";

const colorMap = {

  "Total Monitors": {
    icon: "#737373",
    value: "#f5f5f5",
  },

  "UP Monitors": {
    icon: "#22c55e",
    value: "#4ade80",
  },

  "DOWN Monitors": {
    icon: "#ef4444",
    value: "#f87171",
  },

  "Avg Response": {
    icon: "#9a9a9a",
    value: "#f5f5f5",
  },
};

function StatsCard({
  title,
  value,
}) {

  const colors =
    colorMap[title] ||
    colorMap["Total Monitors"];

  return (
    <Card
      className="
        min-h-[116px]

        flex
        flex-col
        justify-between
      "
    >

      <div
        className="
          flex
          items-start
          justify-between

          mb-3
        "
      >

        <div>

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]

              text-[#5f5f5f]

              font-semibold

              mb-2
            "
          >
            {title}
          </p>

          <h2
            className="
              text-[30px]

              font-black

              tracking-[-0.05em]

              leading-none
            "
            style={{
              color: colors.value,
            }}
          >
            {value}
          </h2>

        </div>

        <div
          className="
            w-9
            h-9

            rounded-[18px]

            border

            flex
            items-center
            justify-center

            text-base
          "
          style={{
            color: colors.icon,
            background: `${colors.icon}10`,
            borderColor: `${colors.icon}15`,
          }}
        >
          ●
        </div>

      </div>

      <div
        className="
          h-px
          bg-[rgba(255,255,255,0.05)]
        "
      />

    </Card>
  );
}

export default StatsCard;