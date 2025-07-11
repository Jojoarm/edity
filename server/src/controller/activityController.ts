import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Activity from '../models/Activity';
import { createError } from '../middlewares/errorHandler';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import Goal from '../models/Goal';

// create activity
export const createActivity = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const { title, type, provider, hours, date, status, description } =
      req.body;

    let certificate = '';
    if (req.file) {
      certificate = await uploadToCloudinary({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        folder: 'activity_certificate',
      });
    }

    await Activity.create({
      title,
      type,
      provider,
      hours,
      date,
      status,
      description,
      certificate,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Activity successfully created!',
      certificate,
    });
  }
);

//update activity
export const updateActivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { id } = req.params;
    const { title, type, provider, hours, date, status, description } =
      req.body;

    // Find the activity and check ownership
    const activity = await Activity.findOne({ _id: id, user: userId });

    if (!activity)
      throw createError(
        'Activity not found or you do not have permission to update it',
        404
      );

    let certificate = activity.certificate;
    if (req.file) {
      certificate = await uploadToCloudinary({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        folder: 'activity_certificate',
      });
    }

    // Update the activity
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        title,
        type,
        provider,
        hours,
        date,
        status,
        description,
        certificate,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Activity successfully updated!',
      data: updatedActivity,
    });
  }
);

// fetch activities
export const fetchActivities = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const type = (req.query.type as string) || '';
    const status = (req.query.status as string) || '';
    const sort = (req.query.sort as string) || '';
    const searchTerm = (req.query.searchTerm as string) || '';

    const filter: any = { user: userId };
    if (type) {
      filter.type = { $regex: type, $options: 'i' };
    }
    if (status) {
      filter.status = { $regex: status, $options: 'i' };
    }
    if (searchTerm) {
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { provider: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    //sorting
    const sortMap: Record<string, any> = {
      'date-desc': { createdAt: -1 },
      'date-asc': { createdAt: 1 },
      'title-asc': { title: 1 },
      'title-desc': { title: -1 },
      'hours-desc': { hours: -1 },
      'hours-asc': { hours: 1 },
    };

    const sortOption = sortMap[sort] || {};

    const total = await Activity.countDocuments(filter);

    const activities = await Activity.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    // if (activities.length === 0) throw createError('No Activity found');

    res.status(200).json({
      success: true,
      activityData: activities,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
      },
    });
  }
);

//fetch single activity
export const fetchActivity = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const activity = await Activity.findById(id)
      .populate({
        path: 'user',
        select: '-password',
      })
      .lean();
    if (!activity) throw createError('Activity not found!', 400);
    res.status(200).json({
      success: true,
      message: 'Activity fetched',
      activity,
    });
  }
);

//delete activity
export const deleteActivity = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) throw createError('Activity not found!', 400);

    await activity.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully',
    });
  }
);

//bulk delete
export const deleteActivities = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return createError('No activity IDs provided', 400);
    }

    const result = await Activity.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} activities deleted successfully`,
    });
  }
);

export const createGoal = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const {
      title,
      type,
      description,
      current,
      target,
      deadline,
      status,
      priority,
      category,
    } = req.body;

    await Goal.create({
      title,
      type,
      description,
      current,
      target,
      deadline,
      status,
      priority,
      category,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Goal successfully created!',
    });
  }
);

//update goal
export const updateGoal = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { id } = req.params;
    const {
      title,
      type,
      description,
      current,
      target,
      deadline,
      status,
      priority,
      category,
    } = req.body;

    // Find goal and check ownership
    const goal = await Goal.findOne({ _id: id, user: userId });

    if (!goal)
      throw createError(
        'Goal not found or you do not have permission to update it',
        404
      );

    // Update goal
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      {
        title,
        type,
        description,
        current,
        target,
        deadline,
        status,
        priority,
        category,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Goal successfully updated!',
      data: updatedGoal,
    });
  }
);

// fetch goals
export const fetchGoals = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const priority = (req.query.priority as string) || '';
    const status = (req.query.status as string) || '';

    const filter: any = { user: userId };
    if (priority) {
      filter.priority = { $regex: priority, $options: 'i' };
    }
    if (status) {
      filter.status = { $regex: status, $options: 'i' };
    }

    const total = await Goal.countDocuments(filter);

    const goals = await Goal.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    // if (goals.length === 0) throw createError('No Goal found');

    res.status(200).json({
      success: true,
      goalData: goals,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
      },
    });
  }
);

//fetch single goal
export const fetchGoal = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const goal = await Goal.findById(id)
      .populate({
        path: 'user',
        select: '-password',
      })
      .lean();
    if (!goal) throw createError('Goal not found!', 400);
    res.status(200).json({
      success: true,
      message: 'Goal fetched',
      goal,
    });
  }
);

//delete goal
export const deleteGoal = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) throw createError('Goal not found!', 400);

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Goal deleted successfully',
    });
  }
);
