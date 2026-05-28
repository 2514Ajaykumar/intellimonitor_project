function Input({ className = "", label, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium tracking-widest text-[#555] uppercase mb-2 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-5 py-4 rounded-2xl
          bg-[rgba(255,255,255,0.03)]
          border border-[rgba(255,255,255,0.07)]
          text-[#f0f0f0] text-sm
          outline-none
          transition-all duration-300

          placeholder:text-[#3d3d3d]

          focus:border-[rgba(34,197,94,0.35)]
          focus:bg-[rgba(34,197,94,0.03)]
          focus:shadow-[0_0_0_1px_rgba(34,197,94,0.15),inset_0_0_20px_rgba(34,197,94,0.02)]

          hover:border-[rgba(255,255,255,0.12)]

          ${className}
        `}
        {...props}
      />
    </div>
  );
}

export default Input;
