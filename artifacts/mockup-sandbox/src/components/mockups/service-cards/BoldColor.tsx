import React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";

export function BoldColor() {
  return (
    <div className="w-full">
      <a
        href="#"
        className="group relative block w-full min-h-[320px] rounded-2xl overflow-hidden bg-[#b02020] text-white p-8 md:p-10 transition-transform duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl"
      >
        {/* Abstract pattern texture */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white text-[#b02020] hover:bg-white/90 uppercase tracking-wider text-xs font-bold px-3 py-1">
                In-Home Training
              </Badge>
              <Badge variant="secondary" className="bg-white text-[#b02020] hover:bg-white/90 uppercase tracking-wider text-xs font-bold px-3 py-1">
                Board & Train
              </Badge>
            </div>
            
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
                Obedience<br />Training
              </h3>
              <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                From basic commands to advanced control, obedience builds the foundation for confidence, trust, and reliable communication.
              </p>
            </div>
          </div>

          <div className="flex items-center text-lg font-bold group-hover:gap-4 gap-2 transition-all duration-300 mt-4">
            <span>Explore Obedience Training</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </a>
    </div>
  );
}
