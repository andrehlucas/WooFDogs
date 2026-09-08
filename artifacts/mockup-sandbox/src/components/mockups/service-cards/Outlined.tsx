import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Outlined() {
  return (
    <div className="w-full p-4">
      <a 
        href="#"
        className="group block w-full min-h-[320px] bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden"
        style={{ borderLeft: '4px solid #b02020' }}
      >
        <div className="flex flex-col-reverse sm:flex-row gap-8 h-full justify-between items-start">
          
          <div className="flex flex-col flex-grow justify-between h-full min-h-[250px]">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-[#b02020] transition-colors duration-300">
                Obedience Training
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 rounded-full bg-white shadow-sm">
                  In-Home Training
                </span>
                <span className="px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 rounded-full bg-white shadow-sm">
                  Board & Train
                </span>
              </div>
              
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                From basic commands to advanced control, obedience builds the foundation for confidence, trust, and reliable communication.
              </p>
            </div>
            
            <div className="mt-8 flex items-center text-[#b02020] font-bold text-sm uppercase tracking-widest transition-transform w-fit group-hover:gap-3 gap-2">
              Explore Obedience Training <ArrowRight className="w-4 h-4 transition-all" />
            </div>
          </div>
          
          <div className="shrink-0 w-full sm:w-auto flex justify-end">
            <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md border border-gray-100">
              <img 
                src="/__mockup/images/obedience-bg.png" 
                alt="Obedience Training"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
          
        </div>
      </a>
    </div>
  );
}
