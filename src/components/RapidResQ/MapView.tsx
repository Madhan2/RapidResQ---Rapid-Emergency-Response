"use client"

import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Ambulance, ShieldAlert, Shield } from 'lucide-react';
import { Emergency, Responder } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MapViewProps {
  emergencies: Emergency[];
  responders: Responder[];
  userLocation?: { lat: number; lng: number };
  className?: string;
}

export const MapView: React.FC<MapViewProps> = ({ 
  emergencies, 
  responders, 
  userLocation = { lat: 28.6139, lng: 77.2090 },
  className 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="w-full h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className={cn("relative w-full h-[400px] bg-slate-900 rounded-3xl overflow-hidden border-4 border-border/50 shadow-2xl", className)}>
      {/* Simulation of a Map Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} 
      />

      {/* User Location */}
      <div className="absolute transition-all duration-1000" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full scale-[3] animate-ping" />
          <div className="bg-primary p-2 rounded-full shadow-lg relative z-10 border-2 border-white">
            <Navigation className="w-5 h-5 text-white fill-current" />
          </div>
        </div>
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold">You</span>
      </div>

      {/* Responders Markers */}
      {responders.map((res, i) => (
        <div 
          key={res.id} 
          className="absolute transition-all duration-1000" 
          style={{ 
            top: `${50 + (i * 15) - 10}%`, 
            left: `${50 + (i * 20) - 20}%` 
          }}
        >
          <div className="bg-secondary p-1.5 rounded-lg shadow-lg border border-white/20">
            {res.type === 'ambulance' ? <Ambulance className="w-4 h-4 text-background" /> : <Shield className="w-4 h-4 text-background" />}
          </div>
        </div>
      ))}

      {/* Active Emergencies Markers */}
      {emergencies.filter(e => e.status !== 'resolved').map((e, i) => (
        <div 
          key={e.id} 
          className="absolute" 
          style={{ 
            top: '30%', 
            left: '70%' 
          }}
        >
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-destructive/40 rounded-full scale-[2] animate-pulse" />
            <div className="bg-destructive p-2 rounded-full shadow-lg relative z-10 border-2 border-white">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card border border-border p-2 rounded-lg text-xs shadow-xl pointer-events-none">
              <p className="font-bold text-destructive uppercase">{e.type}</p>
              <p className="text-muted-foreground">{e.severity} severity</p>
            </div>
          </div>
        </div>
      ))}

      {/* Map UI Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-card/80 backdrop-blur-md border border-border px-3 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-medium">{responders.length} Responders Active</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-card/90 border border-border p-2 rounded-lg shadow-lg text-primary hover:bg-card">
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
