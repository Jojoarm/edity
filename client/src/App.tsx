import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/Home';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import TokenVerification from './pages/auth/TokenVerification';
import { useAppStore } from './contexts/useAppStore';
import { useEffect } from 'react';
import { fetchUser, validateToken } from './api/user-api';
import ResetPassword from './pages/auth/ResetPassword';
import Register from './pages/auth/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Approval from './pages/admin/Approval';
import AdminTools from './pages/admin/AdminTools';
import AllEducators from './pages/admin/AllEducators';
import AllStudents from './pages/admin/AllStudents';
import CreateAcademicTerm from './pages/admin/tools/CreateAcademicTerm';
import CreateAcademicYear from './pages/admin/tools/CreateAcademicYear';
import CreateClassLevel from './pages/admin/tools/CreateClassLevel';
import CreateCourse from './pages/admin/tools/CreateCourse';
import ManageUsers from './pages/admin/tools/ManageUsers';
import SystemSettings from './pages/admin/tools/SystemSettings';
import CreateSubject from './pages/admin/tools/CreateSubject';
// import LessonPlanner from './pages/educator/tools/LessonPlanner';
import LessonPlan from './pages/educator/tools/LessonPlan';
import CurriculumMappingTool from './pages/educator/tools/CurriculumMappingTool';
import ResourceRecommendationTool from './pages/educator/tools/ResourceRecommendationTool';
import ReportingTool from './pages/educator/tools/ReportingTool';
import ProfessionalDevelopmentTracker from './pages/educator/ProfessionalDevelopmentTracker';
import EducatorLayout from './layouts/EducatorLayout';
// import NewActivity from './components/common/NewActivity';
import ActivitiesList from './pages/educator/ActivitiesList';
// import CreateActivity from './components/common/CreateActivity';
import ActivityForm from './components/common/forms/ActivityForm';
import GoalsManagement from './pages/educator/GoalsManagement';
import ViewReports from './pages/educator/ViewReports';

const App = () => {
  const { setUser, setIsLoggedIn, setAuthLoading } = useAppStore();

  useEffect(() => {
    const initializeAuth = async () => {
      setAuthLoading(true);

      try {
        // Validate token and get the result
        const isValidToken = await validateToken(setIsLoggedIn);

        if (isValidToken) {
          // Token is valid, fetch user data
          await fetchUser(setUser, setAuthLoading);
        } else {
          // Token is invalid, stop loading
          setAuthLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, [setIsLoggedIn, setUser, setAuthLoading]);

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-token" element={<TokenVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* complete profile */}
        <Route path="/complete-profile" element={<Register />} />

        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Educator Routes */}
        <Route element={<EducatorLayout />}>
          <Route
            path="/educator/tools/lesson-planner"
            element={<LessonPlan />}
          />
          <Route
            path="/educator/tools/curriculum-mapping-tool"
            element={<CurriculumMappingTool />}
          />
          <Route
            path="/educator/tools/resource-recommendation-engine"
            element={<ResourceRecommendationTool />}
          />
          <Route
            path="/educator/tools/reporting-tool"
            element={<ReportingTool />}
          />
          <Route
            path="/educator/professional-development-tracker"
            element={<ProfessionalDevelopmentTracker />}
          />
          <Route
            path="/educator/professional-development-tracker/add-activity"
            element={<ActivityForm mode="create" />}
          />
          <Route
            path="/educator/professional-development-tracker/edit-activity/:id"
            element={<ActivityForm mode="edit" />}
          />
          <Route
            path="/educator/professional-development-tracker/activities"
            element={<ActivitiesList />}
          />
          <Route
            path="/educator/professional-development-tracker/goals-management"
            element={<GoalsManagement />}
          />
          <Route
            path="/educator/professional-development-tracker/view-reports"
            element={<ViewReports />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/approval" element={<Approval />} />
          <Route path="/admin/all-educators" element={<AllEducators />} />
          <Route path="/admin/all-students" element={<AllStudents />} />
          <Route path="/admin/tools" element={<AdminTools />} />
          <Route path="/admin/tools/create-course" element={<CreateCourse />} />
          <Route
            path="/admin/tools/create-subject"
            element={<CreateSubject />}
          />
          <Route
            path="/admin/tools/create-class-level"
            element={<CreateClassLevel />}
          />
          <Route
            path="/admin/tools/create-academic-term"
            element={<CreateAcademicTerm />}
          />
          <Route
            path="/admin/tools/create-academic-year"
            element={<CreateAcademicYear />}
          />
          <Route path="/admin/tools/manage-users" element={<ManageUsers />} />
          <Route
            path="/admin/tools/system-settings"
            element={<SystemSettings />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
