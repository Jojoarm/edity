import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth';
import {
  approveRequest,
  getPendingRoleRequests,
  rejectRequest,
} from '../controller/adminController';

const adminRouter = express.Router();

adminRouter.get(
  '/pending-requests',
  verifyToken,
  isAdmin,
  getPendingRoleRequests
);
adminRouter.put('/approve-request', verifyToken, isAdmin, approveRequest);
adminRouter.put('/reject-request', verifyToken, isAdmin, rejectRequest);

export default adminRouter;
