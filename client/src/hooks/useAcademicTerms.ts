import { fetchAcademicTerms } from '@/api/admin-api';
import { useAdminStore } from '@/contexts/useAdminStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useAcademicTerms = () => {
  const { academicTerms, setAcademicTerms } = useAdminStore();

  const query = useQuery({
    queryKey: ['academicTerms'],
    queryFn: fetchAcademicTerms,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setAcademicTerms(query.data);
    }
  }, [query.data, setAcademicTerms]);

  return {
    ...query,
    academicTerms,
    isAcademicTermsPending: query.isPending,
    academicTermsError: query.error,
  };
};
