"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Emergency, EmergencyStatus } from '@/lib/types';
import { MapPin, Clock, Phone, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  emergency: Emergency;
  className?: string;
  isResponderView?: boolean;
}

export const StatusCard: React.FC<StatusCardProps> = ({ emergency, className, isResponderView }) => {
  const getStatusColor = (status: EmergencyStatus) => {
    switch (status) {
      case 'pending': return 'bg-orange-500/20 text-orange-500 border-orange-500/50';
      case 'responding': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'resolved': return 'bg-green-500/20 text-green-500 border-green-500/50';
    }
  };

  return (
    <Card className={cn("overflow-hidden border-border bg-card/50 backdrop-blur-sm", className)}>
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg", 
              emergency.severity === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-orange-500/10 text-orange-500'
            )}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg capitalize">{emergency.type} Alert</h3>
              <p className="text-xs text-muted-foreground">{new Date(emergency.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("px-3 py-1", getStatusColor(emergency.status))}>
            {emergency.status.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="line-clamp-1">{emergency.location.address || "Fetching location..."}</span>
          </div>
          {isResponderView && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              <span>Contact: {emergency.userName}</span>
            </div>
          )}
        </div>

        {emergency.status === 'responding' && (
          <div className="mt-2 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Responder Assigned</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-primary">4 mins away</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
