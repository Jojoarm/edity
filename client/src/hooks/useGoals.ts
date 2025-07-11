import { fetchGoals } from '@/api/user-api';
import { useAppStore } from '@/contexts/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGoals = (params?: URLSearchParams) => {
  const { goals, setGoals } = useAppStore();

  // Fallback to empty params if not provided
  const searchParams = params || new URLSearchParams();

  const query = useQuery({
    queryKey: ['goals', searchParams.toString()],
    queryFn: () => fetchGoals(searchParams),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setGoals(query.data);
    }
  }, [query.data, setGoals]);

  return {
    ...query,
    goals,
    isGoalsPending: query.isPending,
    goalsError: query.error,
  };
};
