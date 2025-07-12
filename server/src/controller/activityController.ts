import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Activity, { IActivity } from '../models/Activity';
import { createError } from '../middlewares/errorHandler';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import Goal, { IGoal } from '../models/Goal';
import {
  activitiesPerMonth,
  activityCompletionRate,
  averageHoursPerActivity,
  countByStatus,
  countCertificates,
  countTotalDocs,
  getActivityTypeDistribution,
  getDateRanges,
  recentAchievements,
} from '../utils/utils';
import mongoose from 'mongoose';

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

    const sortOption = sortMap[sort] || { createdAt: -1 };

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
      .sort({ createdAt: -1 })
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

//reports
// export const dashboardData = catchAsync(
//   async (req: Request, res: Response): Promise<any> => {
//     const { thisMonth, lastMonth, thisYear, allTime } = getDateRanges();
//     const userId = req.userId;

//     const filter: any = { user: userId };

//     const activities = await Activity.find(filter);
//     const goals = await Goal.find(filter);

//     const calculateCompleted = (
//       activity: IActivity[] | IGoal[],
//       range: DateRange
//     ): number => {
//       return activity.filter(
//         (b) =>
//           b.status === 'completed' &&
//           new Date(b.createdAt) >= range.start &&
//           new Date(b.createdAt) <= range.end
//       ).length;
//     };

//     const calculateCertificates = (
//       activity: IActivity[],
//       range: DateRange
//     ): number => {
//       return activity.filter(
//         (b) =>
//           b.certificate !== '' &&
//           new Date(b.createdAt) >= range.start &&
//           new Date(b.createdAt) <= range.end
//       ).length;
//     };
//     // certificates achieved
//     const certificatesThisMonth = calculateCertificates(activities, thisMonth);
//     const certificatesLastMonth = calculateCertificates(activities, lastMonth);
//     const certificatesThisYear = calculateCertificates(activities, thisYear);
//     const certificatesAllTime = calculateCertificates(activities, allTime);

//     //completed activities
//     const completedActivitiesThisMonth = calculateCompleted(
//       activities,
//       thisMonth
//     );
//     const completedActivitiesLastMonth = calculateCompleted(
//       activities,
//       lastMonth
//     );
//     const completedActivitiesThisYear = calculateCompleted(
//       activities,
//       thisYear
//     );
//     const completedActivitiesAllTime = calculateCompleted(activities, allTime);

//     //completed goals
//     const completedGoalsThisMonth = calculateCompleted(goals, thisMonth);
//     const completedGoalsLastMonth = calculateCompleted(goals, lastMonth);
//     const completedGoalsThisYear = calculateCompleted(goals, thisYear);
//     const completedGoalsAllTime = calculateCompleted(goals, allTime);

//     //total counts
//     const [
//       thisMonthGoals,
//       lastMonthGoals,
//       thisYearGoals,
//       allTimeGoals,
//       thisMonthActivities,
//       lastMonthActivities,
//       thisYearActivities,
//       allTimeActivities,
//     ] = await Promise.all([
//       Goal.countDocuments({
//         user: userId,
//         createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
//       }),
//       Goal.countDocuments({
//         user: userId,
//         createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
//       }),
//       Goal.countDocuments({
//         user: userId,
//         createdAt: { $gte: thisYear.start, $lte: thisYear.end },
//       }),
//       Goal.countDocuments({
//         user: userId,
//         createdAt: { $gte: allTime.start, $lte: allTime.end },
//       }),
//       Activity.countDocuments({
//         user: userId,
//         createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
//       }),
//       Activity.countDocuments({
//         user: userId,
//         createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
//       }),
//       Activity.countDocuments({
//         user: userId,
//         createdAt: { $gte: thisYear.start, $lte: thisYear.end },
//       }),
//       Activity.countDocuments({
//         user: userId,
//         createdAt: { $gte: allTime.start, $lte: allTime.end },
//       }),
//     ]);

//     //activities completed

//     res.status(200).json({
//       success: true,
//       dashboardData: {
//         activities: {
//           thisMonth: thisMonthActivities,
//           lastMonth: lastMonthActivities,
//           thisyear: thisYearActivities,
//           allTime: allTimeActivities,
//         },
//         goals: {
//           thisMonth: thisMonthGoals,
//           lastMonth: lastMonthGoals,
//           thisYear: thisYearGoals,
//           allTime: allTimeGoals,
//         },
//         certificates: {
//           thisMonth: certificatesThisMonth,
//           lastMonth: certificatesLastMonth,
//           thisYear: certificatesThisYear,
//           allTime: certificatesAllTime,
//         },
//         completedActivities: {
//           thisMonth: completedActivitiesThisMonth,
//           lastMonth: completedActivitiesLastMonth,
//           thisYear: completedActivitiesThisYear,
//           allTime: completedActivitiesAllTime,
//         },
//         completedgoals: {
//           thisMonth: completedGoalsThisMonth,
//           lastMonth: completedGoalsLastMonth,
//           thisYear: completedGoalsThisYear,
//           allTime: completedGoalsAllTime,
//         },
//       },
//     });
//   }
// );

//report using mongodb aggregation pipeline
export const dashboardData = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { thisMonth, lastMonth, thisYear, lastYear, allTime } =
      getDateRanges();
    const userId = new mongoose.Types.ObjectId(req.userId);

    const [
      // Total counts
      thisMonthGoals,
      lastMonthGoals,
      thisYearGoals,
      lastYearGoals,
      allTimeGoals,
      thisMonthActivities,
      lastMonthActivities,
      thisYearActivities,
      lastYearActivities,
      allTimeActivities,

      // Completed
      completedGoalsThisMonth,
      completedGoalsLastMonth,
      completedGoalsThisYear,
      completedGoalsLastYear,
      completedGoalsAllTime,
      completedActivitiesThisMonth,
      completedActivitiesLastMonth,
      completedActivitiesThisYear,
      completedActivitiesLastYear,
      completedActivitiesAllTime,

      // Certificates
      certificatesThisMonth,
      certificatesLastMonth,
      certificatesThisYear,
      certificatesLastYear,
      certificatesAllTime,

      //recentAchievements
      achievements,
    ] = await Promise.all([
      countTotalDocs(Goal, thisMonth, userId),
      countTotalDocs(Goal, lastMonth, userId),
      countTotalDocs(Goal, thisYear, userId),
      countTotalDocs(Goal, lastYear, userId),
      countTotalDocs(Goal, allTime, userId),

      countTotalDocs(Activity, thisMonth, userId),
      countTotalDocs(Activity, lastMonth, userId),
      countTotalDocs(Activity, thisYear, userId),
      countTotalDocs(Activity, lastYear, userId),
      countTotalDocs(Activity, allTime, userId),

      countByStatus(Goal, 'completed', thisMonth, userId),
      countByStatus(Goal, 'completed', lastMonth, userId),
      countByStatus(Goal, 'completed', thisYear, userId),
      countByStatus(Goal, 'completed', lastYear, userId),
      countByStatus(Goal, 'completed', allTime, userId),

      countByStatus(Activity, 'completed', thisMonth, userId),
      countByStatus(Activity, 'completed', lastMonth, userId),
      countByStatus(Activity, 'completed', thisYear, userId),
      countByStatus(Activity, 'completed', lastYear, userId),
      countByStatus(Activity, 'completed', allTime, userId),

      countCertificates(thisMonth, userId),
      countCertificates(lastMonth, userId),
      countCertificates(thisYear, userId),
      countCertificates(lastYear, userId),
      countCertificates(allTime, userId),
      recentAchievements(thisMonth, userId),
    ]);

    const typeDistribution = await getActivityTypeDistribution(userId);

    //activity analytics
    const [avg, rate, monthly] = await Promise.all([
      averageHoursPerActivity(userId),
      activityCompletionRate(userId),
      activitiesPerMonth(userId),
    ]);

    res.status(200).json({
      success: true,
      dashboardData: {
        activities: {
          thisMonth: thisMonthActivities,
          lastMonth: lastMonthActivities,
          thisYear: thisYearActivities,
          lastYear: lastYearActivities,
          allTime: allTimeActivities,
        },
        goals: {
          thisMonth: thisMonthGoals,
          lastMonth: lastMonthGoals,
          thisYear: thisYearGoals,
          lastyear: lastYearGoals,
          allTime: allTimeGoals,
        },
        certificates: {
          thisMonth: certificatesThisMonth,
          lastMonth: certificatesLastMonth,
          thisYear: certificatesThisYear,
          lastYear: certificatesLastYear,
          allTime: certificatesAllTime,
        },
        completedActivities: {
          thisMonth: completedActivitiesThisMonth,
          lastMonth: completedActivitiesLastMonth,
          thisYear: completedActivitiesThisYear,
          lastYear: completedActivitiesLastYear,
          allTime: completedActivitiesAllTime,
        },
        completedGoals: {
          thisMonth: completedGoalsThisMonth,
          lastMonth: completedGoalsLastMonth,
          thisYear: completedGoalsThisYear,
          lastYear: completedGoalsLastYear,
          allTime: completedGoalsAllTime,
        },
        typeDistribution,
        achievements,
        averageHoursPerActivity: avg,
        activityCompletionRate: parseFloat(rate.toFixed(2)),
        activitiesPerMonth: monthly,
      },
    });
  }
);
