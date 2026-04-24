# **App Name**: RapidResQ

## Core Features:

- User Authentication & Profiles: Secure user registration and login using phone number (OTP-based Firebase Auth), including storage for emergency contacts and basic medical info.
- SOS Emergency Trigger: Prominent dashboard button to initiate an emergency. Captures GPS location, allows selection of emergency type, and pushes data to Firestore.
- Real-Time Responder Matching & Notification Tool: A Cloud Function-powered tool that, upon a new emergency, fetches nearest available responders within a radius, sorts them by distance, and sends targeted push notifications via FCM.
- Real-Time Map Visualization: Interactive map display using Google Maps API, showing the user's location, active emergencies, and nearby available responders with distinct markers.
- Responder Dashboard & Status Updates: Interface for registered responders to accept/reject emergency alerts, update their status in Firestore, and get directions to the emergency location via Google Maps.
- Bystander Mode with Instructions: Displays alerts and basic life-saving instructions (e.g., CPR steps) to users located near an active emergency, providing guidance until professional help arrives.
- Firestore Data Model & Security: Structured Firestore collections for 'emergencies' (id, userId, location, type, severity, timestamp, status) and 'responders' (id, name, type, location, availability), enforced with role-based access security rules.

## Style Guidelines:

- Primary action color: A vibrant electric blue (#0DA9F2) for its association with technology, clarity, and urgency in a high-stakes environment.
- Background color: A very dark desaturated blue (#161C1E) derived from the primary hue, providing a high-contrast foundation for dark mode and reducing eye strain.
- Accent color: A bright aqua-green (#55E6CB), analogous to the primary but lighter, used to highlight key information or successful actions.
- All text: 'Inter' (sans-serif) for its modern, clear, and highly readable design, ensuring critical information is easily digestible during emergencies.
- Emergency-friendly, distinct icons for different emergency types and responder roles (ambulance, volunteer, hospital) on the map, enhancing quick recognition and clarity.
- Mobile-first, clean layout with large, prominent call-to-action buttons (e.g., SOS) and clear information hierarchy to ensure quick access and minimal steps, even under stress.
- Subtle, non-distracting real-time update animations for map elements and status changes, clearly indicating dynamic events without overwhelming the user.