import React from 'react';
import { ArrowRight } from "lucide-react";

export function Frosted() {
  return (
    <div className="w-full">
      <a 
        href="#" 
        className="group relative flex flex-col justify-end w-full min-h-[380px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#b02020] focus:ring-offset-2"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: 'url(/__mockup/images/obedience-bg.png)' }}
        />
        
        {/* Frosted Glass Panel */}
        <div className="relative p-6 backdrop-blur-xl bg-white/40 border-t border-white/50 shadow-[0_-8px_32px_rgba(0,0,0,0.1)] transition-colors duration-300 group-hover:bg-white/50">
          
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-b-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-white/60 shadow-sm border border-white/40 px-2.5 py-0.5 text-xs font-semibold text-slate-800 backdrop-blur-md">
              In-Home Training
            </span>
            <span className="inline-flex items-center rounded-full bg-white/60 shadow-sm border border-white/40 px-2.5 py-0.5 text-xs font-semibold text-slate-800 backdrop-blur-md">
              Board & Train
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight drop-shadow-sm">
            Obedience Training
          </h3>
          
          <p className="text-sm text-slate-800 font-medium mb-5 leading-relaxed drop-shadow-sm">
            From basic commands to advanced control, obedience builds the foundation for confidence, trust, and reliable communication.
          </p>
          
          <div className="flex items-center text-[#b02020] font-bold text-sm tracking-wide">
            Explore Obedience Training
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </div>
        </div>
      </a>
    </div>
  );
}
