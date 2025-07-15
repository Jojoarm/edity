import ActivityGenerator from '@/pages/educator/tools/ActivityGenerator';
import ConceptExplainer from '@/pages/educator/tools/ConceptExplainer';
import CurriculumMappingTool from '@/pages/educator/tools/CurriculumMappingTool';
import LessonPlan from '@/pages/educator/tools/LessonPlan';
import QuickKnowledgeRetrievalQuiz from '@/pages/educator/tools/QuickKnowledgeRetrievalQuiz';
import ReportingTool from '@/pages/educator/tools/ReportingTool';
import ResourceRecommendationTool from '@/pages/educator/tools/ResourceRecommendationTool';
import StudentPerformanceAnalyser from '@/pages/educator/tools/StudentPerformanceAnalyser';
import SurveyLaunchTool from '@/pages/educator/tools/SurveyLaunchTool';

export const educatorToolConfig = [
  {
    id: 'lesson-planner',
    title: 'Lesson Planner',
    path: '/educator/tools/lesson-planner',
    component: LessonPlan,
    icon: 'fa-solid fa-person-chalkboard',
    textColor: 'text-orange-300',
    bgFill: 'bg-orange-50',
    description:
      'This tool helps you craft comprehensive lesson plans. Simply provide a learning objective and year group, and the AI will generate a plan including objectives, activities, and assessments.',
  },
  {
    id: 'curriculum-mapping-tool',
    title: 'Curriculum Mapping',
    path: '/educator/tools/curriculum-mapping-tool',
    component: CurriculumMappingTool,
    icon: 'fa-solid fa-map',
    textColor: 'text-primary',
    bgFill: 'bg-blue-50',
    description:
      'Map out curriculum goals across subjects and terms. Define learning outcomes, align standards, and track progress visually.',
  },
  {
    id: 'resource-recommendation-engine',
    title: 'Resource Recommender',
    path: '/educator/tools/resource-recommendation-engine',
    component: ResourceRecommendationTool,
    icon: 'fa-solid fa-book-open-reader',
    textColor: 'text-teal-500',
    bgFill: 'bg-teal-50',
    description:
      'Get AI-curated learning materials based on topics, class level, and learning objectives. Save hours searching for quality content.',
  },
  {
    id: 'student-performance-analyzer',
    title: 'Performance Analyzer',
    path: '/educator/tools/student-performaance-analzyer',
    component: StudentPerformanceAnalyser,
    icon: 'fa-solid fa-chart-line',
    textColor: 'text-purple-500',
    bgFill: 'bg-purple-50',
    description:
      'Analyze student performance across assessments. Visualize strengths, identify gaps, and generate improvement suggestions.',
  },
  {
    id: 'reporting-tool',
    title: 'Reporting Assistant',
    path: '/educator/tools/reporting-tool',
    component: ReportingTool,
    icon: 'fa-solid fa-file-invoice',
    textColor: 'text-pink-500',
    bgFill: 'bg-pink-50',
    description:
      'Create professional student reports with AI assistance. Input performance data, and get editable narrative feedback.',
  },
  {
    id: 'survey-launch-tool',
    title: 'Survey Launch Tool',
    path: '/educator/tools/survey-launch-tool',
    component: SurveyLaunchTool,
    icon: 'fa-solid fa-poll',
    textColor: 'text-emerald-500',
    bgFill: 'bg-emerald-50',
    description:
      'Quickly design and launch surveys to students, teachers, or parents. Choose question types and generate forms instantly.',
  },
  {
    id: 'quick-knowledge-retrieval-quiz',
    title: 'Quick Quiz Generator',
    path: '/educator/tools/quick-knowledge-retrieval-quiz',
    component: QuickKnowledgeRetrievalQuiz,
    icon: 'fa-solid fa-clipboard-question',
    textColor: 'text-indigo-500',
    bgFill: 'bg-indigo-50',
    description:
      'Generate retrieval practice quizzes for any topic. Reinforce key knowledge and boost memory retention effortlessly.',
  },
  {
    id: 'class-spark',
    title: 'Class Spark (Activity Ideas)',
    path: '/educator/tools/class-spark',
    component: ActivityGenerator,
    icon: 'fa-solid fa-lightbulb',
    textColor: 'text-yellow-500',
    bgFill: 'bg-yellow-50',
    description:
      'Spark classroom creativity with engaging activity ideas tailored to your lesson objectives and subject focus.',
  },
  {
    id: 'clarity-core',
    title: 'Clarity Core (Concept Explainer)',
    path: '/educator/tools/clarity-core',
    component: ConceptExplainer,
    icon: 'fa-solid fa-brain',
    textColor: 'text-rose-500',
    bgFill: 'bg-rose-50',
    description:
      'Break down tough concepts into digestible explanations. Great for differentiated instruction and revision support.',
  },
];
