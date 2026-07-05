export default function ButtonLight({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center w-[180px] h-[50px] decoration-0 transition-transform active:scale-95 cursor-pointer outline-none bg-white/5 rounded-lg border-none p-0"
      type="button"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-[1200ms] opacity-100 group-hover:opacity-0 rounded-lg"
        style={{
          background: "radial-gradient(15% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
          filter: "blur(15px)"
        }}
      />

      {/* Glow Hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-[1200ms] opacity-0 group-hover:opacity-100 rounded-lg"
        style={{
          background: "radial-gradient(60.6% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
          filter: "blur(18px)"
        }}
      />

      {/* Stroke */}
      <div
        className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-[1200ms] opacity-100 group-hover:opacity-0 rounded-lg"
        style={{
          background: "radial-gradient(10.7% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)"
        }}
      />

      {/* Stroke Hover */}
      <div
        className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-[1200ms] opacity-0 group-hover:opacity-100 rounded-lg"
        style={{
          background: "radial-gradient(60.1% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)"
        }}
      />

      {/* Fill */}
      <div
        className="absolute inset-px pointer-events-none z-10 rounded-[7px] bg-black"
      />

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p
            className="m-0 p-0 font-sans text-[15px] font-medium text-white tracking-wide"
            style={{
              WebkitFontSmoothing: "antialiased",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)"
            }}
          >
            {children}
          </p>
        </div>
      </div>
    </button>
  );
}