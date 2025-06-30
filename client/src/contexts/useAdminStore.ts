import type {
  AcademicTerm,
  AcademicYear,
  ClassLevel,
  Course,
  Subject,
} from '@/types';
import { create } from 'zustand';

interface AdminStore {
  currentAcademicYear: string | null;
  currentAcademicTerm: string | null;
  academicYears: AcademicYear[]; // <-- should be an array
  academicTerms: AcademicTerm[];
  classLevels: ClassLevel[];
  subjects: Subject[];
  courses: Course[];
  setCurrentAcademicYear: (yearId: string) => void;
  setCurrentAcademicTerm: (termId: string) => void;
  setAcademicYears: (data: AcademicYear[]) => void;
  setAcademicTerms: (data: AcademicTerm[]) => void;
  setClassLevels: (data: ClassLevel[]) => void;
  setSubjects: (data: Subject[]) => void;
  setCourses: (data: Course[]) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  currentAcademicYear: null,
  currentAcademicTerm: null,
  academicYears: [],
  academicTerms: [],
  classLevels: [],
  subjects: [],
  courses: [],
  setCurrentAcademicYear: (yearId) => set({ currentAcademicYear: yearId }),
  setCurrentAcademicTerm: (termId) => set({ currentAcademicTerm: termId }),
  setAcademicYears: (data) => set({ academicYears: data }),
  setAcademicTerms: (data) => set({ academicTerms: data }),
  setClassLevels: (data) => set({ classLevels: data }),
  setSubjects: (data) => set({ subjects: data }),
  setCourses: (data) => set({ courses: data }),
}));
