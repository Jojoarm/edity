import { GoogleGenAI } from '@google/genai';
import mongoose from 'mongoose';
import Activity from '../models/Activity';

type DateRange = {
  start: Date;
  end: Date;
};

export const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const getDateRanges = () => {
  const now = new Date();

  // This Month
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  // Last Month
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );

  // This Year
  const thisYearStart = new Date(now.getFullYear(), 0, 1);
  const thisYearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  //Last Year
  const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);

  // All Time starting from Jan 1, 1970
  const allTimeStart = new Date(0); // Epoch start
  const allTimeEnd = new Date(now); // Now

  return {
    thisMonth: { start: thisMonthStart, end: thisMonthEnd },
    lastMonth: { start: lastMonthStart, end: lastMonthEnd },
    thisYear: { start: thisYearStart, end: thisYearEnd },
    lastYear: { start: lastYearStart, end: lastYearEnd },
    allTime: { start: allTimeStart, end: allTimeEnd },
  };
};

// Helper to get month name
const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1); // JS months are 0-indexed
  return date.toLocaleString('default', { month: 'short' }); // e.g., "Jul"
};

//educator dashboard calculations
export const countByStatus = async (
  model: any,
  status: string,
  range: DateRange,
  userId: mongoose.Types.ObjectId
) => {
  const result = await model.aggregate([
    {
      $match: {
        user: userId,
        status,
        createdAt: { $gte: range.start, $lte: range.end },
      },
    },
    { $count: 'count' },
  ]);

  return result[0]?.count || 0;
};

export const countCertificates = async (
  range: DateRange,
  userId: mongoose.Types.ObjectId
) => {
  const result = await Activity.aggregate([
    {
      $match: {
        user: userId,
        certificate: { $ne: '' },
        createdAt: { $gte: range.start, $lte: range.end },
      },
    },
    { $count: 'count' },
  ]);

  return result[0]?.count || 0;
};

export const recentAchievements = async (
  range: DateRange,
  userId: mongoose.Types.ObjectId
) => {
  return await Activity.aggregate([
    {
      $match: {
        user: userId,
        certificate: { $ne: '' },
        createdAt: { $gte: range.start, $lte: range.end },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        title: 1,
        type: 1,
        provider: 1,
        date: 1,
        certificate: 1,
      },
    },
    {
      $limit: 5,
    },
  ]);
};

export const countTotalDocs = async (
  model: any,
  range: DateRange,
  userId: mongoose.Types.ObjectId
) => {
  const result = await model.aggregate([
    {
      $match: {
        user: userId,
        createdAt: { $gte: range.start, $lte: range.end },
      },
    },
    { $count: 'count' },
  ]);

  return result[0]?.count || 0;
};

export const getActivityTypeDistribution = async (
  userId: mongoose.Types.ObjectId
) => {
  const result = await Activity.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: '$type', // Group by activity type (e.g., 'Course', 'Workshop')
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 1,
        count: 1,
      },
    },
  ]);

  const total = result.reduce((acc, item) => acc + item.count, 0);

  const distribution = result.map((item) => ({
    type: item._id,
    count: item.count,
    percentage:
      total > 0 ? parseFloat(((item.count / total) * 100).toFixed(2)) : 0,
  }));

  return distribution;
};

export const averageHoursPerActivity = async (
  userId: mongoose.Types.ObjectId
) => {
  const result = await Activity.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        avgHours: { $avg: '$hours' },
      },
    },
  ]);

  return result[0]?.avgHours || 0;
};

export const activityCompletionRate = async (
  userId: mongoose.Types.ObjectId
) => {
  const result = await Activity.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const total = result.reduce((acc, cur) => acc + cur.count, 0);
  const completed = result.find((r) => r._id === 'completed')?.count || 0;

  return total > 0 ? (completed / total) * 100 : 0;
};

export const activitiesPerMonth = async (userId: mongoose.Types.ObjectId) => {
  const result = await Activity.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 }, // sum activities for each month
        totalHours: { $sum: '$hours' }, //  sum hours for each month
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
  ]);

  // Transform result and compute average
  const formatted = result.map((item) => ({
    month: `${getMonthName(item._id.month)}-${item._id.year}`,
    count: item.count,
    hours: item.totalHours,
  }));

  const totalMonths = formatted.length;
  const totalActivities = formatted.reduce((acc, curr) => acc + curr.count, 0);
  const average = totalMonths > 0 ? totalActivities / totalMonths : 0;

  return {
    monthlyBreakdown: formatted,
    averagePerMonth: parseFloat(average.toFixed(2)),
  };
};

//delete profile picture from cloudinary while updating user
export function extractPublicId(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/');
    const filename = parts[parts.length - 1]; // e.g., profile_abc123.jpg
    const [publicId] = filename.split('.'); // remove extension
    const folder = parts
      .slice(parts.indexOf('upload') + 1, parts.length - 1)
      .join('/');
    return folder ? `${folder}/${publicId}` : publicId;
  } catch (error) {
    console.error('Failed to extract public_id:', error);
    return null;
  }
}
