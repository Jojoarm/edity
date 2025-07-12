import { fetchDashBoardData } from '@/api/user-api';
import { useAppStore } from '@/contexts/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useDashboardData = () => {
  const { dashboardData, setDashboardData } = useAppStore();

  const query = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashBoardData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setDashboardData(query.data);
    }
  }, [query.data, setDashboardData]);

  return {
    ...query,
    dashboardData,
    isDashboardPending: query.isPending,
    dashboardError: query.error,
  };
};
