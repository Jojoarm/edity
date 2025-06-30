// hooks/useAcademicYears.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAcademicYears } from '@/api/admin-api';
import { useAdminStore } from '@/contexts/useAdminStore';
import { useEffect } from 'react';

export const useAcademicYears = () => {
  const { setAcademicYears, academicYears } = useAdminStore();

  const query = useQuery({
    queryKey: ['academicYears'],
    queryFn: fetchAcademicYears,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Sync with store when data changes
  useEffect(() => {
    if (query.data) {
      setAcademicYears(query.data);
    }
  }, [query.data, setAcademicYears]);

  return {
    ...query,
    academicYears, // From store for immediate access
    academicYearsData: query.data,
    isAcademicYearsPending: query.isPending,
    academicYearsError: query.error,
  };
};
