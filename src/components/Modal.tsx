"use client";
import React from "react";

export default function Modal({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <span aria-hidden>×</span>
        </button>
        {children}
      </div>
    </div>
  );
}
