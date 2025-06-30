import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAdminStore } from '@/contexts/useAdminStore';
import { fetchCourses } from '@/api/admin-api';

export const useCourses = () => {
  const { courses, setCourses } = useAdminStore();

  const query = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setCourses(query.data);
    }
  }, [query.data, setCourses]);

  return {
    ...query,
    courses,
    isCoursesPending: query.isPending,
    coursesError: query.error,
  };
};
