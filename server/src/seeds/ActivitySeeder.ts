import mongoose from 'mongoose';
import Activity from '../models/Activity';

const EDUCATOR_ID = '6870a601de9faa882a3e0492';

const educatorActivities = [
  {
    title: 'Modern JavaScript Frameworks',
    type: 'Workshop',
    provider: 'Tech Education Hub',
    hours: 8,
    date: new Date('2025-06-15'),
    status: 'completed',
    description: 'A deep dive into React, Vue, and Angular frameworks.',
    certificate: '',
  },
  {
    title: 'Classroom Management Strategies',
    type: 'Course',
    provider: 'Education Institute',
    hours: 12,
    date: new Date('2025-06-20'),
    status: 'in-progress',
    description: 'Improving classroom behavior and engagement.',
    certificate: '',
  },
  {
    title: 'AI in Education Conference',
    type: 'Conference',
    provider: 'EdTech Summit Nigeria',
    hours: 16,
    date: new Date('2025-06-25'),
    status: 'registered',
    description: 'Latest trends in using AI to enhance teaching and learning.',
    certificate: '',
  },
  {
    title: 'Digital Tools for 21st Century Teaching',
    type: 'Webinar',
    provider: 'Google for Education Nigeria',
    hours: 2,
    date: new Date('2025-06-28'),
    status: 'completed',
    description: 'Overview of digital classroom tools like Google Classroom.',
    certificate: '',
  },
  {
    title: 'Child Psychology in the Nigerian Classroom',
    type: 'Training',
    provider: 'UNICEF Nigeria',
    hours: 10,
    date: new Date('2025-06-10'),
    status: 'completed',
    description: 'Understanding learners’ emotional and mental needs.',
    certificate: '',
  },
  {
    title: 'Blended Learning Essentials',
    type: 'Online Course',
    provider: 'NOUN - National Open University',
    hours: 15,
    date: new Date('2025-06-05'),
    status: 'planned',
    description: 'Combining online and face-to-face teaching effectively.',
    certificate: '',
  },
  {
    title: 'Teaching Coding with Scratch',
    type: 'Workshop',
    provider: 'CodeLagos Initiative',
    hours: 6,
    date: new Date('2025-07-01'),
    status: 'completed',
    description: 'Using Scratch to teach young learners programming.',
    certificate: '',
  },
  {
    title: 'Inclusive Education for All',
    type: 'Course',
    provider: 'British Council Nigeria',
    hours: 8,
    date: new Date('2025-07-02'),
    status: 'in-progress',
    description:
      'Creating inclusive classrooms for learners with disabilities.',
    certificate: '',
  },
  {
    title: 'Leadership in Education',
    type: 'Training',
    provider: 'Lagos Business School',
    hours: 20,
    date: new Date('2025-07-03'),
    status: 'registered',
    description: 'Training educators to lead and manage schools effectively.',
    certificate: '',
  },
  {
    title: 'Effective Lesson Planning',
    type: 'Workshop',
    provider: 'Teach For Nigeria',
    hours: 4,
    date: new Date('2025-07-04'),
    status: 'completed',
    description: 'Hands-on planning and assessment alignment strategies.',
    certificate: '',
  },
  {
    title: 'Assessment for Learning',
    type: 'Webinar',
    provider: 'UNESCO Abuja',
    hours: 2,
    date: new Date('2025-07-06'),
    status: 'planned',
    description: 'Designing effective formative and summative assessments.',
    certificate: '',
  },
  {
    title: 'Early Childhood Development Training',
    type: 'Course',
    provider: 'Federal Ministry of Education',
    hours: 10,
    date: new Date('2025-07-08'),
    status: 'completed',
    description:
      'Foundations of cognitive and social development in early years.',
    certificate: '',
  },
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
