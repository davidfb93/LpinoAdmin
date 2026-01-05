import React from "react";

interface LoadingProps {
  text?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  text = "Cargando...",
  icon,
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: {
      container: "w-8 h-8",
      icon: "w-4 h-4",
      text: "text-sm"
    },
    md: {
      container: "w-12 h-12",
      icon: "w-6 h-6",
      text: "text-base"
    },
    lg: {
      container: "w-16 h-16",
      icon: "w-8 h-8",
      text: "text-lg"
    }
  };

  const currentSize = sizeClasses[size];

  const defaultIcon = (
    <svg
      className={`${currentSize.icon} text-white animate-spin`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className={`inline-flex items-center justify-center ${currentSize.container} bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg mb-4`}>
          {icon || defaultIcon}
        </div>
        <p className={`${currentSize.text} text-gray-600`}>{text}</p>
      </div>
    </div>
  );
};
