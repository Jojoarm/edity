import api, { handleApiError } from '@/lib/axios';
import type { CurriculumMapData } from '@/pages/educator/tools/CurriculumMappingTool';
import type { LessonPlanData } from '@/pages/educator/tools/LessonPlan';
import type { ResourceRecommendationData } from '@/pages/educator/tools/ResourceRecommendationTool';
import toast from 'react-hot-toast';

export const createLessonPlan = async (formData: LessonPlanData) => {
  try {
    const { data } = await api.post(
      '/api/educators/create-lesson-plan',
      formData
    );
    if (data.success) {
      toast.success(data.message);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const createCurriculumMap = async (formData: CurriculumMapData) => {
  try {
    const { data } = await api.post(
      '/api/educators/create-curriculum-map',
      formData
    );
    if (data.success) {
      toast.success(data.message);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const createResourceRecommendation = async (
  formData: ResourceRecommendationData
) => {
  try {
    const { data } = await api.post(
      '/api/educators/create-resource-recommendation',
      formData
    );
    if (data.success) {
      toast.success(data.message);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    handleApiError(error);
  }
};
