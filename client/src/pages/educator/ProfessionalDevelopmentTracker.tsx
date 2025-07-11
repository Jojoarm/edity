import { educatorStats, getStatusColor } from '@/assets/assets';
import Loader from '@/components/common/Loader';
import ProgressBar from '@/components/common/ProgressBar';
import StatsCard from '@/components/common/StatsCard';
import ProfessionalDevelopmentHeader from '@/components/educator/ProfessionalDevelopmentHeader';
import { useAppStore } from '@/contexts/useAppStore';
import { useActivities } from '@/hooks/useActivities';
import { useGoals } from '@/hooks/useGoals';
import { capitalize, formatDate } from '@/lib/utils';
import { Clock, PlusCircle, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfessionalDevelopmentTracker = () => {
  const { user } = useAppStore();
  const { isActivitiesPending, activities } = useActivities();
  const { isGoalsPending, goals } = useGoals();

  return (
    <div className="section min-h-screen bg-light-background-color">
      {/* Header */}
      <ProfessionalDevelopmentHeader />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
            Welcome back, {user?.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Track your professional development journey and achieve your goals.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon="fa-solid fa-clock"
            title="Total PD Hours"
            value={educatorStats.totalHours}
            subtitle="This year"
            bgColor="bg-blue-500"
          />
          <StatsCard
            icon="fa-solid fa-calendar-days"
            title="Activities This Month"
            value={educatorStats.activitiesThisMonth}
            bgColor="bg-green-500"
          />
          <StatsCard
            icon="fa-solid fa-bullseye"
            title="Goals Progress"
            value={`${educatorStats.goalsProgress}%`}
            subtitle="Average completion"
            bgColor="bg-purple-500"
          />
          <StatsCard
            icon="fa-solid fa-certificate"
            title="Certificates"
            value={educatorStats.certificates}
            subtitle="Earned"
            bgColor="bg-orange-500"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Activities
                  </h3>
                  <Link
                    to="/educator/professional-development-tracker/add-activity"
                    className="flex items-center text-primary hover:text-primary-100 text-sm font-medium"
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Add Activity
                  </Link>
                </div>
              </div>
              {isActivitiesPending ? (
                <Loader />
              ) : (
                <div className="divide-y divide-gray-200">
                  {activities?.activityData.slice(0, 3).map((activity) => (
                    <div
                      key={activity._id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {activity.provider} • {capitalize(activity.type)}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.hours} hours • {formatDate(activity.date)}
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span
                            className={`inline-flex min-w-[100px] justify-center px-3 py-1 text-xs font-medium rounded-md text-center ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <Link
                  to="/educator/professional-development-tracker/activities"
                  className="text-primary hover:text-primary-100 text-sm font-medium"
                >
                  View all activities →
                </Link>
              </div>
            </div>
          </div>

          {/* Goals & Progress */}
          <div className="space-y-6">
            {/* Goals Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Goals Progress
                </h3>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              {isGoalsPending ? (
                <Loader />
              ) : (
                <div className="space-y-4">
                  {goals?.goalData.slice(0, 3).map((goal) => (
                    <div key={goal._id}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {goal.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <ProgressBar
                        current={goal.current}
                        target={goal.target}
                      />
                      <p className="text-xs text-gray-500 mt-1 font-medium">
                        Due: {formatDate(goal.deadline)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-7 pt-1 text-center bg-gray-50 border-t border-gray-200">
                <Link
                  to="/educator/professional-development-tracker/goals-management"
                  className="text-primary hover:text-primary-100 text-sm font-medium"
                >
                  Manage Goals →
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <PlusCircle className="w-4 h-4 text-blue-600 mr-3" />
                    <Link
                      to="/educator/professional-development-tracker/add-activity"
                      className="text-sm font-medium"
                    >
                      Log New Activity
                    </Link>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 text-green-600 mr-3" />
                    <Link
                      to="/educator/professional-development-tracker/goals-management"
                      className="text-sm font-medium"
                    >
                      Set New Goal
                    </Link>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-purple-600 mr-3" />
                    <Link className="text-sm font-medium">View Reports</Link>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalDevelopmentTracker;
