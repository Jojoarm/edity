import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import User from '../../models/User';
import RoleRequest from '../../models/RoleRequest';
import { Types } from 'mongoose';
import { assignRolePermissions } from '../../utils/permissions';
import { createError } from '../../middlewares/errorHandler';

export const getPendingRoleRequests = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const name = req.query.name as string;
    const sort = (req.query.sort as string) || '';

    let filter: any = { status: 'pending' };

    if (name) {
      const users = await User.find({
        name: { $regex: name, $options: 'i' },
      }).select('_id');

      const userIds = users.map((user) => user._id);
      filter.user = { $in: userIds };
    }

    let sortOption: any = {};
    if (sort === 'Oldest First') {
      sortOption.createdAt = 1;
    } else if (sort === 'Newest First') {
      sortOption.createdAt = -1;
    } else if (sort === 'Admin') {
      sortOption.requestedRole = 1;
      filter.requestedRole = 'admin';
    } else if (sort === 'Educator') {
      sortOption.requestedRole = 1;
      filter.requestedRole = 'educator';
    } else if (sort === 'Student') {
      sortOption.requestedRole = 1;
      filter.requestedRole = 'student';
    } else if (sort === 'Researcher') {
      sortOption.requestedRole = 1;
      filter.requestedRole = 'researcher';
    } else if (sort === 'Stakeholder') {
      sortOption.requestedRole = 1;
      filter.requestedRole = 'stakeholder';
    } else {
      sortOption.createdAt = -1;
    }

    const roleRequests = await RoleRequest.find(filter)
      .populate('user')
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await RoleRequest.countDocuments(filter);

    res.status(200).json({
      success: true,
      requestData: {
        requests: roleRequests,
        pagination: {
          currentPage: page,
          totalRequests: total,
          totalPages: Math.ceil(total / limit),
          pageSize: limit,
        },
      },
    });
  }
);

export const approveRequest = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { requestId } = req.body;
    const adminId = req.userId;
    const roleRequest = await RoleRequest.findById(requestId).populate('user');

    if (!roleRequest) {
      return res.status(404).json({
        success: false,
        message: 'Role request not found',
      });
    }
    if (roleRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Role request has already been processed',
      });
    }

    roleRequest.status = 'approved';
    roleRequest.reviewedBy = new Types.ObjectId(adminId);
    roleRequest.reviewedAt = new Date();
    await roleRequest.save();

    // Update user role and assign permissions
    const user = await User.findById(roleRequest.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    user.role = roleRequest.requestedRole;
    user.applicationStatus = 'approved';
    user.modifiedBy = new Types.ObjectId(adminId);

    // Assign role-based permissions
    user.permissions = assignRolePermissions(roleRequest.requestedRole);

    // ✅ Initialize role-specific fields automatically
    user.initializeRoleData();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Role request approved successfully',
      data: {
        requestId: roleRequest._id,
        userId: user._id,
        newRole: user.role,
        permissions: user.permissions,
      },
    });
  }
);

export const rejectRequest = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { requestId } = req.body;
    const adminId = req.userId;
    const roleRequest = await RoleRequest.findById(requestId).populate('user');

    if (!roleRequest) {
      return res.status(404).json({
        success: false,
        message: 'Role request not found',
      });
    }
    if (roleRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Role request has already been processed',
      });
    }

    roleRequest.status = 'rejected';
    roleRequest.reviewedBy = new Types.ObjectId(adminId);
    roleRequest.reviewedAt = new Date();
    await roleRequest.save();

    // Update user role and assign permissions
    const user = await User.findById(roleRequest.user._id);
    if (!user) throw createError('User not found');

    user.role = 'unassigned';
    user.applicationStatus = 'rejected';
    user.modifiedBy = new Types.ObjectId(adminId);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Role request rejected',
    });
  }
);
