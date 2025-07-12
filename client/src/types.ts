export interface EducatorData {
  dateEmployed: string;
  teacherId: string;
  isWithdrawn: boolean;
  isSuspended: boolean;
  applicationStatus: 'pending' | 'approved' | 'rejected';
  subjects: string[];
  classLevel: string;
  academicYear: string;
  academicTerm: string;
  examsCreated: string[];
  lessonsCreated: string[];
}

export interface AdminData {
  academicTerms: string[];
  subjects: string[];
  yearGroups: string[];
  academicYears: string[];
  classLevels: string[];
}

export interface StudentData {
  studentId: string;
  enrolledSubjects: string[];
  classLevel: string;
  academicYear: string;
  progressReports: string[];
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  googleId?: string;
  dob: string;
  gender: 'male' | 'female';
  tel: string;
  address: string;
  role: 'educator' | 'admin' | 'student' | 'stakeholder' | 'researcher';
  isSubmitted: boolean;
  applicationStatus: string;
  profilePicture?: string;
  educatorData?: EducatorData;
  adminData?: AdminData;
  studentData?: StudentData;
  createdAt: string;
  updatedAt: string;
}

export type AcademicYear = {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AcademicTerm = {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  academicYear: string;
  createdBy: string;
};

export type ClassLevel = {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
};

export type Subject = {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  educator: string[];
  classLevel: string;
  academicYear: string;
  academicTerm: string;
  resources?: string[];
  createdBy: string;
};

export type PaginationData = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
};

export type ActivityData = {
  _id: string;
  user: string;
  title: string;
  type: string;
  provider: string;
  hours: number;
  date: string;
  status: string;
  description?: string;
  certificate?: string;
};

export type ActivityFetchData = {
  success: boolean;
  activityData: ActivityData[];
  pagination: PaginationData;
};

export type GoalData = {
  _id: string;
  user: string;
  title: string;
  description: string;
  type: string;
  current: number;
  target: number;
  deadline: string;
  status: string;
  priority: string;
  category: string;
};

export type GoalFetchData = {
  success: boolean;
  goalData: GoalData[];
  pagination: PaginationData;
};

export interface DateCount {
  thisMonth: number;
  lastMonth: number;
  thisYear: number;
  lastYear: number;
  allTime: number;
}

export interface Distribution {
  type: string;
  count: number;
  percentage: number;
}

export interface Achievement {
  _id: string;
  title: string;
  type: string;
  provider: string;
  date: string;
  certificate: string;
}

export interface MonthlyBreakdown {
  month: string;
  count: number;
  hours: number;
}

export interface MonthlyActivities {
  monthlyBreakdown: MonthlyBreakdown[];
  averagePerMonth: number;
}

export interface DashboardData {
  activities: DateCount;
  goals: DateCount;
  certificates: DateCount;
  completedActivities: DateCount;
  completedGoals: DateCount;
  typeDistribution: Distribution[];
  achievements: Achievement[];
  averageHoursPerActivity: number;
  activityCompletionRate: number;
  activitiesPerMonth: MonthlyActivities;
}

export interface DashboardFetchData {
  success: boolean;
  dashboardData: DashboardData;
}
