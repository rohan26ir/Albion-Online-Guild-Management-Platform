'use client';

import React, { useState } from "react";
import Link from "next/link";
import { IconCheck, IconEye, IconEyeOff } from "@tabler/icons-react";

// --- ALBION PARCHMENT CAPSULE INPUT ---
interface AlbionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isPassword?: boolean;
}

export function AlbionInput({
  label,
  isPassword = false,
  type = "text",
  className = "",
  ...props
}: AlbionInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-xs font-serif uppercase tracking-wider text-[#d5c7b3] font-semibold pl-3">
          {label}
        </label>
      )}
      <div className="relative group w-full">
        {/* Outer subtle bevel ring */}
        <div className="relative w-full rounded-full p-[2px] bg-gradient-to-b from-[#4a3f33] via-[#2a2219] to-[#1a140e] shadow-[0_2px_5px_rgba(0,0,0,0.7)] group-focus-within:from-[#caa048] group-focus-within:to-[#7a5818] transition-all duration-200">
          <div className="relative flex items-center w-full rounded-full overflow-hidden bg-gradient-to-b from-[#caa87c] via-[#b59266] to-[#8d6f48] shadow-[inset_0_3px_5px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(0,0,0,0.5),inset_0_-1px_2px_rgba(255,255,255,0.25)]">
            <input
              type={inputType}
              className={`w-full bg-transparent px-5 py-2.5 text-[#241a10] font-sans font-semibold text-sm placeholder-[#6c5843] focus:outline-none selection:bg-[#725330] selection:text-white ${
                isPassword ? "pr-11" : ""
              } ${className}`}
              {...props}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3b2e21] hover:text-[#18110a] transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IconEyeOff size={18} stroke={2.2} />
                ) : (
                  <IconEye size={18} stroke={2.2} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ALBION CIRCULAR COIN/SEAL CHECKBOX ---
interface AlbionCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
}

export function AlbionCheckbox({ checked, onChange, label, id }: AlbionCheckboxProps) {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={checkboxId}
      className="inline-flex items-center gap-2.5 cursor-pointer select-none group"
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {/* Outer metallic bevel ring */}
      <div
        className={`w-5 h-5 shrink-0 rounded-full p-[1.5px] bg-gradient-to-b ${
          checked
            ? "from-[#7e8597] via-[#484f5f] to-[#252831] shadow-[0_0_8px_rgba(229,183,88,0.3)]"
            : "from-[#575d6c] to-[#23262e]"
        } transition-all duration-150 group-hover:from-[#929cb2] group-hover:to-[#353945]`}
      >
        <div className="w-full h-full rounded-full bg-[#12141a] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] border border-[#2b2f3a]/60">
          {checked && (
            <IconCheck
              size={12}
              stroke={3.5}
              className="text-[#e2dacb] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
            />
          )}
        </div>
      </div>
      <span className="text-xs font-serif text-[#d6cdbf] group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

// --- ALBION PILL BUTTON (FOR "FORGOT PASSWORD?") ---
export function AlbionPillButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <div className="inline-block rounded-full p-[1.5px] bg-gradient-to-b from-[#565d6e] via-[#3d424e] to-[#1c1e24] shadow-[0_3px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:from-[#757d92] transition-all group">
      <div className="rounded-full px-4 py-1.5 bg-gradient-to-b from-[#2a2e38] via-[#1e2128] to-[#13151a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-2px_3px_rgba(0,0,0,0.7)] flex items-center justify-center">
        <span className="text-xs font-serif font-bold text-[#e5b758] tracking-wide group-hover:text-[#ffd77d] group-hover:drop-shadow-[0_0_8px_rgba(229,183,88,0.7)] transition-all">
          {children}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block focus:outline-none">
      {content}
    </button>
  );
}

// --- ALBION OVAL BACK BUTTON (<<) ---
export function AlbionBackButton({
  href = "/",
  onClick,
  title = "Back",
}: {
  href?: string;
  onClick?: () => void;
  title?: string;
}) {
  const content = (
    <div
      title={title}
      className="inline-block rounded-full p-[2px] bg-gradient-to-b from-[#565d6e] via-[#3a3f4b] to-[#181a20] shadow-[0_3px_6px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:from-[#7c869e] hover:shadow-[0_0_10px_rgba(229,183,88,0.4)] transition-all group active:scale-95"
    >
      <div className="w-14 h-9 rounded-full bg-gradient-to-b from-[#2a2e38] via-[#1d2027] to-[#111318] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
        <div className="flex items-center gap-[-2px] text-[#e5b758] group-hover:text-[#ffd77d] group-hover:drop-shadow-[0_0_6px_rgba(229,183,88,0.8)] transition-all">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <svg
            className="w-4 h-4 -ml-2.5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="focus:outline-none">
      {content}
    </button>
  );
}

// --- ALBION STONE SLAB SUBMIT BUTTON ---
export function AlbionSubmitButton({
  children,
  isLoading = false,
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`relative group p-[2px] rounded-xl bg-gradient-to-b from-[#5c6374] via-[#3a3f4c] to-[#181a20] shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:from-[#7e879c] transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none ${className}`}
    >
      <div className="relative px-8 py-2.5 rounded-[10px] bg-gradient-to-b from-[#2b2f3a] via-[#1d2027] to-[#101217] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.85)] flex items-center justify-center min-w-[120px] overflow-hidden">
        {/* Subtle stone texture highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {isLoading ? (
          <div className="flex items-center gap-2 text-[#e5b758]">
            <div className="w-4 h-4 border-2 border-[#e5b758]/30 border-t-[#e5b758] rounded-full animate-spin" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#e5b758]">
              Loading...
            </span>
          </div>
        ) : (
          <span className="text-sm font-serif font-extrabold uppercase tracking-[0.18em] text-[#9ca3af] group-hover:text-[#ffd77d] group-hover:drop-shadow-[0_0_8px_rgba(229,183,88,0.7)] transition-all">
            {children}
          </span>
        )}
      </div>
    </button>
  );
}
