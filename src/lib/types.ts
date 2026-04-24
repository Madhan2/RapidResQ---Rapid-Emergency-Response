export type EmergencyType = 'accident' | 'medical' | 'fire' | 'crime' | 'other';
export type EmergencySeverity = 'low' | 'medium' | 'high';
export type EmergencyStatus = 'pending' | 'responding' | 'resolved';

export interface Emergency {
  id: string;
  userId: string;
  userName: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  type: EmergencyType;
  severity: EmergencySeverity;
  timestamp: string;
  status: EmergencyStatus;
  responderId?: string;
  potentialHazards?: string;
}

export type ResponderType = 'ambulance' | 'volunteer' | 'hospital' | 'police';

export interface Responder {
  id: string;
  name: string;
  type: ResponderType;
  location: {
    lat: number;
    lng: number;
  };
  availability: boolean;
  distance?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: 'user' | 'responder';
  emergencyContacts: string[];
  medicalInfo?: string;
}
