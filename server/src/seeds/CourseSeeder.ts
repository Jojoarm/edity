import mongoose from 'mongoose';
import Course from '../models/admin/Course';

const ADMIN_ID = '685ada852c2eec80d9fd7341';

// Sample ObjectIds - replace these with actual IDs from your database
const SAMPLE_SUBJECT_IDS = {
  englishLanguage: '65f1a2b3c4d5e6f7a8b9c0d1',
  mathematics: '65f1a2b3c4d5e6f7a8b9c0d2',
  basicScience: '65f1a2b3c4d5e6f7a8b9c0d3',
  physics: '65f1a2b3c4d5e6f7a8b9c0d4',
  chemistry: '65f1a2b3c4d5e6f7a8b9c0d5',
  biology: '65f1a2b3c4d5e6f7a8b9c0d6',
  literature: '65f1a2b3c4d5e6f7a8b9c0d7',
  government: '65f1a2b3c4d5e6f7a8b9c0d8',
  economics: '65f1a2b3c4d5e6f7a8b9c0d9',
  commerce: '65f1a2b3c4d5e6f7a8b9c0da',
};

const SAMPLE_CLASS_LEVEL_IDS = {
  jss1: '65f1a2b3c4d5e6f7a8b9c1d1',
  jss2: '65f1a2b3c4d5e6f7a8b9c1d2',
  jss3: '65f1a2b3c4d5e6f7a8b9c1d3',
  ss1: '65f1a2b3c4d5e6f7a8b9c1d4',
  ss2: '65f1a2b3c4d5e6f7a8b9c1d5',
  ss3: '65f1a2b3c4d5e6f7a8b9c1d6',
};

const SAMPLE_ACADEMIC_YEAR_ID = '65f1a2b3c4d5e6f7a8b9c2d1'; // 2024/2025
const SAMPLE_ACADEMIC_TERM_ID = '65f1a2b3c4d5e6f7a8b9c3d1'; // First Term

const SAMPLE_EDUCATOR_IDS = [
  '65f1a2b3c4d5e6f7a8b9c4d1',
  '65f1a2b3c4d5e6f7a8b9c4d2',
  '65f1a2b3c4d5e6f7a8b9c4d3',
];

const courses = [
  // JSS1 Courses
  {
    title: 'English Language JSS1',
    description:
      'Introduction to English grammar, vocabulary, and basic communication skills for JSS1 students.',
    subject: SAMPLE_SUBJECT_IDS.englishLanguage,
    educator: [SAMPLE_EDUCATOR_IDS[0]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/english-jss1-textbook.pdf',
      'https://example.com/english-exercises-jss1.doc',
    ],
  },
  {
    title: 'Mathematics JSS1',
    description:
      'Basic arithmetic, number operations, and introduction to algebra for JSS1 students.',
    subject: SAMPLE_SUBJECT_IDS.mathematics,
    educator: [SAMPLE_EDUCATOR_IDS[1]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/math-jss1-workbook.pdf',
      'https://example.com/math-practice-sheets.pdf',
    ],
  },
  {
    title: 'Basic Science JSS1',
    description:
      'Introduction to scientific concepts, observation, and basic experiments for JSS1 students.',
    subject: SAMPLE_SUBJECT_IDS.basicScience,
    educator: [SAMPLE_EDUCATOR_IDS[2]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/basic-science-jss1.pdf',
      'https://example.com/science-experiments-guide.pdf',
    ],
  },

  // JSS2 Courses
  {
    title: 'English Language JSS2',
    description:
      'Intermediate English language skills focusing on composition and comprehension for JSS2 students.',
    subject: SAMPLE_SUBJECT_IDS.englishLanguage,
    educator: [SAMPLE_EDUCATOR_IDS[0]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss2,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/english-jss2-textbook.pdf',
      'https://example.com/composition-guide-jss2.doc',
    ],
  },
  {
    title: 'Mathematics JSS2',
    description:
      'Algebraic expressions, geometry basics, and problem-solving techniques for JSS2 students.',
    subject: SAMPLE_SUBJECT_IDS.mathematics,
    educator: [SAMPLE_EDUCATOR_IDS[1]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss2,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/math-jss2-algebra.pdf',
      'https://example.com/geometry-basics.pdf',
    ],
  },

  // JSS3 Courses
  {
    title: 'English Language JSS3',
    description:
      'Advanced English language preparation for BECE including essay writing and literature appreciation.',
    subject: SAMPLE_SUBJECT_IDS.englishLanguage,
    educator: [SAMPLE_EDUCATOR_IDS[0]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/english-jss3-bece-prep.pdf',
      'https://example.com/essay-writing-guide.doc',
    ],
  },
  {
    title: 'Mathematics JSS3',
    description:
      'BECE preparation covering advanced arithmetic, algebra, and geometry for JSS3 students.',
    subject: SAMPLE_SUBJECT_IDS.mathematics,
    educator: [SAMPLE_EDUCATOR_IDS[1]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.jss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/math-jss3-bece.pdf',
      'https://example.com/bece-past-questions-math.pdf',
    ],
  },

  // SS1 Courses
  {
    title: 'Physics SS1',
    description:
      'Introduction to physics concepts including mechanics, heat, and light for SS1 students.',
    subject: SAMPLE_SUBJECT_IDS.physics,
    educator: [SAMPLE_EDUCATOR_IDS[2]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/physics-ss1-mechanics.pdf',
      'https://example.com/physics-laboratory-manual.pdf',
    ],
  },
  {
    title: 'Chemistry SS1',
    description:
      'Basic chemistry principles, atomic structure, and chemical bonding for SS1 students.',
    subject: SAMPLE_SUBJECT_IDS.chemistry,
    educator: [SAMPLE_EDUCATOR_IDS[1]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/chemistry-ss1-basics.pdf',
      'https://example.com/chemistry-practicals.pdf',
    ],
  },
  {
    title: 'Biology SS1',
    description:
      'Introduction to biology covering cell structure, classification of living things, and basic ecology.',
    subject: SAMPLE_SUBJECT_IDS.biology,
    educator: [SAMPLE_EDUCATOR_IDS[0]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/biology-ss1-cells.pdf',
      'https://example.com/biology-diagrams.pdf',
    ],
  },
  {
    title: 'Literature in English SS1',
    description:
      'Introduction to prose, poetry, and drama with focus on African and English literature.',
    subject: SAMPLE_SUBJECT_IDS.literature,
    educator: [SAMPLE_EDUCATOR_IDS[2]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss1,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/literature-ss1-prose.pdf',
      'https://example.com/african-poetry-collection.pdf',
    ],
  },

  // SS2 Courses
  {
    title: 'Government SS2',
    description:
      'Nigerian government structure, political processes, and comparative government for SS2 students.',
    subject: SAMPLE_SUBJECT_IDS.government,
    educator: [SAMPLE_EDUCATOR_IDS[1]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss2,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/government-ss2-nigeria.pdf',
      'https://example.com/political-systems-guide.pdf',
    ],
  },
  {
    title: 'Economics SS2',
    description:
      'Intermediate economics covering market structures, national income, and economic development.',
    subject: SAMPLE_SUBJECT_IDS.economics,
    educator: [SAMPLE_EDUCATOR_IDS[0]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss2,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/economics-ss2-markets.pdf',
      'https://example.com/economic-development.pdf',
    ],
  },

  // SS3 Courses
  {
    title: 'Physics SS3',
    description:
      'Advanced physics topics and WAEC preparation covering waves, electricity, and modern physics.',
    subject: SAMPLE_SUBJECT_IDS.physics,
    educator: [SAMPLE_EDUCATOR_IDS[2]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/physics-ss3-waves.pdf',
      'https://example.com/waec-physics-past-questions.pdf',
    ],
  },
  {
    title: 'Chemistry SS3',
    description:
      'Advanced chemistry and WAEC preparation covering organic chemistry and quantitative analysis.',
    subject: SAMPLE_SUBJECT_IDS.chemistry,
    educator: [SAMPLE_EDUCATOR_IDS[1]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/chemistry-ss3-organic.pdf',
      'https://example.com/waec-chemistry-prep.pdf',
    ],
  },
  {
    title: 'Commerce SS3',
    description:
      'Advanced commercial studies and WAEC preparation covering international trade and business management.',
    subject: SAMPLE_SUBJECT_IDS.commerce,
    educator: [SAMPLE_EDUCATOR_IDS[0]],
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID,
    resources: [
      'https://example.com/commerce-ss3-trade.pdf',
      'https://example.com/business-management-guide.pdf',
    ],
  },
];

export const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('✅ MongoDB connected');

    const coursesWithAdmin = courses.map((course) => ({
      ...course,
      createdBy: ADMIN_ID,
    }));

    await Course.insertMany(coursesWithAdmin);
    console.log('✅ Courses seeded successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    process.exit(1);
  }
};
