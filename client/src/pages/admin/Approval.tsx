import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approvePendingRequest,
  fetchPendingRequests,
  rejectPendingRequest,
} from '../../api/admin-api';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import Title from '../../components/common/Title';
import { capitalize, formatDate } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/common/Pagination';
import type { UserType } from '@/types';
import toast from 'react-hot-toast';
import ConfirmationBox from '@/components/common/ConfirmationBox';
import EmptyState from '@/components/common/EmptyState';
import Breadcrumb from '@/components/admin/BreadCrumb';

interface RoleRequestData {
  _id: string;
  requestedRole: string;
  status: string;
  user: UserType;
}

type ActionType = 'approve' | 'reject' | null;

const Approval = () => {
  const queryClient = useQueryClient();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: ActionType;
  } | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [roleQuery, setRoleQuery] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [roleId, setRoleId] = useState('');
  const limit = 4;

  const approveMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => approvePendingRequest(id),
    onSuccess: async () => {
      setRoleId('');
      await queryClient.invalidateQueries({
        queryKey: ['fetchPendingApprovals'],
      });
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => rejectPendingRequest(id),
    onSuccess: async () => {
      setRoleId('');
      await queryClient.invalidateQueries({
        queryKey: ['fetchPendingApprovals'],
      });
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const openConfirmation = (id: string, type: ActionType) => {
    setRoleId(id);
    setPendingAction({ id, type });
    setConfirmationVisible(true);
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;

    const { id, type } = pendingAction;
    setConfirmationVisible(false);

    if (type === 'approve') {
      approveMutation.mutate({ id });
    } else if (type === 'reject') {
      rejectMutation.mutate({ id });
    }

    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setConfirmationVisible(false);
    setPendingAction(null);
  };

  //filtering
  //hydrating state from url
  useEffect(() => {
    const nameParam = searchParams.get('name');
    const roleParam = searchParams.get('role');
    const sortParam = searchParams.get('sort');
    const pageParam = searchParams.get('page');
    setNameQuery(nameParam || '');
    setRoleQuery(roleParam || '');
    setSelectedSort(sortParam || '');
    setCurrentPage(pageParam ? parseInt(pageParam) : 1);
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (nameQuery) params.name = nameQuery;
    if (roleQuery) params.role = roleQuery;
    if (currentPage > 1) params.page = currentPage.toString();
    if (selectedSort) params.sort = selectedSort;
    params.limit = limit.toString();
    setSearchParams(params);
  }, [currentPage, nameQuery, selectedSort, limit]);

  const { data, isPending } = useQuery({
    queryKey: ['fetchPendingApprovals', searchParams.toString()],
    queryFn: () => fetchPendingRequests(searchParams),
  });

  if (isPending) return <Loader />;

  const pagination = data.pagination;
  const requestData = data.requests;

  const sortOptions = [
    'Newest First',
    'Oldest First',
    'Admin',
    'Student',
    'Educator',
    'Stakeholder',
    'Researcher',
  ];
  const tableTitle = [
    'No.',
    'Name',
    'Email Address',
    'Date Joined',
    'Requested Role',
    'Status',
    'Action',
  ];

  const handleSortSelect = (item: string) => {
    setSelectedSort(item);
    setSortOpen(false);
  };

  const clearFilters = () => {
    setNameQuery('');
    setSelectedSort('');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb />
      <Title
        align="left"
        title="Manage Approval Requests"
        subtitle="Filter, sort, approve/deny user's role-approval requests"
      />

      <div className="relative mt-5 mb-10  bg-white border rounded-2xl">
        {/* filters */}
        <p
          className="absolute right-0 top-0 text-gray-400 underline py-2 px-4 text-sm cursor-pointer"
          onClick={clearFilters}
        >
          Clear Filters
        </p>
        <div className="flex justify-between w-full pt-7">
          <div className="flex items-center text-sm bg-white h-12 border m-2 pl-2 rounded-2xl border-gray-500/30 w-full max-w-sm overflow-hidden">
            <input
              className="px-2 w-full h-full outline-none text-gray-500 bg-transparent"
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearchData(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setNameQuery(searchData);
                  setCurrentPage(1); //reset to page 1 on new search
                }
              }}
            />
            <img
              src="/assets/icons/searchIcon.svg"
              className="size-10 text-gray-600 bg-gray-500 h-full cursor-pointer"
              onClick={() => {
                setNameQuery(searchData);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex flex-col w-44 m-2 text-sm text-gray-600 relative">
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="w-full text-left px-4 pr-2 py-2 border rounded-2xl bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <span>{selectedSort || 'Sort'}</span>
              <img
                src="/assets/icons/arrow-down.svg"
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  sortOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {sortOpen && (
              <ul className="absolute z-10 w-full top-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                {sortOptions.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                    onClick={() => handleSortSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Table className=" w-full [&_th]:p-4 [&_td]:p-4">
          <TableCaption className="pb-4">
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages || 1}
                onPageChange={setCurrentPage}
              />
            )}
          </TableCaption>
          <TableHeader>
            <TableRow className="font-semibold text-gray-600 p-2  items-center text-base font-playfiar">
              {tableTitle.map((item, index) => (
                <TableHead
                  className="font-semibold text-gray-600 p-2  items-center text-base "
                  key={index}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {requestData.length < 1 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32">
                  <EmptyState
                    title="No Pending Requests"
                    description="There are currently no role approval requests waiting for your review."
                  />
                </TableCell>
              </TableRow>
            ) : (
              requestData.map((data: RoleRequestData, index: number) => (
                <TableRow
                  key={data._id}
                  className="border rounded-2xl p-10 bg-white shadow hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="p-4">
                    <p className="text-gray-600">
                      ({(currentPage - 1) * limit + index + 1})
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <div className="size-7 md:size-9 flex justify-center items-center rounded-full bg-gray-500 overflow-hidden">
                        {data.user.profilePicture ? (
                          <img
                            src={`${data.user.profilePicture}`}
                            alt="profile picture"
                            className=" object-cover "
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <p className="text-center text-white font-normal text-xl">
                            {data.user.name[0]}
                          </p>
                        )}
                      </div>
                      <p className="font-normal text-gray-600 text-base">
                        {data.user.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-normal text-gray-600 text-base">
                      {data.user.email}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-normal text-gray-600 text-base">
                      {formatDate(data.user.createdAt)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-gray-600">
                      {capitalize(data.requestedRole)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="font-normal text-gray-600 text-base">
                      {capitalize(data.status)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="relative flex items-center gap-4">
                      {approveMutation.isPending && roleId === data._id ? (
                        <div className="animate-spin rounded-full size-5 m-auto border-2 border-white border-t-[#2563eb] "></div>
                      ) : (
                        <button
                          className="text-navy-500 cursor-pointer py-1 px-2 border border-navy-500 rounded-3xl hover:bg-navy-50"
                          disabled={
                            rejectMutation.isPending && roleId === data._id
                          }
                          onClick={() => openConfirmation(data._id, 'approve')}
                        >
                          Approve
                        </button>
                      )}

                      {rejectMutation.isPending && roleId === data._id ? (
                        <div className="animate-spin rounded-full size-5 m-auto border-2 border-white border-t-primary "></div>
                      ) : (
                        <button
                          className="text-red-500 cursor-pointer py-1 px-2 border border-red-500 rounded-3xl hover:bg-red-50 "
                          disabled={
                            approveMutation.isPending && roleId === data._id
                          }
                          onClick={() => openConfirmation(data._id, 'reject')}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* action confirmation box */}
      {confirmationVisible && (
        <ConfirmationBox
          message={`Confirm ${
            pendingAction?.type === 'approve' ? 'Approval' : 'Rejection'
          }`}
          subMessage="Are you sure you want to proceed with this action?"
          onConfirm={handleConfirmAction}
          onCancel={handleCancelAction}
        />
      )}
    </div>
  );
};

export default Approval;
