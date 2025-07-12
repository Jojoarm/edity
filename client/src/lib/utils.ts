import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import type { DashboardData } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('MMMM DD, YYYY');
};

export const formatDateForInput = (date: string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const calculateTrendPercentage = (
  currentCount: number,
  lastCount: number
): TrendResult => {
  if (lastCount === 0) {
    return currentCount === 0
      ? { trend: 'no change', percentage: 0 }
      : { trend: 'increment', percentage: 100 };
  }

  const change = currentCount - lastCount;
  const percentage = Math.round(Math.abs((change / lastCount) * 100));

  if (change > 0) {
    return { trend: 'increment', percentage };
  } else if (change < 0) {
    return { trend: 'decrement', percentage };
  } else {
    return { trend: 'no change', percentage: 0 };
  }
};

export const calculateCompletionPercentage = (
  completed: number,
  total: number
) => {
  if (completed === 0 && total === 0) {
    return { comment: 'No data to analyse' };
  }

  const percentage = Math.round(Math.abs((completed / total) * 100));
  return { comment: `${percentage}% rate completion` };
};

type TimeRangeKey =
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'lastYear'
  | 'allTime';
type DashboardSectionKey = keyof Pick<
  DashboardData,
  | 'activities'
  | 'goals'
  | 'completedActivities'
  | 'certificates'
  | 'completedGoals'
>;

export const getDashboardCounts = (
  dashboardData: DashboardData | null,
  section: DashboardSectionKey,
  filterDate: TimeRangeKey
) => {
  const lastPeriodMap: Record<TimeRangeKey, TimeRangeKey> = {
    thisMonth: 'lastMonth',
    lastMonth: 'thisMonth',
    thisYear: 'lastYear',
    lastYear: 'allTime',
    allTime: 'lastYear',
  };

  const current = dashboardData?.[section]?.[filterDate] || 0;
  const last = dashboardData?.[section]?.[lastPeriodMap[filterDate]] || 0;

  return { current, last };
};

export const getGoalCompletionPercentage = (
  completed: number,
  total: number
): number => {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
};
