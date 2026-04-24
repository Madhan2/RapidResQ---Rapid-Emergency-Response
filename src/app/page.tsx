"use client"

import React, { useState, useEffect } from 'react';
import { SOSButton } from '@/components/RapidResQ/SOSButton';
import { EmergencyTypeGrid } from '@/components/RapidResQ/EmergencyTypeGrid';
import { ConfirmationView } from '@/components/RapidResQ/ConfirmationView';
import { MapView } from '@/components/RapidResQ/MapView';
import { 
  Wifi, 
  MapPin, 
  ShieldCheck, 
  Settings, 
  User, 
  ArrowLeft,
  Phone,
  Navigation
} from 'lucide-react';
import { Emergency, EmergencyType, Responder } from '@/lib/types';
import { MOCK_RESPONDERS, MOCK_USER } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppState = 'idle' | 'selecting' | 'confirming' | 'active' | 'responder_view';

export default function RapidResQHome() {
  const [state, setState] = useState<AppState>('idle');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [activeEmergency, setActiveEmergency] = useState<Emergency | null>(null);
  const [responders] = useState<Responder[]>(MOCK_RESPONDERS);

  // Simulation: Assign responder after 3 seconds when active
  useEffect(() => {
    if (state === 'active' && activeEmergency && !activeEmergency.responderId) {
      const timer = setTimeout(() => {
        setActiveEmergency(prev => prev ? { 
          ...prev, 
          status: 'responding', 
          responderId: 'res-1' 
        } : null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, activeEmergency]);

  const handleSOSPress = () => setState('selecting');

  const handleTypeSelect = (type: EmergencyType) => {
    setSelectedType(type);
    setState('confirming');
  };

  const handleConfirm = () => {
    const newEmergency: Emergency = {
      id: `em-${Date.now()}`,
      userId: MOCK_USER.id,
      userName: MOCK_USER.name,
      location: { lat: 28.6139, lng: 77.2090, address: 'Near Connaught Place, New Delhi' },
      type: selectedType!,
      severity: 'high',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setActiveEmergency(newEmergency);
    setState('active');
  };

  const handleCancel = () => {
    setState('idle');
    setSelectedType(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground max-w-md mx-auto relative shadow-2xl overflow-hidden font-body">
      
      {/* Dynamic Header */}
      <header className="p-6 flex items-center justify-between z-20">
        {state !== 'idle' && state !== 'responder_view' && (
          <button onClick={handleCancel} className="p-2 -ml-2 text-muted-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex items-center gap-1 mx-auto">
          <span className="text-xl font-black tracking-tighter text-primary">RAPID</span>
          <span className="text-xl font-black tracking-tighter text-muted-foreground">RESQ</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <Wifi className="w-4 h-4 text-secondary" />
            <span className="text-[10px] font-bold text-secondary">LIVE</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        {state === 'idle' && (
          <div className="flex flex-col h-full justify-between py-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black">Ready.</h1>
              <p className="text-muted-foreground font-medium text-lg leading-tight">
                Hold the SOS button for 2 seconds to report an emergency.
              </p>
            </div>

            <SOSButton onTrigger={handleSOSPress} />

            <div className="bg-card/50 border border-border p-4 rounded-3xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                <MapPin className="text-secondary w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Your Location</p>
                <p className="text-sm font-bold truncate">Connaught Place, New Delhi</p>
              </div>
            </div>
          </div>
        )}

        {state === 'selecting' && (
          <div className="space-y-8 py-4">
            <h1 className="text-3xl font-black text-center">What's the emergency?</h1>
            <EmergencyTypeGrid onSelect={handleTypeSelect} />
          </div>
        )}

        {state === 'confirming' && selectedType && (
          <div className="py-4">
            <ConfirmationView 
              type={selectedType} 
              onConfirm={handleConfirm} 
              onCancel={handleCancel} 
            />
          </div>
        )}

        {state === 'active' && activeEmergency && (
          <div className="flex flex-col gap-6 py-4 h-full">
            <div className="bg-card rounded-3xl border-2 border-primary overflow-hidden">
               <MapView 
                  emergencies={[activeEmergency]} 
                  responders={responders} 
                  className="h-64"
               />
               <div className="p-6">
                 <div className="flex items-center justify-between mb-4">
                   <Badge className="bg-primary/20 text-primary border-primary/50 text-xs px-3 py-1 font-black">
                     {activeEmergency.status.toUpperCase()}
                   </Badge>
                   <span className="text-xs font-bold text-muted-foreground">
                     REF: {activeEmergency.id.slice(-6)}
                   </span>
                 </div>
                 <h2 className="text-2xl font-black capitalize mb-1">{activeEmergency.type} Help Required</h2>
                 <p className="text-muted-foreground text-sm font-medium">Tracking responders in your area...</p>
               </div>
            </div>

            {activeEmergency.status === 'responding' ? (
              <div className="bg-secondary/10 border-2 border-secondary/50 p-6 rounded-3xl animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <User className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Responder Assigned</p>
                      <p className="text-lg font-black">City Ambulance #42</p>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full border-secondary text-secondary">
                    <Phone className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-secondary/20">
                  <span className="text-sm font-bold">ETA: 4 Minutes</span>
                  <span className="text-sm font-bold text-secondary">0.8 km away</span>
                </div>
              </div>
            ) : (
              <div className="bg-muted p-6 rounded-3xl text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p className="font-bold">Finding closest responder...</p>
              </div>
            )}
          </div>
        )}

        {state === 'responder_view' && (
          <div className="py-4 space-y-6">
             <div className="flex items-center justify-between">
               <h1 className="text-3xl font-black uppercase tracking-tighter">Responder</h1>
               <Badge className="bg-secondary text-secondary-foreground font-black">ONLINE</Badge>
             </div>
             
             {/* Responder Dashboard Content */}
             <div className="bg-card border border-border rounded-3xl p-6">
               <div className="flex items-center justify-between mb-4">
                 <p className="text-xs font-black text-primary uppercase tracking-widest">Urgent Alert</p>
                 <span className="text-xs font-bold text-muted-foreground">2 mins ago</span>
               </div>
               <h3 className="text-xl font-black mb-1">Accident Near Connaught Place</h3>
               <p className="text-muted-foreground text-sm mb-6">Distance: 1.2 km</p>
               
               <div className="grid grid-cols-2 gap-3">
                 <Button className="h-16 rounded-2xl bg-secondary text-secondary-foreground font-black text-lg hover:bg-secondary/90">
                   ACCEPT
                 </Button>
                 <Button variant="outline" className="h-16 rounded-2xl font-black text-lg">
                   REJECT
                 </Button>
               </div>
             </div>

             <MapView emergencies={[]} responders={[]} className="h-64 rounded-3xl" />
          </div>
        )}
      </main>

      {/* Simplified Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/90 backdrop-blur-xl border-t border-border flex justify-around items-center p-4 pb-8 z-50">
        <button 
          onClick={() => setState('idle')}
          className={cn("flex flex-col items-center gap-1", state !== 'responder_view' ? "text-primary" : "text-muted-foreground")}
        >
          <ShieldCheck className="w-7 h-7" />
          <span className="text-[10px] font-black uppercase">Protection</span>
        </button>
        <button 
          onClick={() => setState('responder_view')}
          className={cn("flex flex-col items-center gap-1", state === 'responder_view' ? "text-primary" : "text-muted-foreground")}
        >
          <Navigation className="w-7 h-7" />
          <span className="text-[10px] font-black uppercase">Responder</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground opacity-50">
          <Settings className="w-7 h-7" />
          <span className="text-[10px] font-black uppercase">Profile</span>
        </button>
      </nav>
    </div>
  );
}
