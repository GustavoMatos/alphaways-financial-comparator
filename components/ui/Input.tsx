import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
}

export const Input: React.FC<InputProps> = ({ label, suffix, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs uppercase tracking-wider text-[#B0BEC5] font-semibold">
        {label}
      </label>
      <div className="relative group">
        <input 
          className="w-full bg-[#16424D] border border-[#2C5E6B] rounded-md px-4 py-2.5 text-[#EACF9F] font-mono focus:outline-none focus:border-[#D4B483] transition-colors placeholder-[#2C5E6B]"
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C5E6B] text-sm font-mono">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
