import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string | number }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs uppercase tracking-wider text-[#B0BEC5] font-semibold">
        {label}
      </label>
      <div className="relative">
        <select 
          className="w-full appearance-none bg-[#16424D] border border-[#2C5E6B] rounded-md px-4 py-2.5 text-[#EACF9F] focus:outline-none focus:border-[#D4B483] transition-colors cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#051F25]">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#D4B483]">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
