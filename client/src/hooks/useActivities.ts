import { fetchActivities } from '@/api/user-api';
import { useAppStore } from '@/contexts/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useActivities = (params?: URLSearchParams) => {
  const { activities, setActivities } = useAppStore();

  // Fallback to empty params if not provided
  const searchParams = params || new URLSearchParams();

  const query = useQuery({
    queryKey: ['activities', searchParams.toString()],
    queryFn: () => fetchActivities(searchParams),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setActivities(query.data);
    }
  }, [query.data, setActivities]);

  return {
    ...query,
    activities,
    isActivitiesPending: query.isPending,
    activitiesError: query.error,
  };
};
