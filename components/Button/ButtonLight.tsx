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
      className="overflow-hidden group relative flex flex-col items-center justify-center w-[180px] h-[50px] decoration-0 transition-transform active:scale-95 cursor-pointer outline-none bg-white/0 rounded-lg border-none p-0 isolate"
      style={{ transform: "translateZ(0)" }}
      type="button"
    >
      {/* 1. Base glow and static stroke effects behind the button content */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-[1200ms] opacity-100 rounded-lg"
        style={{
          background: "radial-gradient(15% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
          filter: "blur(15px)"
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-[1200ms] opacity-100 rounded-lg"
        style={{
          background: "radial-gradient(10.7% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)"
        }}
      />

      {/* 2. Animated rotating dot border created with a spinning conic gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-lg pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square animate-[spin_3s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.8) 100%)"
          }}
        />
      </div>

      {/* 3. Black fill with 1px inset to reveal the underlying animated border and stroke */}
      <div className="absolute inset-px pointer-events-none z-10 rounded-[7px] bg-black" />

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