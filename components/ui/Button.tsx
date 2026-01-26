import React from 'react';
import { COLORS } from '../../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: `bg-[#D4B483] text-[#051F25] hover:bg-[#EACF9F] shadow-lg shadow-[#D4B483]/20`,
    secondary: `bg-[#2563EB] text-white hover:bg-[#1D4ED8]`,
    outline: `border-2 border-[#2C5E6B] text-[#B0BEC5] hover:border-[#D4B483] hover:text-[#D4B483] bg-transparent`
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
