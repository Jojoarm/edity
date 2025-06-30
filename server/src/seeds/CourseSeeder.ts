import mongoose from 'mongoose';
import Course from '../models/admin/Course';

const ADMIN_ID = '685ada852c2eec80d9fd7341';

const SAMPLE_SUBJECT_IDS = {
  englishLanguage: '68603feb51ca93263e58177a',
  mathematics: '68603feb51ca93263e58177b',
  basicScience: '68603feb51ca93263e58177c',
  basicTechnology: '68603feb51ca93263e58177d',
  civicEducation: '68603feb51ca93263e58177e',
  socialStudies: '68603feb51ca93263e58177f',
  computerStudies: '68603feb51ca93263e581780',
  homeEconomics: '68603feb51ca93263e581781',
  agriculturalScience: '68603feb51ca93263e581782',
  religiousStudies: '68603feb51ca93263e581783',
  fineArt: '68603feb51ca93263e581784',
  music: '68603feb51ca93263e581785',
  PHE: '68603feb51ca93263e581786',
  physics: '68603feb51ca93263e581788',
  chemistry: '68603feb51ca93263e581789',
  biology: '68603feb51ca93263e581787',
  literature: '68603feb51ca93263e58178a',
  government: '68603feb51ca93263e58178b',
  economics: '68603feb51ca93263e58178c',
  commerce: '68603feb51ca93263e58178d',
  furtherMaths: '68603feb51ca93263e58178e',
  technicalDrawing: '68603feb51ca93263e58178f',
};

const SAMPLE_CLASS_LEVEL_IDS = {
  preKindergarten: '68602adc6ceb8e5ae9e05bad',
  kg1: '68602b3e6ceb8e5ae9e05bb1',
  kg2: '68602b546ceb8e5ae9e05bb5',
  primary1: '68602b836ceb8e5ae9e05bb9',
  primary2: '6860345ed209c392f74ab9a9',
  primary3: '68603491d209c392f74ab9ad',
  primary4: '686034b3d209c392f74ab9b1',
  primary5: '686034d0d209c392f74ab9b5',
  primary6: '686034e8d209c392f74ab9b9',
  jss1: '68603507d209c392f74ab9bd',
  jss2: '6860351bd209c392f74ab9c1',
  jss3: '68603530d209c392f74ab9c5',
  ss1: '68603549d209c392f74ab9c9',
  ss2: '68603560d209c392f74ab9cd',
  ss3: '68603575d209c392f74ab9d1',
};

const SAMPLE_ACADEMIC_YEAR_ID = '686000f7e465d7400941daf3'; // 2025/2026
const SAMPLE_ACADEMIC_TERM_ID = {
  firstTerm: '68600e026ceb8e5ae9e05b8d',
  secondTerm: '68600d6f6ceb8e5ae9e05b83',
  thirdTerm: '68600da16ceb8e5ae9e05b87',
};

const courses = [
  {
    title: 'Mathematics SS3 - First Term',
    description:
      'Advanced topics including calculus introduction, statistics, and revision for WAEC.',
    subject: SAMPLE_SUBJECT_IDS.mathematics,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.firstTerm,
    resources: [
      'https://example.com/ss3-maths-calculus.pdf',
      'https://example.com/waec-maths-revision-guide.pdf',
    ],
  },
  {
    title: 'English Language SS3 - First Term',
    description:
      'Comprehensive revision of grammar, essay writing, and literature for WAEC preparation.',
    subject: SAMPLE_SUBJECT_IDS.englishLanguage,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.firstTerm,
    resources: [
      'https://example.com/ss3-english-grammar.pdf',
      'https://example.com/waec-english-literature.pdf',
    ],
  },
  {
    title: 'Biology SS3 - First Term',
    description: 'Ecology, genetics, and WAEC past questions review.',
    subject: SAMPLE_SUBJECT_IDS.biology,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.firstTerm,
    resources: [
      'https://example.com/biology-genetics.pdf',
      'https://example.com/waec-biology-questions.pdf',
    ],
  },
  {
    title: 'Economics SS3 - First Term',
    description: 'Micro and macroeconomics revision and WAEC syllabus topics.',
    subject: SAMPLE_SUBJECT_IDS.economics,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.firstTerm,
    resources: [
      'https://example.com/ss3-economics-revision.pdf',
      'https://example.com/economics-exam-prep.pdf',
    ],
  },
  {
    title: 'Physics SS3 - Second Term',
    description: 'Wave motion, electromagnetism, and WAEC revision.',
    subject: SAMPLE_SUBJECT_IDS.physics,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.secondTerm,
    resources: [
      'https://example.com/ss3-physics-waves.pdf',
      'https://example.com/waec-physics-papers.pdf',
    ],
  },
  {
    title: 'Chemistry SS3 - Second Term',
    description: 'Organic chemistry, titration, and exam review sessions.',
    subject: SAMPLE_SUBJECT_IDS.chemistry,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.secondTerm,
    resources: [
      'https://example.com/ss3-chemistry-organic.pdf',
      'https://example.com/chemistry-practicals-waec.pdf',
    ],
  },
  {
    title: 'Commerce SS3 - Second Term',
    description:
      'International trade, marketing and entrepreneurship in business.',
    subject: SAMPLE_SUBJECT_IDS.commerce,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.secondTerm,
    resources: [
      'https://example.com/commerce-international-trade.pdf',
      'https://example.com/commerce-marketing.pdf',
    ],
  },
  {
    title: 'Literature in English SS3 - Second Term',
    description:
      'Analysis of African prose and drama, plus WAEC-oriented practice.',
    subject: SAMPLE_SUBJECT_IDS.literature,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.secondTerm,
    resources: [
      'https://example.com/literature-analysis-africa.pdf',
      'https://example.com/literature-drama-waec.pdf',
    ],
  },
  {
    title: 'Mathematics SS3 - Third Term',
    description:
      'Final exam review, mock prep, and WAEC-focused problem solving.',
    subject: SAMPLE_SUBJECT_IDS.mathematics,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.thirdTerm,
    resources: [
      'https://example.com/maths-waec-questions.pdf',
      'https://example.com/ss3-maths-mock-revision.pdf',
    ],
  },
  {
    title: 'English Language SS3 - Third Term',
    description:
      'WAEC and NECO mock drills, writing exercises, and comprehension tests.',
    subject: SAMPLE_SUBJECT_IDS.englishLanguage,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.thirdTerm,
    resources: [
      'https://example.com/english-ss3-comprehension.pdf',
      'https://example.com/waec-writing-essays.pdf',
    ],
  },
  {
    title: 'Biology SS3 - Third Term',
    description:
      'Revision of all key WAEC topics in biology and mock examination prep.',
    subject: SAMPLE_SUBJECT_IDS.biology,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.thirdTerm,
    resources: [
      'https://example.com/ss3-biology-waec-review.pdf',
      'https://example.com/biology-mock-tests.pdf',
    ],
  },
  {
    title: 'Government SS3 - Third Term',
    description:
      'WAEC preparation focusing on Nigerian government and political theories.',
    subject: SAMPLE_SUBJECT_IDS.government,
    classLevel: SAMPLE_CLASS_LEVEL_IDS.ss3,
    academicYear: SAMPLE_ACADEMIC_YEAR_ID,
    academicTerm: SAMPLE_ACADEMIC_TERM_ID.thirdTerm,
    resources: [
      'https://example.com/government-ss3-waec.pdf',
      'https://example.com/political-theories-nigeria.pdf',
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
