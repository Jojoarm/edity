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
        path: '/ai-lesson-planner',
      },
      {
        title: 'Student Performance Analyzer',
        path: '/student-performaance-analzyer',
      },
      {
        title: 'Curriculum Mapping Tool',
        path: '/curriculum-mapping-tool',
      },
      {
        title: 'Resource Recommendation Engine',
        path: '/resource-recommendation-engine',
      },
      {
        title: 'Reporting Tool',
        path: '/reporting-tool',
      },
      {
        title: 'Survey Launch Tool',
        path: '/survey-launch-tool',
      },
      {
        title: 'Professional Development Tracker',
        path: '/professional-development-tracker',
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
