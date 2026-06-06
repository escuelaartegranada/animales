import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-colors focus:outline-none select-none touch-manipulation";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_4px_0_theme(colors.blue.700)] active:shadow-none active:translate-y-1",
    secondary: "bg-purple-500 text-white hover:bg-purple-600 shadow-[0_4px_0_theme(colors.purple.700)] active:shadow-none active:translate-y-1",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-[0_4px_0_theme(colors.green.700)] active:shadow-none active:translate-y-1",
    warning: "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-[0_4px_0_theme(colors.yellow.600)] active:shadow-none active:translate-y-1",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_0_theme(colors.red.700)] active:shadow-none active:translate-y-1",
    ghost: "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-xl min-h-[64px]",
    xl: "px-10 py-5 text-2xl min-h-[80px]"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="mr-3 w-6 h-6" />}
      {children}
    </motion.button>
  );
}

export function Card({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`bg-white rounded-3xl p-6 shadow-xl border-4 border-white/50 backdrop-blur-sm ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AnimalCard({ emoji, name, className = '' }: { emoji: string; name: string; className?: string }) {
  return (
    <div className={`bg-white/80 rounded-2xl p-4 flex flex-col items-center justify-center shadow border-2 border-blue-100 ${className}`}>
      <span className="text-6xl mb-2">{emoji}</span>
      <span className="font-bold text-gray-700 text-center leading-tight">{name}</span>
    </div>
  );
}
