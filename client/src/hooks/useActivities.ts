import { fetchActivities } from '@/api/user-api';
import { useAppStore } from '@/contexts/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useActivities = () => {
  const { activities, setActivities } = useAppStore();

  const query = useQuery({
    queryKey: ['courses'],
    queryFn: fetchActivities,
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
    coursesError: query.error,
  };
};
