"use client"

import React, { useState, useEffect } from 'react';
import { EmergencyType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapView } from './MapView';

interface ConfirmationViewProps {
  type: EmergencyType;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({ type, onConfirm, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      onConfirm();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onConfirm]);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-card rounded-3xl overflow-hidden border border-border">
        <MapView emergencies={[]} responders={[]} className="h-48" />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-black mb-1 capitalize text-primary">{type} Reported</h2>
          <p className="text-muted-foreground text-sm font-medium">Sending alert in {timeLeft}s...</p>
        </div>
      </div>

      <div className="space-y-4">
        <Progress value={(timeLeft / 5) * 100} className="h-3" />
        <Button 
          variant="destructive" 
          size="lg" 
          className="w-full h-16 text-xl font-bold rounded-2xl" 
          onClick={onCancel}
        >
          CANCEL ALERT
        </Button>
      </div>
    </div>
  );
};
