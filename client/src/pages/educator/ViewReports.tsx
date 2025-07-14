import { useState } from 'react';
import ProfessionalDevelopmentHeader from '@/components/educator/ProfessionalDevelopmentHeader';
import SortDropdown from '@/components/common/SortDropdown';
import { useDashboardData } from '@/hooks/useDashBoardData';
import SummaryCard from '@/components/common/cards/SummaryCard';
import { getDashboardCounts, getGoalCompletionPercentage } from '@/lib/utils';
import ChartArea from '@/components/common/charts/ChartArea';
import PieChartArea from '@/components/common/charts/PieChartArea';
import ViewReportsSkeleton from '@/page-skeletons/ViewReportsSkeleton';

const ViewReports = () => {
  const [filterDate, setFilterDate] = useState<'thisMonth' | 'thisYear'>(
    'thisMonth'
  );
  const { dashboardData } = useDashboardData();

  const dateOptions = [
    { value: 'thisMonth', label: 'This Month' },
    { value: 'thisYear', label: 'This Year' },
  ];
  const selectedOption = dateOptions
    .find((option) => option.value === filterDate)
    ?.label.toLowerCase();

  //setting summary data
  const { current: currentActivities, last: lastActivities } =
    getDashboardCounts(dashboardData, 'activities', filterDate);

  const { current: currentCompletedActivities, last: lastCompletedActivities } =
    getDashboardCounts(dashboardData, 'completedActivities', filterDate);

  const { current: currentCompletedGoals } = getDashboardCounts(
    dashboardData,
    'completedGoals',
    filterDate
  );

  const { current: totalGoals } = getDashboardCounts(
    dashboardData,
    'goals',
    filterDate
  );

  const { current: currentCertificates, last: lastCertificates } =
    getDashboardCounts(dashboardData, 'certificates', filterDate);

  return (
    <div className="section min-h-screen bg-light-background-color">
      {/* Header */}
      <ProfessionalDevelopmentHeader />

      {/* Main Content */}
      {!dashboardData ? (
        <ViewReportsSkeleton />
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
                Professional Development Reports
              </h2>
              <p className="text-gray-600">
                See a broad analytics of your professional development.
              </p>
            </div>
          </div>
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div>
              <SortDropdown
                options={dateOptions}
                selected={filterDate}
                onSelect={(value) =>
                  setFilterDate(value as 'thisMonth' | 'thisYear')
                }
                placeholder="Sort by"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Total Activities"
              subtitle={{
                increment: `Increased engagement during ${selectedOption}`,
                decrement: `Reduced participation during ${selectedOption}`,
              }}
              description={{
                increment:
                  'More professional development activities are being logged.',
                decrement: 'Fewer activities recorded than usual.',
              }}
              total={currentActivities}
              currentCount={currentActivities}
              lastCount={lastActivities}
            />

            <SummaryCard
              title="Activities Completed"
              subtitle={{
                increment: `Higher completion rate recorded ${selectedOption}`,
                decrement: `Completion rate dipped ${selectedOption}`,
              }}
              description={{
                increment:
                  'Educator is following through on their learning goals.',
                decrement: 'Fewer planned activities reached completion.',
              }}
              total={currentCompletedActivities}
              currentCount={currentCompletedActivities}
              lastCount={lastCompletedActivities}
            />

            <SummaryCard
              title="Goals Achieved"
              subtitle={{
                increment: `Achieved ${getGoalCompletionPercentage(
                  currentCompletedGoals,
                  totalGoals
                )}% of set goals in ${selectedOption}`,
                decrement: `Goal completion stands at ${getGoalCompletionPercentage(
                  currentCompletedGoals,
                  totalGoals
                )}% for ${selectedOption}`,
              }}
              description={{
                increment: 'Goal achievement is tracking well this period.',
                decrement: 'Progress toward goals could be improved.',
              }}
              total={`${currentCompletedGoals}/${totalGoals}`}
              currentCount={currentCompletedGoals}
              lastCount={totalGoals}
            />

            <SummaryCard
              title="Certifications"
              subtitle={{
                increment: `${
                  currentCertificates - lastCertificates
                } more certifications earned in ${selectedOption}`,
                decrement: 'No growth in certifications during this period',
              }}
              description={{
                increment: 'Educator earning more certifications.',
                decrement: 'Certification progress has stalled recently.',
              }}
              total={currentCertificates}
              currentCount={currentCertificates}
              lastCount={lastCertificates}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Monthly Hours Chart */}
            <ChartArea
              monthlyBreakdown={
                dashboardData?.activitiesPerMonth?.monthlyBreakdown ?? []
              }
            />

            {/* Activity Types Chart */}
            <PieChartArea
              typeDistribution={dashboardData?.typeDistribution ?? []}
            />
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-600 font-roboto mb-4">
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {dashboardData?.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <i className="fa-solid fa-award text-3xl text-orange-600"></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {achievement.provider} • {achievement.type}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-600 font-roboto mb-4">
              Detailed Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {dashboardData?.averageHoursPerActivity.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Average Hours per Activity
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-new-600 mb-2">
                  {dashboardData?.activityCompletionRate}%
                </div>
                <div className="text-sm text-gray-500">
                  Activity Completion Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-500 mb-2">
                  {dashboardData?.activitiesPerMonth.averagePerMonth}
                </div>
                <div className="text-sm text-gray-500">
                  Activities per Month
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReports;
