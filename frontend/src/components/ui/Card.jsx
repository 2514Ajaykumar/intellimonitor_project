function Card({
  children,
  className = "",
  hover = true,
}) {

  return (
    <div
      className={`
        relative
        overflow-hidden

        rounded-[22px]

        border
        border-[rgba(255,255,255,0.05)]

        bg-[rgba(12,12,12,0.92)]

        shadow-[0_18px_42px_rgba(0,0,0,0.28)]

        backdrop-blur-xl

        p-5

        transition-[transform,border-color,box-shadow,background-color]
        duration-200

        ${
          hover
            ? `
              hover:-translate-y-0.5
              hover:border-[rgba(34,197,94,0.12)]
              hover:bg-[rgba(16,16,16,0.96)]
              hover:shadow-[0_22px_48px_rgba(0,0,0,0.34)]
            `
            : ""
        }

        ${className}
      `}
    >

      <div
        className="
          absolute
          top-0
          left-0
          right-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-[rgba(255,255,255,0.08)]
          to-transparent
        "
      />

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );
}

export default Card;