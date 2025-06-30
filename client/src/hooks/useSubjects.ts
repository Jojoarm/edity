import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAdminStore } from '@/contexts/useAdminStore';
import { fetchSubjects } from '@/api/admin-api';

export const useSubjects = () => {
  const { subjects, setSubjects } = useAdminStore();

  const query = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setSubjects(query.data);
    }
  }, [query.data, setSubjects]);

  return {
    ...query,
    subjects,
    isSubjectsPending: query.isPending,
    subjectsError: query.error,
  };
};
