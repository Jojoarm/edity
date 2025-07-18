import {
  BookOpen,
  Calendar,
  ClipboardEdit,
  Clock,
  GraduationCap,
  Settings,
  Users,
} from 'lucide-react';

export const overviewIssues = [
  {
    icon: 'fa-solid fa-fire',
    title: 'Burnout Culture',
    issue:
      'Teachers are mostly stretched thin handling grading, planning, managing paperwork often without rest or recognition.',
    comment:
      'I’m at school until 6 PM almost every day. Weekends are no different — they’re for catching up on lesson plans, grading, and reporting. Even then, I still feel like I’m chasing a moving target. It’s not just tiring, it’s unsustainable.',
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Testing Pressure',
    issue:
      'Too much focus on test scores, too little time to actually teach or meet learners where they are.',
    comment:
      'Every week we’re told to focus on data, data, and more data. There’s hardly any time to adapt lessons or support students who are struggling. I became a teacher to help learners grow — not to constantly feed an exam machine.',
  },
  {
    icon: 'fa-solid fa-clock',
    title: 'No Time to Plan',
    issue:
      'Large class sizes, endless meetings, and little prep time leave teachers unsupported and overwhelmed.',
    comment:
      'With over 30 students per class and hardly 30 minutes of prep time (often hijacked by meetings), I find myself planning late at night. New teachers like me are thrown in without proper onboarding, and it feels like we’re expected to figure it out alone.',
  },
];

export const educatorNavLinks: NavLink[] = [
  { name: 'Overview', path: '/overview' },
  {
    name: 'Educator Interface',
    path: '/educator/professional-development-tracker',
  },
  {
    name: 'Tools',
    content: [
      {
        title: 'AI Lesson Planner',
        path: '/educator/tools/lesson-planner',
      },
      {
        title: 'Student Performance Analyzer',
        path: '/educator/tools/student-performaance-analzyer',
      },
      {
        title: 'Curriculum Mapping Tool',
        path: '/educator/tools/curriculum-mapping-tool',
      },
      {
        title: 'Resource Recommendation Engine',
        path: '/educator/tools/resource-recommendation-engine',
      },
      {
        title: 'Reporting Tool',
        path: '/educator/tools/reporting-tool',
      },
      {
        title: 'Survey Launch Tool',
        path: '/educator/tools/survey-launch-tool',
      },
      {
        title: 'View All Tools',
        path: '/educator/tools/view-all-tools',
      },
    ],
  },
  { name: 'Contact Us', path: '/contact-us' },
];

export const adminSidebarItems = [
  {
    id: 1,
    icon: '/assets/icons/home.svg',
    label: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    id: 2,
    icon: '/assets/icons/users.svg',
    label: 'All Students',
    href: '/admin/all-students',
  },
  {
    id: 3,
    icon: '/assets/icons/graduation-cap.svg',
    label: 'All Educators',
    href: '/admin/all-educators',
  },
  {
    id: 4,
    icon: '/assets/icons/shield-check.svg',
    label: 'Pending Approvals',
    href: '/admin/approval',
  },
  {
    id: 5,
    icon: '/assets/icons/tool-case.svg',
    label: 'Admin Tools',
    href: '/admin/tools',
  },
];

export const adminActionTools = [
  {
    id: 'create-course',
    title: 'Create Course',
    description:
      'Add new courses to your educational platform. Define course details, curriculum, and requirements.',
    icon: BookOpen,
    category: 'academic',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    features: [
      'Course metadata',
      'Curriculum planning',
      'Prerequisites',
      'Learning objectives',
    ],
    path: '/admin/tools/create-course',
  },
  {
    id: 'create-subject',
    title: 'Create Subject',
    description:
      'Define academic subjects that form the foundation for course creation. Useful for organizing topics across different class levels and programs.',
    icon: ClipboardEdit,
    category: 'academic',
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-600',
    features: [
      'Subject categorization',
      'Assign to class levels',
      'Link to curriculum',
      'Department tracking',
    ],
    path: '/admin/tools/create-subject',
  },
  {
    id: 'create-class-level',
    title: 'Create Class Level',
    description:
      'Set up different class levels and grades for your institution. Organize students by academic level.',
    icon: GraduationCap,
    category: 'academic',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    features: [
      'Grade levels',
      'Age groups',
      'Academic standards',
      'Progression rules',
    ],
    path: '/admin/tools/create-class-level',
  },
  {
    id: 'create-academic-year',
    title: 'Create Academic Year',
    description:
      'Configure academic years with start and end dates. Manage yearly academic cycles.',
    icon: Calendar,
    category: 'calendar',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    features: [
      'Year planning',
      'Date ranges',
      'Holiday calendar',
      'Semester breaks',
    ],
    path: '/admin/tools/create-academic-year',
  },
  {
    id: 'create-academic-term',
    title: 'Create Academic Term',
    description:
      'Set up terms, semesters, or quarters within academic years. Define assessment periods.',
    icon: Clock,
    category: 'calendar',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
    features: [
      'Term structure',
      'Assessment periods',
      'Grading cycles',
      'Report schedules',
    ],
    path: '/admin/tools/create-academic-term',
  },
  {
    id: 'manage-users',
    title: 'User Management',
    description:
      'Manage student and educator accounts. Handle user roles, permissions, and access control.',
    icon: Users,
    category: 'management',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-600',
    features: [
      'User roles',
      'Permissions',
      'Bulk operations',
      'Account status',
    ],
    path: '/admin/tools/manage-users',
  },
  {
    id: 'system-settings',
    title: 'System Settings',
    description:
      'Configure global system settings, preferences, and platform-wide configurations.',
    icon: Settings,
    category: 'management',
    color: 'bg-gray-500',
    lightColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-600',
    features: [
      'Global settings',
      'Platform config',
      'Integrations',
      'Security settings',
    ],
    path: '/admin/tools/system-settings',
  },
];

// Educator Assets

export const educatorTools = [
  {
    id: 'lesson-planner',
    title: 'Lesson Planner',
    description:
      'This tool helps you craft comprehensive lesson plans. Simply provide a learning objective and year group, and the AI will generate a plan including objectives, activities, and assessments.',
    icon: 'fa-solid fa-person-chalkboard',
    textColor: 'text-orange-300',
    bgFill: 'text-orange-50',
    path: '/educator/tools/lesson-planner',
  },
  {
    id: 'curriculum-mapping-tool',
    title: 'Curriculum Mapping',
    description:
      'Map out curriculum goals across subjects and terms. Define learning outcomes, align standards, and track progress visually.',
    icon: 'fa-solid fa-map',
    textColor: 'text-blue-300',
    bgFill: 'text-blue-50',
    path: '/educator/tools/curriculum-mapping-tool',
  },
  {
    id: 'resource-recommendation-engine',
    title: 'Resource Recommender',
    description:
      'Get AI-curated learning materials based on topics, class level, and learning objectives. Save hours searching for quality content.',
    icon: 'fa-solid fa-book-open-reader',
    textColor: 'text-teal-300',
    bgFill: 'text-teal-50',
    path: '/educator/tools/resource-recommendation-engine',
  },
  {
    id: 'student-performance-analyzer',
    title: 'Performance Analyzer',
    description:
      'Analyze student performance across assessments. Visualize strengths, identify gaps, and generate improvement suggestions.',
    icon: 'fa-solid fa-chart-line',
    textColor: 'text-purple-300',
    bgFill: 'text-purple-50',
    path: '/educator/tools/student-performaance-analzyer',
  },
  {
    id: 'reporting-tool',
    title: 'Reporting Assistant',
    description:
      'Create professional student reports with AI assistance. Input performance data, and get editable narrative feedback.',
    icon: 'fa-solid fa-file-lines',
    textColor: 'text-pink-300',
    bgFill: 'text-pink-50',
    path: '/educator/tools/reporting-tool',
  },
  {
    id: 'survey-launch-tool',
    title: 'Survey Launch Tool',
    description:
      'Quickly design and launch surveys to students, teachers, or parents. Choose question types and generate forms instantly.',
    icon: 'fa-solid fa-poll',
    textColor: 'text-emerald-300',
    bgFill: 'text-emerald-50',
    path: '/educator/tools/survey-launch-tool',
  },
  {
    id: 'quick-knowledge-retrieval-quiz',
    title: 'Quick Quiz Generator',
    description:
      'Generate retrieval practice quizzes for any topic. Reinforce key knowledge and boost memory retention effortlessly.',
    icon: 'fa-solid fa-clipboard-question',
    textColor: 'text-indigo-300',
    bgFill: 'text-indigo-50',
    path: '/educator/tools/quick-knowledge-retrieval-quiz',
  },
  {
    id: 'class-spark',
    title: 'Class Spark (Activity Ideas)',
    description:
      'Spark classroom creativity with engaging activity ideas tailored to your lesson objectives and subject focus.',
    icon: 'fa-solid fa-lightbulb',
    textColor: 'text-yellow-300',
    bgFill: 'text-yellow-50',
    path: '/educator/tools/class-spark',
  },
  {
    id: 'clarity-core',
    title: 'Clarity Core (Concept Explainer)',
    description:
      'Break down tough concepts into digestible explanations. Great for differentiated instruction and revision support.',
    icon: 'fa-solid fa-brain',
    textColor: 'text-rose-300',
    bgFill: 'text-rose-50',
    path: '/educator/tools/clarity-core',
  },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Select Your Desired Tool',
    description:
      'Choose from a range of educator-focused tools including lesson plans, activity generators, assessments, and more; each designed to support diverse teaching strategies.',
    iconClass: 'fa-solid fa-hand-pointer',
    imageSrc: '/assets/images/steps1.png',
  },
  {
    step: 2,
    title: 'Follow Input Guidelines',
    description:
      'Carefully read the examples in each input field to guide your entries. Being specific, especially with learning objectives helps generate high-quality, contextual content.',
    iconClass: 'fa-solid fa-book-open-reader',
    imageSrc: '/assets/images/steps2.png',
  },
  {
    step: 3,
    title: 'Let AI Do the Work',
    description:
      'Once you’ve filled in your details, sit back while Edity’s AI processes your input and generates relevant, classroom-ready content in seconds.',
    iconClass: 'fa-solid fa-robot',
    imageSrc: '/assets/images/steps3.png',
  },
  {
    step: 4,
    title: 'Review, Refine, and Export',
    description:
      "Preview the AI generated content, make necessary edits, and export it in formats that suit your classroom; whether it's PDF, or copy-paste ready.",
    iconClass: 'fa-solid fa-file-export',
    imageSrc: '/assets/images/steps4.png',
  },
];

export const educatorActivities = [
  {
    id: 1,
    title: 'Modern JavaScript Frameworks',
    type: 'Workshop',
    provider: 'Tech Education Hub',
    hours: 8,
    date: '2025-06-15',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Classroom Management Strategies',
    type: 'Course',
    provider: 'Education Institute',
    hours: 12,
    date: '2025-06-20',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'AI in Education Conference',
    type: 'Conference',
    provider: 'EdTech Summit',
    hours: 16,
    date: '2025-06-25',
    status: 'registered',
  },
];

export const educatorGoals = [
  {
    id: 1,
    title: 'Complete 40 PD Hours',
    description: 'Fulfill annual professional development requirement',
    type: 'hours',
    current: 28,
    target: 40,
    deadline: '2025-12-31',
    status: 'in-progress',
    priority: 'high',
    category: 'Required',
  },
  {
    id: 2,
    title: 'Attend 3 Workshops',
    description:
      'Participate in educational workshops to enhance teaching skills',
    type: 'count',
    current: 2,
    target: 3,
    deadline: '2025-08-15',
    status: 'in-progress',
    priority: 'medium',
    category: 'Skill Development',
  },
  {
    id: 3,
    title: 'Earn Technology Certificate',
    description: 'Complete online course in educational technology',
    type: 'milestone',
    current: 0,
    target: 1,
    deadline: '2025-06-30',
    status: 'not-started',
    priority: 'low',
    category: 'Certification',
  },
];

export const educatorStats = {
  totalHours: 28,
  activitiesThisMonth: 3,
  goalsProgress: 70,
  certificates: 5,
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-yellow-200 text-yellow-800';
    case 'registered':
      return 'bg-navy-50 text-navy-500';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'planned':
      return 'bg-violet-200 text-violet-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-200 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const activityTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'course', label: 'Course' },
  { value: 'conference', label: 'Conference' },
  { value: 'certification', label: 'Certification' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'training', label: 'Training' },
];

export const statusTypes = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'registered', label: 'Registered' },
  { value: 'planned', label: 'Planned' },
  { value: 'overdue', label: 'Overdue' },
];

export const priorityType = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const sortOptions = [
  { value: 'date-desc', label: 'Latest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
  { value: 'hours-desc', label: 'Most Hours' },
  { value: 'hours-asc', label: 'Least Hours' },
];

export const statusOptions = [
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'registered', label: 'Registered' },
  { value: 'planned', label: 'Planned' },
  { value: 'overdue', label: 'Overdue' },
];

//reports
// Test Case 1: High-Performing Student
export const testCase1 = {
  studentName: 'Adaora Okonkwo',
  subject: 'Mathematics',
  term: 'Second Term',
  classLevel: 'SS2',
  strengths:
    'Excellent problem-solving skills, strong grasp of algebraic concepts, helps classmates during group work, consistently submits assignments on time',
  improvementAreas:
    'Needs to show more working steps in complex calculations, sometimes rushes through word problems without careful reading',
  behaviorParticipation:
    'Very active in class discussions, volunteers to solve problems on the board, respectful to peers and teacher, excellent attendance record',
  academicPerformanceSummary:
    'Scored 85% average across all assessments, excelled in algebra and geometry, struggled slightly with statistics and probability',
  teacherNote:
    'Adaora has natural mathematical intuition and could benefit from more challenging problems to reach her full potential',
};

// Test Case 2: Struggling Student
export const testCase2 = {
  studentName: 'Ibrahim Yusuf',
  subject: 'English Language',
  term: 'First Term',
  classLevel: 'JSS3',
  strengths:
    'Creative storytelling ability, good oral communication skills, enthusiastic about literature discussions, strong vocabulary in spoken English',
  improvementAreas:
    'Difficulty with grammar rules, inconsistent spelling, struggles with essay organization, needs improvement in reading comprehension',
  behaviorParticipation:
    'Participates well in oral activities but hesitant to read aloud, sometimes distracted during writing tasks, generally well-behaved',
  academicPerformanceSummary:
    'Scored 45% average, performed well in oral assessments but struggled with written examinations, particularly in comprehension and essay writing',
  teacherNote:
    'Ibrahim shows promise in creative expression but needs intensive support with basic writing mechanics and study habits',
};
