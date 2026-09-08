import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Cinematic() {
  return (
    <div className="w-full">
      <a 
        href="#" 
        className="group relative block w-full min-h-[400px] sm:min-h-[320px] rounded-2xl overflow-hidden text-white no-underline shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(/__mockup/images/obedience-bg.png)` }}
        />
        
        {/* Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        
        {/* Content Container */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-md rounded-full text-white/95 border border-white/20">
              In-Home Training
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-md rounded-full text-white/95 border border-white/20">
              Board & Train
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
            Obedience Training
          </h3>
          
          {/* Blurb */}
          <p className="text-sm sm:text-base text-white/80 mb-6 max-w-sm leading-relaxed">
            From basic commands to advanced control, obedience builds the foundation for confidence, trust, and reliable communication.
          </p>
          
          {/* CTA */}
          <div className="flex items-center text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
            <span>Explore Obedience Training</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </div>
  );
}
