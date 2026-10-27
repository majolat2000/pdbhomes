"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const whatsappUrl = "https://wa.link/ksxyrq";

  return (
    <aside aria-label="WhatsApp Assistance" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      <div
        className={`bg-white text-slate-800 text-xs font-bold py-2 px-3.5 rounded-2xl shadow-luxury border border-slate-200 transition-all duration-300 pointer-events-none hidden sm:flex items-center gap-2 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Chat with PDB Homes on WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-luxury-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="Chat with PDB Homes on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.969.57 3.844 1.64 5.438L2.016 22l4.672-1.594A10.02 10.02 0 0012.03 22c5.532 0 10.032-4.5 10.032-10.031S17.563 2 12.031 2zm0 18.281c-1.75 0-3.406-.5-4.812-1.406l-.344-.219-2.781.953.953-2.703-.234-.375a8.217 8.217 0 01-1.375-4.5c0-4.563 3.719-8.281 8.281-8.281 4.563 0 8.281 3.718 8.281 8.281 0 4.563-3.718 8.25-8.281 8.25zm4.844-6.172c-.266-.14-.578-.297-1.578-.797-.203-.094-.359-.14-.516.14-.156.281-.609.797-.75.953-.14.156-.281.172-.547.031-.266-.14-1.125-.422-2.14-1.328-.797-.703-1.328-1.578-1.485-1.844-.156-.266-.015-.406.125-.547.125-.125.281-.328.422-.484.14-.172.188-.281.281-.469.094-.188.047-.359-.031-.5-.078-.14-.516-1.25-.719-1.703-.187-.453-.39-.39-.531-.39-.14 0-.313-.016-.485-.016-.172 0-.453.063-.687.328-.235.266-.907.89-.907 2.172s.938 2.516 1.063 2.688c.14.172 1.844 2.828 4.469 3.969.625.265 1.109.437 1.484.562.625.203 1.203.172 1.656.109.516-.078 1.578-.64 1.797-1.265.234-.625.234-1.156.172-1.266-.063-.109-.234-.172-.5-.312z" />
        </svg>
      </a>
    </aside>
  );
}
