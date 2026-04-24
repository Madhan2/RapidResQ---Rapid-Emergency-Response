"use client"

import React from 'react';
import { EmergencyType } from '@/lib/types';
import { 
  Heart, 
  Flame, 
  Zap, 
  UserPlus,
  PhoneCall,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BystanderInstructionsProps {
  type: EmergencyType;
}

export const BystanderInstructions: React.FC<BystanderInstructionsProps> = ({ type }) => {
  const getInstructions = (type: EmergencyType) => {
    switch (type) {
      case 'cardiac':
        return {
          title: "CPR Instructions",
          steps: [
            "Check for breathing and pulse.",
            "Call 911/112 immediately.",
            "Push hard and fast in the center of the chest.",
            "Maintain 100-120 compressions per minute.",
            "Allow chest to recoil completely."
          ],
          icon: Heart,
          color: "text-red-500"
        };
      case 'accident':
        return {
          title: "Trauma Care",
          steps: [
            "Do not move the victim unless in immediate danger.",
            "Apply pressure to any bleeding wounds.",
            "Keep the person warm.",
            "Check for head injuries or neck pain.",
            "Stay with the person until help arrives."
          ],
          icon: Activity,
          color: "text-orange-500"
        };
      case 'fire':
        return {
          title: "Fire Safety",
          steps: [
            "Evacuate the building immediately.",
            "Stay low to the ground to avoid smoke.",
            "Stop, Drop, and Roll if clothes catch fire.",
            "Do not use elevators.",
            "Feel doors for heat before opening."
          ],
          icon: Flame,
          color: "text-red-600"
        };
      default:
        return {
          title: "General First Aid",
          steps: [
            "Assess the scene for safety.",
            "Alert professional responders via RapidResQ.",
            "Stay calm and reassure the victim.",
            "Collect basic medical info if possible.",
            "Follow dispatcher instructions."
          ],
          icon: UserPlus,
          color: "text-blue-500"
        };
    }
  };

  const info = getInstructions(type);

  return (
    <Card className="bg-card border-border border-l-4 border-l-primary shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 bg-primary/5 pb-4">
        <info.icon className={`w-6 h-6 ${info.color}`} />
        <CardTitle className="text-xl font-bold">{info.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {info.steps.map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-[10px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-4">
          <PhoneCall className="w-6 h-6 text-destructive" />
          <div>
            <p className="text-xs font-bold text-destructive uppercase">Emergency Contact</p>
            <p className="text-sm font-black">Direct Line: 112 / 100</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
