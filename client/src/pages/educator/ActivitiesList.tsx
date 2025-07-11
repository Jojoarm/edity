import { deleteActivities, deleteActivity } from '@/api/user-api';
import {
  activityTypes,
  getStatusColor,
  sortOptions,
  statusTypes,
} from '@/assets/assets';
import ConfirmationBox from '@/components/common/ConfirmationBox';
import EmptyState from '@/components/common/EmptyState';
import ExportToCSV from '@/components/common/ExportToCSV';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/common/Pagination';
import PreviewActivity from '@/components/common/PreviewActivity';
import PreviewDoc from '@/components/common/PreviewDoc';
import SortDropdown from '@/components/common/SortDropdown';
import ProfessionalDevelopmentHeader from '@/components/educator/ProfessionalDevelopmentHeader';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useActivities } from '@/hooks/useActivities';
import { useDebounce } from '@/hooks/useDebounce';
import { capitalize, formatDate } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Clock, Edit, Eye, FileText, Plus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

type ActionType = 'delete' | 'deleteMany' | null;

const ActivitiesList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    id: string | string[];
    type: ActionType;
  } | null>(null);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortSelect, setSortSelect] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [previewActivityId, setPreviewActivityId] = useState<string>('');

  const limit = 8;

  useEffect(() => {
    const searchParam = searchParams.get('searchTerm');
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');
    const sortParam = searchParams.get('sort');
    const pageParam = searchParams.get('page');
    setSearchTerm(searchParam || '');
    setFilterType(typeParam || '');
    setFilterStatus(statusParam || '');
    setSortSelect(sortParam || '');
    setCurrentPage(pageParam ? parseInt(pageParam) : 1);
  }, []);

  const updateSearchParams = useCallback(() => {
    const params: Record<string, string> = {};
    if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;
    if (filterType && filterType !== 'all') params.type = filterType;
    if (filterStatus && filterStatus !== 'all') params.status = filterStatus;
    if (currentPage > 1) params.page = currentPage.toString();
    if (sortSelect) params.sort = sortSelect;
    params.limit = limit.toString();
    setSearchParams(params);
  }, [
    debouncedSearchTerm,
    filterType,
    filterStatus,
    currentPage,
    sortSelect,
    limit,
    setSearchParams,
  ]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  useEffect(() => {
    setSelectedActivities([]);
  }, [debouncedSearchTerm, filterType, filterStatus, sortSelect]);

  const { isActivitiesPending, activities } = useActivities(searchParams);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterStatus('');
    setSortSelect('');
    setCurrentPage(1);
    setSearchParams({});
  };

  const tableTitle = [
    'Activity',
    'Type',
    'Provider',
    'Hours',
    'Date',
    'Status',
    'Action',
  ];

  if (isActivitiesPending) return <Loader />;

  const pagination = activities?.pagination;
  const filteredActivities = activities?.activityData;

  const handleSelectActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((actId) => actId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (!filteredActivities || filteredActivities.length === 0) return;

    if (selectedActivities.length === filteredActivities.length) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(filteredActivities.map((activity) => activity._id));
    }
  };

  const openConfirmation = (id: string | string[], type: ActionType) => {
    setPendingAction({ id, type });
    setConfirmationVisible(true);
  };

  const handleConfirmAction = async () => {
    if (!pendingAction) return;

    const { id, type } = pendingAction;
    setConfirmationVisible(false);

    if (type === 'delete') {
      await deleteActivity(id as string);
    } else if (type === 'deleteMany') {
      await deleteActivities(id as string[]);
      setSelectedActivities([]);
    }
    await queryClient.invalidateQueries({
      queryKey: ['activities'],
    });
    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setConfirmationVisible(false);
    setPendingAction(null);
  };

  return (
    <div className="section min-h-screen bg-light-background-color">
      {/* Header */}
      <ProfessionalDevelopmentHeader />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
              Professional Development Activities
            </h2>
            <p className="text-gray-600">
              Set, track, and achieve your professional activities.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ExportToCSV
              data={filteredActivities || []}
              headers={[
                'Title',
                'Type',
                'Provider',
                'Hours',
                'Date',
                'Status',
                'Description',
              ]}
              filename="activities.csv"
              getRowData={(activity) => [
                activity.title,
                activity.type,
                activity.provider,
                activity.hours,
                formatDate(activity.date),
                activity.status,
                activity.description || '',
              ]}
            />
            <Link
              to="/educator/professional-development-tracker/add-activity"
              state={{ from: location.pathname }}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Activity
            </Link>
          </div>
        </div>

        <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <p
            className="absolute right-0 top-0 text-gray-400 underline py-2 px-4 text-xs cursor-pointer"
            onClick={clearFilters}
          >
            Clear Filters
          </p>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-2">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap space-y-1 space-x-4 text-gray-500">
              <SortDropdown
                options={sortOptions}
                selected={sortSelect}
                onSelect={setSortSelect}
                placeholder="Sort by"
              />

              <SortDropdown
                options={activityTypes}
                selected={filterType}
                onSelect={setFilterType}
                placeholder="All Types"
              />

              <SortDropdown
                options={statusTypes}
                selected={filterStatus}
                onSelect={setFilterStatus}
                placeholder="All Status"
              />
            </div>
          </div>

          {/* Result Summary */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredActivities?.length} of {pagination?.totalItems}{' '}
              activities
            </p>
            {selectedActivities.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedActivities.length} selected
                </span>
                <button
                  onClick={() =>
                    openConfirmation(selectedActivities, 'deleteMany')
                  }
                  className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activities Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table className="w-full [&_th]:p-4 [&_td]:p-4">
            <TableHeader>
              <TableRow className=" font-playfiar">
                <TableHead className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filteredActivities
                        ? selectedActivities.length ===
                          filteredActivities.length
                        : false
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </TableHead>
                {tableTitle.map((item, index) => (
                  <TableHead
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={index}
                  >
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredActivities && filteredActivities.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32">
                    <EmptyState
                      title="No activity found!"
                      description="You have no activity added yet, please add one"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredActivities?.map((activity) => (
                  <TableRow key={activity._id} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity._id)}
                        onChange={() => handleSelectActivity(activity._id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {activity.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="capitalize text-sm text-gray-900">
                        {activity.type}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {activity.provider}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {activity.hours}h
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {formatDate(activity.date)}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`inline-flex min-w-[100px] justify-center px-3 py-1.5 text-xs font-medium rounded-md text-center ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {capitalize(activity.status)}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setPreviewActivityId(activity._id)}
                          className="text-primary hover:text-primary-500 cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/educator/professional-development-tracker/edit-activity/${activity._id}`
                            )
                          }
                          className="text-gray-600 hover:text-gray-700 cursor-pointer"
                          title="Edit Activity"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {activity.certificate && (
                          <button
                            className="text-green-600 hover:text-green-700 cursor-pointer"
                            title="View Certificate"
                            onClick={() => setPreviewUrl(activity.certificate)}
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            openConfirmation(activity._id, 'delete')
                          }
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                          title="Delete Activity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableCaption className="pb-4">
              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages || 1}
                  onPageChange={setCurrentPage}
                />
              )}
            </TableCaption>
          </Table>
        </div>
      </main>

      {/* activity preview */}
      {previewActivityId && (
        <PreviewActivity
          id={previewActivityId}
          onClose={() => setPreviewActivityId('')}
        />
      )}

      {/* certificate preview */}
      {previewUrl && (
        <PreviewDoc url={previewUrl} onClose={() => setPreviewUrl(undefined)} />
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

export default ActivitiesList;
