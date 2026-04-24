"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EmergencyType, EmergencySeverity } from '@/lib/types';
import { 
  Flame, 
  Activity, 
  Car, 
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';

interface SOSButtonProps {
  onTrigger: (type: EmergencyType, severity: EmergencySeverity) => void;
  isLoading?: boolean;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onTrigger, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const emergencyTypes: { type: EmergencyType; icon: any; label: string; color: string }[] = [
    { type: 'accident', icon: Car, label: 'Accident', color: 'bg-orange-500' },
    { type: 'cardiac', icon: Activity, label: 'Cardiac', color: 'bg-red-500' },
    { type: 'fire', icon: Flame, label: 'Fire', color: 'bg-red-600' },
    { type: 'other', icon: AlertCircle, label: 'Other', color: 'bg-blue-500' },
  ];

  const handleTrigger = (type: EmergencyType) => {
    onTrigger(type, 'high');
    setTriggered(true);
    setIsOpen(false);
    setTimeout(() => setTriggered(false), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      {!triggered ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              className={cn(
                "relative group flex items-center justify-center w-48 h-48 rounded-full bg-primary text-white font-bold text-3xl transition-all active:scale-95 sos-glow pulse-animation",
                isLoading && "opacity-50 pointer-events-none"
              )}
            >
              <div className="flex flex-col items-center">
                {isLoading ? <Loader2 className="w-12 h-12 animate-spin mb-2" /> : "SOS"}
                <span className="text-xs font-normal uppercase tracking-widest mt-1 opacity-80">
                  {isLoading ? "Reporting..." : "Tap to help"}
                </span>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">Select Emergency Type</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {emergencyTypes.map((item) => (
                <Button
                  key={item.type}
                  variant="outline"
                  className={cn(
                    "flex flex-col items-center justify-center h-32 gap-3 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/10 transition-all",
                  )}
                  onClick={() => handleTrigger(item.type)}
                >
                  <item.icon className={cn("w-10 h-10", item.type === 'cardiac' ? "text-red-500" : "text-primary")} />
                  <span className="font-semibold text-lg">{item.label}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex flex-col items-center animate-in zoom-in duration-300">
          <div className="w-48 h-48 rounded-full bg-secondary flex items-center justify-center mb-4">
            <CheckCircle2 className="w-24 h-24 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-secondary">Emergency Sent!</h2>
          <p className="text-muted-foreground text-center">Help is on the way. Stay calm.</p>
        </div>
      )}
    </div>
  );
};
