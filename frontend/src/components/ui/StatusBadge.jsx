function StatusBadge({ status }) {
  const isUp = status === "UP";

  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-3.5 py-1.5
        rounded-full text-xs font-semibold tracking-wider uppercase
        border
        ${
          isUp
            ? "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)] text-[#4ade80]"
            : "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-[#f87171]"
        }
      `}
    >
      <span
        className={`
          w-1.5 h-1.5 rounded-full
          ${isUp ? "bg-[#4ade80] animate-pulse-dot" : "bg-[#f87171]"}
        `}
      />
      {status}
    </div>
  );
}

export default StatusBadge;
