function IncidentCard({ incident }) {

  const isOpen =
    incident.status === "OPEN";

  return (
    <div
      className="
        bg-[#0d0d0d]
        border
        rounded-3xl
        p-5

        transition-all
        duration-300

        hover:border-[#2a2a2a]

        relative
        overflow-hidden
      "
      style={{
        borderColor: isOpen
          ? "rgba(239,68,68,0.25)"
          : "rgba(34,197,94,0.18)",
      }}
    >

      {/* STATUS GLOW */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-[2px]
        "
        style={{
          background: isOpen
            ? "#ef4444"
            : "#22c55e",
        }}
      />

      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          mb-4
        "
      >

        <div>

          <h3
            className="
              text-xl
              font-bold
              text-white
              mb-1
            "
          >
            {incident.monitorName}
          </h3>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-neutral-500
            "
          >
            Incident #{incident.id}
          </p>

        </div>

        <div
          className="
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
          "
          style={{
            background: isOpen
              ? "rgba(239,68,68,0.12)"
              : "rgba(34,197,94,0.12)",

            color: isOpen
              ? "#f87171"
              : "#4ade80",
          }}
        >
          {incident.status}
        </div>

      </div>

      {/* MESSAGE */}

      <div
        className="
          text-sm
          leading-7
          text-neutral-300
          mb-5
          break-words
        "
      >
        {incident.message}
      </div>

      {/* FOOTER */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
          pt-4
          border-t
          border-white/5
        "
      >

        <div>

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-neutral-500
              mb-1
            "
          >
            Started
          </p>

          <p
            className="
              text-sm
              text-white
            "
          >
            {incident.startedAt}
          </p>

        </div>

        <div>

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-neutral-500
              mb-1
            "
          >
            Resolved
          </p>

          <p
            className="
              text-sm
              text-white
            "
          >
            {
              incident.resolvedAt ||
              "Still Active"
            }
          </p>

        </div>

        <div>

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-neutral-500
              mb-1
            "
          >
            Duration
          </p>

          <p
            className="
              text-sm
              text-white
            "
          >
            {
              incident.durationSeconds
                ? `${incident.durationSeconds}s`
                : "Running"
            }
          </p>

        </div>

      </div>

    </div>
  );
}

export default IncidentCard;