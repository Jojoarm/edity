import api, { handleApiError } from '@/lib/axios';
import type { CurriculumMapData } from '@/pages/educator/tools/CurriculumMappingTool';
import type { LessonPlanData } from '@/pages/educator/tools/LessonPlan';
import type { ReportingToolData } from '@/pages/educator/tools/ReportingTool';
import type { ResourceRecommendationData } from '@/pages/educator/tools/ResourceRecommendationTool';
import type { SurveyLaunchData } from '@/pages/educator/tools/SurveyLaunchTool';
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

export const createReport = async (formData: ReportingToolData) => {
  try {
    const { data } = await api.post('/api/educators/create-report', formData);
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

export const createSurveyLaunch = async (formData: SurveyLaunchData) => {
  try {
    const { data } = await api.post('/api/educators/create-survey', formData);
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
