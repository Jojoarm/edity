import {
  BookOpen,
  Calendar,
  ClipboardEdit,
  Clock,
  GraduationCap,
  Settings,
  Users,
} from 'lucide-react';

export const navLinks: NavLink[] = [
  { name: 'Overview', path: '/overview' },
  {
    name: 'Users',
    content: [
      {
        title: 'School Management',
        path: '/school-management',
      },
      {
        title: 'Educators Interface',
        path: '/educators-interface',
      },
      {
        title: 'Stakeholders Interface',
        path: '/stakeholders-interface',
      },
      {
        title: 'Learners Dashboard',
        path: '/learners-dashboard',
      },
      {
        title: 'Admin Dashboard',
        path: '/admin-dashboard',
      },
      {
        title: 'Researchers Interface',
        path: '/researchers-interface',
      },
    ],
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
        path: '/student-performaance-analzyer',
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
        path: '/survey-launch-tool',
      },
      {
        title: 'Professional Development Tracker',
        path: '/educator/professional-development-tracker',
      },
      {
        title: 'View All Tools',
        path: '/view-all-tools',
      },
    ],
  },
  { name: 'Contact Us', path: '#contact' },
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
      'This tool can be used to create lesson plans. Simply provide a learning objective and year group, and the AI will draft the lesson plan including assessment suggestions.',
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
