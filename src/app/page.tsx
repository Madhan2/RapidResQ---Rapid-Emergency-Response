"use client"

import React, { useState, useEffect } from 'react';
import { SOSButton } from '@/components/RapidResQ/SOSButton';
import { MapView } from '@/components/RapidResQ/MapView';
import { StatusCard } from '@/components/RapidResQ/StatusCard';
import { 
  User, 
  MapPin, 
  Settings, 
  LifeBuoy, 
  Menu,
  ShieldCheck,
  Bell,
  Navigation
} from 'lucide-react';
import { Emergency, EmergencyType, EmergencySeverity, Responder } from '@/lib/types';
import { MOCK_EMERGENCIES, MOCK_RESPONDERS, MOCK_USER } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function RapidResQHome() {
  const [activeEmergencies, setActiveEmergencies] = useState<Emergency[]>([]);
  const [responders, setResponders] = useState<Responder[]>(MOCK_RESPONDERS);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'user' | 'responder'>('user');

  // Handle SOS Trigger
  const handleSOS = (type: EmergencyType, severity: EmergencySeverity) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newEmergency: Emergency = {
        id: `em-${Date.now()}`,
        userId: MOCK_USER.id,
        userName: MOCK_USER.name,
        location: { lat: 28.6139, lng: 77.2090, address: 'Near Connaught Place, New Delhi' },
        type,
        severity,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      setActiveEmergencies([newEmergency, ...activeEmergencies]);
      setIsLoading(false);
      
      // Simulate responder assignment after 3 seconds
      setTimeout(() => {
        setActiveEmergencies(prev => prev.map(e => 
          e.id === newEmergency.id ? { ...e, status: 'responding', responderId: 'res-1' } : e
        ));
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground max-w-md mx-auto relative shadow-2xl overflow-hidden font-body">
      
      {/* Header */}
      <header className="p-4 flex items-center justify-between z-20 sticky top-0 bg-background/80 backdrop-blur-md">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-card border-border">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                RapidResQ
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">{MOCK_USER.name}</h4>
                  <p className="text-xs text-muted-foreground">{MOCK_USER.phone}</p>
                </div>
              </div>
              <nav className="flex flex-col gap-1">
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-sm font-medium">
                  <User className="w-5 h-5" /> Profile Settings
                </Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-sm font-medium">
                  <Bell className="w-5 h-5" /> Notifications
                </Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-sm font-medium">
                  <LifeBuoy className="w-5 h-5" /> Bystander Tips
                </Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-sm font-medium">
                  <Settings className="w-5 h-5" /> Help & Support
                </Link>
              </nav>
              <div className="mt-auto pt-8 border-t border-border">
                 <Button 
                   variant="outline" 
                   className="w-full justify-start gap-3"
                   onClick={() => setCurrentView(currentView === 'user' ? 'responder' : 'user')}
                 >
                   <ShieldCheck className="w-5 h-5" /> 
                   Switch to {currentView === 'user' ? 'Responder' : 'User'} Mode
                 </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-1">
          <span className="text-xl font-black tracking-tighter text-primary">RAPID</span>
          <span className="text-xl font-black tracking-tighter text-secondary">RESQ</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-24">
        <Tabs value={currentView} className="w-full mt-2">
          <TabsContent value="user" className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
            {/* User Dashboard */}
            <div className="mt-4">
              <h1 className="text-3xl font-black mb-1">Need help?</h1>
              <p className="text-muted-foreground mb-8">Tap the SOS button to notify responders nearby.</p>
              
              <SOSButton onTrigger={handleSOS} isLoading={isLoading} />
            </div>

            {activeEmergencies.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Active Requests</h2>
                  <span className="text-xs text-primary font-bold">LIVE UPDATES</span>
                </div>
                {activeEmergencies.map(e => (
                  <StatusCard key={e.id} emergency={e} />
                ))}
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-lg font-bold">Nearby Resources</h2>
              <MapView 
                emergencies={activeEmergencies} 
                responders={responders} 
                className="h-[300px]"
              />
            </div>

            <div className="bg-muted/30 border border-border rounded-2xl p-6 mt-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" /> Security Verification
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your location and profile are automatically shared with authorized responders during an emergency.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="responder" className="flex flex-col gap-6 animate-in slide-in-from-left-4 duration-300">
            {/* Responder Dashboard */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-black">Dispatcher</h1>
                <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/50 flex items-center gap-2 px-3 py-1">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  ONLINE
                </Badge>
              </div>
              <p className="text-muted-foreground">Nearby emergencies waiting for response.</p>
            </div>

            <div className="space-y-4">
               {activeEmergencies.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                    <ShieldCheck className="w-16 h-16 mb-4 text-muted-foreground" />
                    <p className="text-lg font-bold">No Pending Alerts</p>
                    <p className="text-sm">Stand by for incoming emergencies in your area.</p>
                 </div>
               ) : (
                 activeEmergencies.map(e => (
                   <StatusCard key={e.id} emergency={e} isResponderView />
                 ))
               )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold">Incident Map</h2>
              <MapView 
                emergencies={activeEmergencies} 
                responders={responders} 
                className="h-[300px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="h-16 flex flex-col gap-1 border-border">
                 <Navigation className="w-5 h-5 text-primary" />
                 <span className="text-xs">Routing</span>
               </Button>
               <Button variant="outline" className="h-16 flex flex-col gap-1 border-border">
                 <Bell className="w-5 h-5 text-secondary" />
                 <span className="text-xs">Notifications</span>
               </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/90 backdrop-blur-xl border-t border-border flex justify-around items-center p-3 pb-6 z-50">
        <button className={cn("p-2 rounded-xl flex flex-col items-center gap-1", currentView === 'user' ? "text-primary" : "text-muted-foreground")}>
          <LifeBuoy className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">SOS</span>
        </button>
        <button className="p-2 rounded-xl text-muted-foreground flex flex-col items-center gap-1">
          <MapPin className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Map</span>
        </button>
        <button className="p-2 rounded-xl text-muted-foreground flex flex-col items-center gap-1">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Account</span>
        </button>
      </nav>
    </div>
  );
}
