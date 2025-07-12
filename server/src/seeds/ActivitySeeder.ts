import mongoose from 'mongoose';
import Activity from '../models/Activity';

const EDUCATOR_ID = '6870a601de9faa882a3e0492';

const educatorActivities = [
  // JAN 2024
  {
    title: 'Effective Communication for Educators',
    type: 'Training',
    provider: 'Teacher Connect',
    hours: 6,
    date: new Date('2024-04-10'),
    createdAt: new Date('2024-02-10'),
    status: 'completed',
    description: 'Training teachers on impactful communication in classrooms.',
    certificate: '',
  },
  {
    title: 'Using Google Workspace in Schools',
    type: 'Webinar',
    provider: 'Google for Education',
    hours: 2,
    date: new Date('2024-05-22'),
    createdAt: new Date('2024-04-22'),
    status: 'completed',
    description: 'Training on Gmail, Docs, Drive and Classroom.',
    certificate: '',
  },

  // FEB 2024
  {
    title: 'Assessment Strategies in Modern Education',
    type: 'Course',
    provider: 'British Council',
    hours: 10,
    date: new Date('2024-05-05'),
    createdAt: new Date('2024-03-05'),
    status: 'in-progress',
    description: 'Mastering both formative and summative assessment.',
    certificate: '',
  },
  {
    title: 'Child-Centered Teaching Techniques',
    type: 'Workshop',
    provider: 'UNICEF Nigeria',
    hours: 8,
    date: new Date('2024-02-16'),
    createdAt: new Date('2024-02-16'),
    status: 'completed',
    description: 'Strategies for tailoring instruction to learners’ needs.',
    certificate: '',
  },

  // MAR 2024
  {
    title: 'Digital Citizenship for Students',
    type: 'Webinar',
    provider: 'Code.org',
    hours: 3,
    date: new Date('2024-03-04'),
    createdAt: new Date('2024-01-04'),
    status: 'completed',
    description: 'Teaching students how to behave responsibly online.',
    certificate: '',
  },
  {
    title: 'Data-Driven Instruction',
    type: 'Course',
    provider: 'EdTech Nigeria',
    hours: 12,
    date: new Date('2024-03-20'),
    createdAt: new Date('2024-04-20'),
    status: 'in-progress',
    description: 'Using assessment data to improve learning.',
    certificate: '',
  },

  // APR 2024
  {
    title: 'Gamification in the Classroom',
    type: 'Training',
    provider: 'GameLearn Africa',
    hours: 6,
    date: new Date('2024-04-10'),
    createdAt: new Date('2024-04-10'),
    status: 'completed',
    description: 'Boost engagement through game-based learning.',
    certificate: '',
  },
  {
    title: 'Project-Based Learning Workshop',
    type: 'Workshop',
    provider: 'UNESCO',
    hours: 9,
    date: new Date('2024-04-24'),
    createdAt: new Date('2024-04-24'),
    status: 'completed',
    description: 'Plan and implement impactful PBL experiences.',
    certificate: '',
  },

  // MAY 2024
  {
    title: 'Introduction to Inclusive Education',
    type: 'Course',
    provider: 'British Council',
    hours: 11,
    date: new Date('2024-05-03'),
    createdAt: new Date('2024-01-03'),
    status: 'completed',
    description:
      'Supporting learners with special needs in mainstream classrooms.',
    certificate: '',
  },
  {
    title: 'Creating Interactive Lessons',
    type: 'Webinar',
    provider: 'Edmodo',
    hours: 3,
    date: new Date('2024-05-18'),
    createdAt: new Date('2024-02-18'),
    status: 'planned',
    description: 'Using tech tools to make lessons fun and interactive.',
    certificate: '',
  },

  // JUN 2024
  {
    title: 'Safety in Schools',
    type: 'Training',
    provider: 'Federal Ministry of Education',
    hours: 4,
    date: new Date('2024-06-06'),
    createdAt: new Date('2024-06-06'),
    status: 'completed',
    description:
      'Emergency preparedness, safety drills, and reporting systems.',
    certificate: '',
  },
  {
    title: 'Using Canva for Visual Learning',
    type: 'Workshop',
    provider: 'Canva for Education',
    hours: 5,
    date: new Date('2024-06-20'),
    createdAt: new Date('2024-06-20'),
    status: 'completed',
    description: 'Designing lesson visuals and infographics with Canva.',
    certificate: '',
  },

  // JUL 2024
  {
    title: 'Parent-Teacher Collaboration',
    type: 'Course',
    provider: 'NOUN',
    hours: 8,
    date: new Date('2024-07-07'),
    createdAt: new Date('2024-07-07'),
    status: 'completed',
    description: 'Strengthening home-school communication.',
    certificate: '',
  },
  {
    title: 'Teaching Soft Skills',
    type: 'Webinar',
    provider: 'Teach for Nigeria',
    hours: 2,
    date: new Date('2024-07-21'),
    createdAt: new Date('2024-07-21'),
    status: 'planned',
    description: 'Focusing on teamwork, communication and empathy.',
    certificate: '',
  },

  // … Continue like this for every month until Jul 2025
];

export const seedEducatorActivities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('✅ MongoDB connected');

    const activitiesWithUser = educatorActivities.map((activity) => ({
      ...activity,
      user: EDUCATOR_ID,
    }));

    await Activity.insertMany(activitiesWithUser);
    console.log('✅ Educator Activities seeded successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding activities:', error);
    process.exit(1);
  }
};
