import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAdminStore } from '@/contexts/useAdminStore';
import { fetchClassLevels } from '@/api/admin-api';

export const useClassLevels = () => {
  const { classLevels, setClassLevels } = useAdminStore();

  const query = useQuery({
    queryKey: ['classLevels'],
    queryFn: fetchClassLevels,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setClassLevels(query.data);
    }
  }, [query.data, setClassLevels]);

  return {
    ...query,
    classLevels,
    isClassLevelPending: query.isPending,
    classLevelsError: query.error,
  };
};
