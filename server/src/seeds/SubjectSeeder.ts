import mongoose from 'mongoose';
import Subject from '../models/admin/Subject';

const ADMIN_ID = '685ada852c2eec80d9fd7341';

const subjects = [
  {
    name: 'English Language',
    description:
      'Covers grammar, comprehension, composition, and oral English.',
  },
  {
    name: 'Mathematics',
    description:
      'Focuses on arithmetic, algebra, geometry, and quantitative reasoning.',
  },
  {
    name: 'Basic Science',
    description:
      'Introductory science covering physics, chemistry, biology, and earth science.',
  },
  {
    name: 'Basic Technology',
    description: 'Teaches practical tech skills and engineering principles.',
  },
  {
    name: 'Civic Education',
    description:
      'Civic responsibility, government structure, and Nigerian history.',
  },
  {
    name: 'Social Studies',
    description:
      'Covers Nigerian culture, values, and basic human relationships.',
  },
  {
    name: 'Computer Studies',
    description:
      'Introduction to ICT, hardware, software, and digital literacy.',
  },
  {
    name: 'Home Economics',
    description: 'Covers food, clothing, housing, and personal hygiene.',
  },
  {
    name: 'Agricultural Science',
    description: 'Farming techniques, soil science, and agribusiness basics.',
  },
  {
    name: 'Religious Studies',
    description: 'Includes CRK and IRK for moral and spiritual development.',
  },
  {
    name: 'Fine Art',
    description:
      'Practical and theoretical aspects of visual and creative arts.',
  },
  {
    name: 'Music',
    description: 'Musical theory, instruments, and performance appreciation.',
  },
  {
    name: 'Physical and Health Education',
    description: 'Fitness, health, first aid, and sports knowledge.',
  },
  {
    name: 'Biology',
    description: 'Senior science subject focusing on life and living things.',
  },
  {
    name: 'Physics',
    description: 'Senior science subject exploring motion, energy, and matter.',
  },
  {
    name: 'Chemistry',
    description: 'Study of matter, reactions, and laboratory science.',
  },
  {
    name: 'Literature in English',
    description: 'Covers prose, poetry, and drama in English literature.',
  },
  {
    name: 'Government',
    description: 'Structure, politics, and governance in Nigeria and globally.',
  },
  {
    name: 'Economics',
    description: 'Basics of micro and macroeconomics for senior classes.',
  },
  {
    name: 'Commerce',
    description: 'Trade, marketing, and basic business practices.',
  },
  {
    name: 'Further Mathematics',
    description: 'Advanced math topics for science-inclined students.',
  },
  {
    name: 'Technical Drawing',
    description: 'Drawing standards for engineering and architecture students.',
  },
];

export const seedSubjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('✅ MongoDB connected');

    const subjectsWithAdmin = subjects.map((subject) => ({
      ...subject,
      createdBy: ADMIN_ID,
    }));

    await Subject.insertMany(subjectsWithAdmin);
    console.log('✅ Subjects seeded successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding subjects:', error);
    process.exit(1);
  }
};
