import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm";
  
  const variants = {
    primary: "bg-cyan-500/80 hover:bg-cyan-400 text-white shadow-cyan-500/30 border border-cyan-400/50",
    danger: "bg-red-500/80 hover:bg-red-400 text-white shadow-red-500/30 border border-red-400/50",
    outline: "bg-transparent border-2 border-white/20 hover:border-white/50 text-white/80 hover:text-white hover:bg-white/5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};