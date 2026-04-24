import { Responder, Emergency } from './types';

export const MOCK_RESPONDERS: Responder[] = [
  {
    id: 'res-1',
    name: 'City Ambulance #42',
    type: 'ambulance',
    location: { lat: 28.6139, lng: 77.2090 },
    availability: true,
  },
  {
    id: 'res-2',
    name: 'St. Mary\'s Hospital',
    type: 'hospital',
    location: { lat: 28.6150, lng: 77.2150 },
    availability: true,
  },
  {
    id: 'res-3',
    name: 'Rahul (Volunteer)',
    type: 'volunteer',
    location: { lat: 28.6100, lng: 77.2000 },
    availability: true,
  },
];

export const MOCK_EMERGENCIES: Emergency[] = [
  {
    id: 'em-1',
    userId: 'user-123',
    userName: 'John Doe',
    location: { lat: 28.6120, lng: 77.2050, address: 'Connaught Place, New Delhi' },
    type: 'accident',
    severity: 'high',
    timestamp: new Date().toISOString(),
    status: 'pending',
    potentialHazards: 'Fuel leakage suspected.',
  }
];

export const MOCK_USER: any = {
  id: 'user-999',
  name: 'Alex Johnson',
  phone: '+91 9876543210',
  role: 'user',
  emergencyContacts: ['Mom: +91 9999999999', 'Wife: +91 8888888888'],
  medicalInfo: 'Allergic to penicillin, Type O+',
};
