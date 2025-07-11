import { useEffect, useState, useMemo } from 'react';
import { Target, Plus, Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import {
  getPriorityColor,
  getStatusColor,
  priorityType,
  statusTypes,
} from '@/assets/assets';
import ProfessionalDevelopmentHeader from '@/components/educator/ProfessionalDevelopmentHeader';
import SortDropdown from '@/components/common/SortDropdown';
import ProgressBar from '@/components/common/ProgressBar';
import { capitalize, formatDate } from '@/lib/utils';
import GoalsForm from '@/components/common/forms/GoalsForm';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useGoals } from '@/hooks/useGoals';
import { deleteGoal } from '@/api/user-api';
import Loader from '@/components/common/Loader';
import ConfirmationBox from '@/components/common/ConfirmationBox';
import type { GoalData } from '@/types';

const GoalsManagement = () => {
  const queryClient = useQueryClient();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ id: string } | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showEditGoadModalId, setShowEditGoalModalId] = useState('');

  // State for infinite scrolling
  const [allGoals, setAllGoals] = useState<GoalData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Intersection Observer hook
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: false,
  });

  const getDaysRemaining = (deadline: string | Date): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const limit = 3;

  // Memoize the search params to prevent unnecessary re-renders
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (filterPriority && filterPriority !== 'all') {
      params.append('priority', filterPriority);
    }
    if (filterStatus && filterStatus !== 'all') {
      params.append('status', filterStatus);
    }
    params.append('page', currentPage.toString());
    params.append('limit', limit.toString());
    return params;
  }, [filterPriority, filterStatus, currentPage, limit]);

  // Initialize filters from URL params
  useEffect(() => {
    const priorityParam = searchParams.get('priority');
    const statusParam = searchParams.get('status');

    setFilterPriority(priorityParam || 'all');
    setFilterStatus(statusParam || 'all');
  }, []);

  // Update URL when filters change
  useEffect(() => {
    setSearchParams(queryParams);
  }, [queryParams, setSearchParams]);

  const { isGoalsPending, goals } = useGoals(queryParams);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setAllGoals([]);
    setHasMore(true);
    setIsLoadingMore(false);
  }, [filterPriority, filterStatus]);

  // Update goals when new data comes in
  useEffect(() => {
    if (goals?.goalData && !isGoalsPending) {
      const pagination = goals.pagination;

      if (currentPage === 1) {
        // First page or filter change - replace all goals
        setAllGoals(goals.goalData);
      } else {
        // Subsequent pages - append to existing goals
        setAllGoals((prev) => {
          // Prevent duplicates
          const newGoals = goals.goalData.filter(
            (newGoal) =>
              !prev.some((existingGoal) => existingGoal._id === newGoal._id)
          );
          return [...prev, ...newGoals];
        });
      }

      // Check if there are more pages
      setHasMore(pagination.currentPage < pagination.totalPages);
      setIsLoadingMore(false);
    }
  }, [goals, currentPage, isGoalsPending]);

  // Handle infinite scrolling when trigger element comes into view
  useEffect(() => {
    if (inView && hasMore && !isGoalsPending && !isLoadingMore) {
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isGoalsPending, isLoadingMore]);

  const openConfirmation = (id: string) => {
    setPendingAction({ id });
    setConfirmationVisible(true);
  };

  const handleConfirmAction = async () => {
    if (!pendingAction) return;

    const { id } = pendingAction;
    setConfirmationVisible(false);

    try {
      await deleteGoal(id as string);
      // Remove deleted goal from allGoals
      setAllGoals((prev) => prev.filter((goal) => goal._id !== id));

      await queryClient.invalidateQueries({
        queryKey: ['goals'],
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
    }

    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setConfirmationVisible(false);
    setPendingAction(null);
  };

  const handleFilterChange = (type: 'status' | 'priority', value: string) => {
    if (type === 'status') {
      setFilterStatus(value);
    } else {
      setFilterPriority(value);
    }
  };

  return (
    <div className="section min-h-screen bg-gray-50">
      {/* Header */}
      <ProfessionalDevelopmentHeader />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
              Goals Management
            </h2>
            <p className="text-gray-600">
              Set, track, and achieve your professional development goals.
            </p>
          </div>
          <button
            onClick={() => setShowAddGoalModal(true)}
            className="flex items-center px-4 py-2 mt-2 md:mt-0 bg-primary text-white rounded-lg hover:bg-primary-100 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Goal
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <SortDropdown
                options={statusTypes}
                selected={filterStatus}
                onSelect={(value) => handleFilterChange('status', value)}
                placeholder="All Status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Priority
              </label>
              <SortDropdown
                options={priorityType}
                selected={filterPriority}
                onSelect={(value) => handleFilterChange('priority', value)}
                placeholder="All Priorities"
              />
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        {isGoalsPending && currentPage === 1 ? (
          <Loader />
        ) : allGoals.length === 0 && !isGoalsPending ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No goals found
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' && filterPriority === 'all'
                ? 'Get started by creating your first professional development goal.'
                : 'No goals match your current filters.'}
            </p>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-100 transition-colors cursor-pointer"
            >
              Add Goal
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {allGoals.map((goal) => {
                const daysRemaining = getDaysRemaining(goal.deadline);
                return (
                  <div
                    key={goal._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {goal.description}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`inline-flex min-w-[100px] justify-center px-3 py-1 text-xs font-medium rounded-md text-center ${getStatusColor(
                              goal.status
                            )}`}
                          >
                            {capitalize(goal.status.replace('-', ' '))}
                          </span>
                          <span
                            className={`inline-flex min-w-[60px] justify-center px-3 py-1 text-xs font-medium rounded-md text-center ${getPriorityColor(
                              goal.priority
                            )}`}
                          >
                            {capitalize(goal.priority)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowEditGoalModalId(goal._id)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openConfirmation(goal._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar current={goal.current} target={goal.target} />

                    {/* Goal Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Due: {formatDate(goal.deadline)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {daysRemaining > 0
                            ? `${daysRemaining} days remaining`
                            : daysRemaining === 0
                            ? 'Due today'
                            : `${Math.abs(daysRemaining)} days overdue`}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Target className="w-4 h-4 mr-2" />
                        <span>{goal.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Infinite Scroll Trigger */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {isLoadingMore ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-gray-600">Loading more goals...</span>
                  </div>
                ) : (
                  <div className="h-4 w-full bg-transparent"></div>
                )}
              </div>
            )}

            {/* End of list indicator */}
            {!hasMore && allGoals.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>You've reached the end of your goals list.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Add/Edit Goal Modal */}
      {showAddGoalModal && (
        <GoalsForm onClose={() => setShowAddGoalModal(false)} />
      )}

      {showEditGoadModalId && (
        <GoalsForm
          mode="edit"
          goalId={showEditGoadModalId}
          onClose={() => setShowEditGoalModalId('')}
        />
      )}

      {/* delete confirmation */}
      {confirmationVisible && (
        <ConfirmationBox
          message="Confirm Delete!"
          subMessage="Are you sure you want to proceed with this action?"
          badgeColor="bg-red-100"
          buttonColor="bg-red-500"
          buttonHover="hover:bg-red-600"
          onConfirm={handleConfirmAction}
          onCancel={handleCancelAction}
        />
      )}
    </div>
  );
};

export default GoalsManagement;
