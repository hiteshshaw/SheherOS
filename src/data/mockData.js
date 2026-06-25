// SheherOS Mock Data for Hackathon Demo

export const CATEGORIES = [
  'Pothole',
  'Garbage',
  'Water Leakage',
  'Broken Streetlight',
  'Drainage Problem',
  'Damaged Road',
  'Illegal Dumping',
  'Open Manhole'
];

export const STATUSES = [
  'Pending',
  'Verified',
  'Assigned',
  'In Progress',
  'Resolved'
];

export const DEPARTMENTS = {
  'Pothole': 'Road Maintenance Authority',
  'Garbage': 'Municipal Solid Waste Dept',
  'Water Leakage': 'Water Supply & Sewerage Board',
  'Broken Streetlight': 'Street Lighting & Grid Division',
  'Drainage Problem': 'Water Supply & Sewerage Board',
  'Damaged Road': 'Road Maintenance Authority',
  'Illegal Dumping': 'Municipal Solid Waste Dept',
  'Open Manhole': 'Water Supply & Sewerage Board'
};

export const INITIAL_ISSUES = [
  {
    id: 'CS-9081',
    title: 'Crater-sized Pothole on Outer Ring Road',
    description: 'A deep, dangerous pothole is present in the middle lane of the highway. Vehicles are forced to swerve abruptly at high speed, creating a high risk of collisions.',
    category: 'Pothole',
    status: 'In Progress',
    severity: 'Critical',
    priorityScore: 92,
    location: 'Outer Ring Road, near Tech Park Exit',
    coordinates: { lat: 12.9352, lng: 77.6245 }, // Outer Ring Road, Bengaluru
    verifications: 28,
    reportedBy: 'Karan Sharma',
    reportedTime: '6 hours ago',
    dateReported: '2026-06-23',
    department: 'Road Maintenance Authority',
    estimatedResolution: '2 days',
    imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'Pending', date: '2026-06-23 10:15 AM', description: 'Issue logged via SheherOS with photo evidence.' },
      { status: 'Verified', date: '2026-06-23 11:30 AM', description: 'Community verification threshold (15+ votes) met. AI validated severity.' },
      { status: 'Assigned', date: '2026-06-23 01:45 PM', description: 'Forwarded and approved by Road Maintenance Authority.' },
      { status: 'In Progress', date: '2026-06-23 03:20 PM', description: 'Maintenance crew dispatched. Visual progress logged by contractor.' }
    ],
    comments: [
      { id: 1, user: 'Amit K.', text: 'Swerved to avoid this this morning. Highly dangerous!', time: '5 hours ago' },
      { id: 2, user: 'Priya R.', text: 'Glad this is in progress already. SheherOS is fast.', time: '2 hours ago' }
    ],
    proofOfResolution: null
  },
  {
    id: 'CS-8942',
    title: 'Illegal Commercial Dumping behind Central Park',
    description: 'Over 20 large plastic bags of industrial waste and construction debris dumped overnight behind the south gate of Central Park. Blocking pedestrian walkway.',
    category: 'Illegal Dumping',
    status: 'Verified',
    severity: 'High',
    priorityScore: 81,
    location: 'South Gate Lane, Central Park Boulevard',
    coordinates: { lat: 12.9716, lng: 77.5946 }, // Central Park Blvd, Bengaluru
    verifications: 19,
    reportedBy: 'Sneha Patil',
    reportedTime: '1 day ago',
    dateReported: '2026-06-22',
    department: 'Municipal Solid Waste Dept',
    estimatedResolution: '3-4 days',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'Pending', date: '2026-06-22 08:00 AM', description: 'Citizen reported dump site.' },
      { status: 'Verified', date: '2026-06-22 02:00 PM', description: 'Verified by 10+ local citizens. Dispatched alert to waste division.' }
    ],
    comments: [
      { id: 1, user: 'Vikram Mehta', text: 'This is commercial waste. The local shops need to be fined.', time: '18 hours ago' }
    ],
    proofOfResolution: null
  },
  {
    id: 'CS-7711',
    title: 'Water Main Leakage Flooding 12th Cross',
    description: 'High-pressure clean water pipe leakage from the main pipeline. Gushing water has flooded the street and is causing significant water wastage and low pressure in houses.',
    category: 'Water Leakage',
    status: 'Pending',
    severity: 'High',
    priorityScore: 78,
    location: '12th Cross Road, Sector 4, HSR',
    coordinates: { lat: 12.9141, lng: 77.6411 }, // HSR Layout, Bengaluru
    verifications: 8,
    reportedBy: 'Rohan Deshmukh',
    reportedTime: '45 mins ago',
    dateReported: '2026-06-23',
    department: 'Water Supply & Sewerage Board',
    estimatedResolution: '1-2 days',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'Pending', date: '2026-06-23 07:30 PM', description: 'Report logged. Gushing water photo uploaded. Awaiting citizen verification.' }
    ],
    comments: [
      { id: 1, user: 'Neha J.', text: 'Water pressure in my house is extremely low now. Please fix immediately.', time: '30 mins ago' }
    ],
    proofOfResolution: null
  },
  {
    id: 'CS-6523',
    title: 'Entire Row of Streetlights Dark',
    description: 'Five consecutive streetlights are broken or flickering on Lake Road. The entire stretch of about 200 meters is pitch black, making it unsafe for women and runners after 7 PM.',
    category: 'Broken Streetlight',
    status: 'Resolved',
    severity: 'Medium',
    priorityScore: 65,
    location: 'Lake Road Walkway, beside Lake View Apts',
    coordinates: { lat: 12.9780, lng: 77.5520 }, // Lake Road, Bengaluru
    verifications: 34,
    reportedBy: 'Ananya Goel',
    reportedTime: '3 days ago',
    dateReported: '2026-06-20',
    department: 'Street Lighting & Grid Division',
    estimatedResolution: 'Resolved',
    imageUrl: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'Pending', date: '2026-06-20 09:00 PM', description: 'Issue reported with night photos.' },
      { status: 'Verified', date: '2026-06-21 09:30 AM', description: 'Verified. Community reported dark zones match grid outage records.' },
      { status: 'Assigned', date: '2026-06-21 12:00 PM', description: 'Assigned to Sector 3 Light Maintenance Team.' },
      { status: 'In Progress', date: '2026-06-21 07:00 PM', description: 'Bulbs and circuit replacements underway.' },
      { status: 'Resolved', date: '2026-06-22 08:30 PM', description: 'Power grid repaired and standard LED bulbs fitted. Issue marked resolved by contractor.' }
    ],
    comments: [
      { id: 1, user: 'Rakesh S.', text: 'Light is back! Feels much safer now.', time: '1 day ago' }
    ],
    proofOfResolution: {
      imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80',
      verifiedBy: 'Sanjay Nair (Local Citizen)',
      verifiedTime: '2026-06-22 09:15 PM'
    }
  },
  {
    id: 'CS-4412',
    title: 'Open Manhole Near Elementary School',
    description: 'An open manhole is left uncovered on the footpath just 50 meters away from St. Mary Elementary School. Extremely dangerous for school children during rush hours.',
    category: 'Open Manhole',
    status: 'Assigned',
    severity: 'Critical',
    priorityScore: 97,
    location: 'School Lane, Opp St. Mary Primary',
    coordinates: { lat: 12.9082, lng: 77.5765 }, // School Lane, Bengaluru
    verifications: 42,
    reportedBy: 'Meera Johar',
    reportedTime: '12 hours ago',
    dateReported: '2026-06-23',
    department: 'Water Supply & Sewerage Board',
    estimatedResolution: '24 hours',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'Pending', date: '2026-06-23 08:15 AM', description: 'Issue reported. Flagged as extremely critical due to school proximity.' },
      { status: 'Verified', date: '2026-06-23 09:00 AM', description: 'Rapidly verified. AI confirmed school zone location and safety priority.' },
      { status: 'Assigned', date: '2026-06-23 10:30 AM', description: 'Assigned directly to Emergency Response Sewerage Team.' }
    ],
    comments: [
      { id: 1, user: 'Preeti V.', text: 'I put a wooden branch in it temporarily to warn kids. Please cover it!', time: '10 hours ago' },
      { id: 2, user: 'Sidharth G.', text: 'Unbelievable negligence. Hope they cover it before school tomorrow.', time: '4 hours ago' }
    ],
    proofOfResolution: null
  },
  {
    id: 'CS-3291',
    title: 'Severe Clogging of Stormwater Drain',
    description: 'Stormwater drain is filled with plastic cups, leaves, and concrete slush. With the monsoon starting, this is causing rain water to flood onto the road and enter local shops.',
    category: 'Drainage Problem',
    status: 'In Progress',
    severity: 'High',
    priorityScore: 84,
    location: 'Market Main Road, Block B',
    coordinates: { lat: 12.9592, lng: 77.6074 }, // Market Main Road, Bengaluru
    verifications: 15,
    reportedBy: 'Kiran Rao',
    reportedTime: '2 days ago',
    dateReported: '2026-06-21',
    department: 'Water Supply & Sewerage Board',
    estimatedResolution: '2 days',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'Pending', date: '2026-06-21 11:00 AM', description: 'Report filed by shop owner.' },
      { status: 'Verified', date: '2026-06-21 03:00 PM', description: 'Verified. Drainage backup logs analyzed.' },
      { status: 'Assigned', date: '2026-06-22 09:00 AM', description: 'Assigned to Block B Sanitation Team.' },
      { status: 'In Progress', date: '2026-06-22 01:00 PM', description: 'Excavation and debris clearing started.' }
    ],
    comments: [
      { id: 1, user: 'Rakesh S.', text: 'The shopkeepers are sweeping dirt into this drain. Need strict enforcement.', time: '1 day ago' }
    ],
    proofOfResolution: null
  }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, name: 'Sanjay Nair', points: 340, badge: 'Community Hero', reports: 12, verifications: 10, avatar: 'SN' },
  { rank: 2, name: 'Ananya Goel', points: 285, badge: 'Street Saver', reports: 9, verifications: 8, avatar: 'AG' },
  { rank: 3, name: 'Hitesh Patel', points: 260, badge: 'Clean City Champion', reports: 7, verifications: 12, avatar: 'HP' },
  { rank: 4, name: 'Karan Sharma', points: 195, badge: 'Safety Guardian', reports: 6, verifications: 5, avatar: 'KS' },
  { rank: 5, name: 'Meera Johar', points: 180, badge: 'Local Leader', reports: 5, verifications: 8, avatar: 'MJ' },
  { rank: 6, name: 'Rohan Deshmukh', points: 120, badge: 'Safety Guardian', reports: 4, verifications: 4, avatar: 'RD' },
  { rank: 7, name: 'Sneha Patil', points: 95, badge: 'Clean City Champion', reports: 3, verifications: 3, avatar: 'SP' }
];

export const MOCK_USER_PROFILE = {
  name: 'Hitesh Patel',
  points: 260,
  badge: 'Clean City Champion',
  reports: 7,
  verifications: 12,
  avatar: 'HP'
};
