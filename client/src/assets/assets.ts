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
