import api from '../lib/axios';

export const fetchPendingRequests = async (params: URLSearchParams) => {
  try {
    const { data } = await api.get(`/api/admin/pending-requests?${params}`);
    if (data.success) {
      return data.requestData;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const approvePendingRequest = async (requestId: string) => {
  const { data } = await api.put('/api/admin/approve-request', {
    requestId,
  });
  return data;
};

export const rejectPendingRequest = async (requestId: string) => {
  const { data } = await api.put('/api/admin/reject-request', {
    requestId,
  });
  return data;
};
