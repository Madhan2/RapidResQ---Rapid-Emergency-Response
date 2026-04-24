"use client"

import React from 'react';
import { EmergencyType } from '@/lib/types';
import { Car, Activity, Flame, ShieldAlert, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyTypeGridProps {
  onSelect: (type: EmergencyType) => void;
}

export const EmergencyTypeGrid: React.FC<EmergencyTypeGridProps> = ({ onSelect }) => {
  const types: { id: EmergencyType; label: string; icon: any; color: string }[] = [
    { id: 'accident', label: 'ACCIDENT', icon: Car, color: 'bg-accent/20 text-accent border-accent/50' },
    { id: 'medical', label: 'MEDICAL', icon: Activity, color: 'bg-primary/20 text-primary border-primary/50' },
    { id: 'fire', label: 'FIRE', icon: Flame, color: 'bg-orange-500/20 text-orange-500 border-orange-500/50' },
    { id: 'crime', label: 'CRIME', icon: ShieldAlert, color: 'bg-red-600/20 text-red-600 border-red-600/50' },
    { id: 'other', label: 'OTHER', icon: MoreHorizontal, color: 'bg-muted text-muted-foreground border-border' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={cn(
            "flex flex-col items-center justify-center gap-4 h-40 rounded-3xl border-2 transition-all active:scale-95 text-center",
            type.color
          )}
        >
          <type.icon className="w-12 h-12" />
          <span className="text-lg font-black tracking-tight">{type.label}</span>
        </button>
      ))}
    </div>
  );
};
