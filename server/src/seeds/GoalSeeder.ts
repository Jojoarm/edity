import mongoose from 'mongoose';
import Goal from '../models/Goal';

const EDUCATOR_ID = '6870a601de9faa882a3e0492'; // Replace with your real test user ID

const educatorGoals = [
  {
    title: 'Complete 40 PD Hours',
    description: 'Fulfill annual professional development requirement',
    type: 'hours',
    current: 28,
    target: 40,
    deadline: new Date('2025-12-31'),
    status: 'in-progress',
    priority: 'high',
    category: 'Required',
  },
  {
    title: 'Attend 3 Workshops',
    description:
      'Participate in educational workshops to enhance teaching skills',
    type: 'count',
    current: 2,
    target: 3,
    deadline: new Date('2025-08-15'),
    status: 'in-progress',
    priority: 'medium',
    category: 'Skill Development',
  },
  {
    id: 4,
    title: 'Complete 60 CPD Hours',
    description: 'Meet TRCN yearly continuing professional development target',
    type: 'hours',
    current: 35,
    target: 60,
    deadline: new Date('2025-11-30'),
    status: 'in-progress',
    priority: 'high',
    category: 'Regulatory',
  },
  {
    title: 'Facilitate a Peer Training Session',
    description: 'Lead a professional development workshop for colleagues',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: new Date('2025-10-10'),
    status: 'not-started',
    priority: 'medium',
    category: 'Leadership',
  },
  {
    title: 'Attend 2 National Education Conferences',
    description: 'Engage in networking and idea exchange at key events',
    type: 'count',
    current: 1,
    target: 2,
    deadline: new Date('2025-09-20'),
    status: 'in-progress',
    priority: 'medium',
    category: 'Networking',
  },
  {
    title: 'Earn Digital Literacy Certificate',
    description:
      'Complete a recognized course in basic ICT skills for educators',
    type: 'milestone',
    current: 1,
    target: 1,
    deadline: new Date('2025-08-31'),
    status: 'completed',
    priority: 'high',
    category: 'Technology',
  },
  {
    title: 'Mentor a Junior Teacher',
    description: 'Guide a less experienced educator for one academic term',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: new Date('2025-12-01'),
    status: 'not-started',
    priority: 'low',
    category: 'Mentorship',
  },
  {
    title: 'Publish an Educational Article',
    description:
      'Write and publish a teaching-related article in a journal or blog',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: new Date('2025-10-15'),
    status: 'not-started',
    priority: 'medium',
    category: 'Professional Visibility',
  },
  {
    title: 'Attend 3 Subject-Based Workshops',
    description: 'Focus on workshops related to English, Maths, or Science',
    type: 'count',
    current: 1,
    target: 3,
    deadline: new Date('2025-09-30'),
    status: 'in-progress',
    priority: 'high',
    category: 'Skill Development',
  },

  {
    title: 'Earn Technology Certificate',
    description: 'Complete online course in educational technology',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: new Date('2025-06-30'),
    status: 'not-started',
    priority: 'low',
    category: 'Certification',
  },
  {
    title: 'Lead a Training Session',
    description: 'Deliver a session on digital tools for educators',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: new Date('2025-10-01'),
    status: 'not-started',
    priority: 'high',
    category: 'Leadership',
  },
  {
    title: 'Read 5 Educational Books',
    description: 'Improve pedagogical knowledge through reading',
    type: 'count',
    current: 1,
    target: 5,
    deadline: new Date('2025-09-30'),
    status: 'in-progress',
    priority: 'medium',
    category: 'Knowledge Building',
  },
  {
    title: 'Update Teaching Portfolio',
    description: 'Document teaching practices and achievements',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: new Date('2025-08-31'),
    status: 'not-started',
    priority: 'high',
    category: 'Documentation',
  },
];

export const seedEducatorGoals = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('✅ MongoDB connected');

    const goalsWithUser = educatorGoals.map((goal) => ({
      ...goal,
      user: EDUCATOR_ID,
    }));

    await Goal.insertMany(goalsWithUser);
    console.log('✅ Educator goals seeded successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding educator goals:', error);
    process.exit(1);
  }
};
