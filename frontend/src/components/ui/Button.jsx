function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const base = `
    inline-flex items-center justify-center gap-2
    font-semibold tracking-wide
    transition-all duration-300 ease-out
    cursor-pointer select-none
    disabled:opacity-40 disabled:cursor-not-allowed
  `;

  const sizes = {
    sm: "px-4 py-2.5 text-sm rounded-xl",
    md: "px-6 py-3.5 text-sm rounded-2xl",
    lg: "px-8 py-4 text-base rounded-2xl",
  };

  const variants = {
    primary: `
      bg-[#22c55e] text-black
      hover:bg-[#4ade80]
      hover:shadow-[0_8px_32px_rgba(34,197,94,0.35)]
      active:scale-[0.97]
      active:shadow-none
    `,
    ghost: `
      bg-transparent text-[#f0f0f0]
      border border-[rgba(255,255,255,0.08)]
      hover:border-[rgba(255,255,255,0.15)]
      hover:bg-[rgba(255,255,255,0.04)]
      active:scale-[0.97]
    `,
    danger: `
      bg-[rgba(239,68,68,0.1)] text-[#ef4444]
      border border-[rgba(239,68,68,0.2)]
      hover:bg-[rgba(239,68,68,0.18)]
      hover:border-[rgba(239,68,68,0.35)]
      active:scale-[0.97]
    `,
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
