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
