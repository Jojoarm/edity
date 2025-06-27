// models/User.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

// Interfaces for Roles
interface EducatorData {
  dateEmployed: Date;
  teacherId: string;
  isWithdrawn: boolean;
  isSuspended: boolean;
  subjects: Types.ObjectId[];
  classLevel: Types.ObjectId;
  academicYear: Types.ObjectId;
  academicTerm: Types.ObjectId;
  examsCreated: Types.ObjectId[];
  lessonsCreated: Types.ObjectId[];
}

interface AdminData {
  academicTerms: Types.ObjectId[];
  subjects: Types.ObjectId[];
  yearGroups: Types.ObjectId[];
  academicYears: Types.ObjectId[];
  classLevels: Types.ObjectId[];
}

interface StudentData {
  studentId: string;
  enrolledSubjects: Types.ObjectId[];
  classLevel: Types.ObjectId;
  academicYear: Types.ObjectId;
  sponsorsContact: {
    name: string;
    email: string;
    phone: string;
  };
  enrollmentDate: Date;
  graduationDate?: Date;
  progressReports: Types.ObjectId[];
  attendanceRecord: Types.ObjectId[];
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  googleId?: string;
  password: string;
  dob: Date;
  gender: 'male' | 'female';
  tel: string;
  address: string;
  role:
    | 'educator'
    | 'admin'
    | 'student'
    | 'stakeholder'
    | 'researcher'
    | 'unassigned';
  applicationStatus: 'pending' | 'approved' | 'rejected';
  profilePicture?: string;
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  lastLogin?: Date;
  isDeleted: boolean;
  isSubmitted: boolean;
  deletedAt?: Date;
  modifiedBy?: Types.ObjectId;
  educatorData?: EducatorData;
  adminData?: AdminData;
  studentData?: StudentData;
  initializeRoleData: () => void;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId; // Only required if not using Google OAuth
      },
    },
    role: {
      type: String,
      enum: [
        'educator',
        'admin',
        'student',
        'stakeholder',
        'researcher',
        'unassigned',
      ],
      default: 'unassigned',
    },
    applicationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    tel: {
      type: String,
      default: '',
      trim: true,
    },
    address: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    permissions: [
      {
        type: String,
      },
    ],
    lastLogin: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // Role-specific data
    educatorData: {
      type: new Schema(
        {
          dateEmployed: { type: Date, default: Date.now },
          teacherId: {
            type: String,
            required: true,
            default: function (this: any) {
              return (
                'TEA' +
                Math.floor(100 + Math.random() * 900) +
                Date.now().toString().slice(-4) +
                this.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
              );
            },
          },
          isWithdrawn: { type: Boolean, default: false },
          isSuspended: { type: Boolean, default: false },
          subjects: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Subject',
            },
          ],
          classLevel: {
            type: Schema.Types.ObjectId,
            ref: 'ClassLevel',
          },
          academicYear: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicYear',
          },
          academicTerm: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicTerm',
          },
          examsCreated: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
          lessonsCreated: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
        },
        { _id: false }
      ),
      default: null,
    },

    adminData: {
      type: new Schema(
        {
          academicTerms: [{ type: Schema.Types.ObjectId, ref: 'AcademicTerm' }],
          subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
          yearGroups: [{ type: Schema.Types.ObjectId, ref: 'YearGroup' }],
          academicYears: [{ type: Schema.Types.ObjectId, ref: 'AcademicYear' }],
          classLevels: [{ type: Schema.Types.ObjectId, ref: 'ClassLevel' }],
        },
        { _id: false }
      ),
      default: null,
    },

    studentData: {
      type: new Schema(
        {
          studentId: {
            type: String,
            required: true,
            default: function (this: any) {
              return (
                'STU' +
                Math.floor(1000 + Math.random() * 9000) +
                Date.now().toString().slice(-4) +
                this.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
              );
            },
          },
          enrolledSubjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
          classLevel: { type: Schema.Types.ObjectId, ref: 'ClassLevel' },
          academicYear: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
          sponsorsContact: {
            name: { type: String, default: '' },
            email: {
              type: String,
              default: '',
            },
            phone: { type: String, default: '' },
          },
          enrollmentDate: { type: Date, default: Date.now },
          graduationDate: { type: Date },
          progressReports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
          attendanceRecord: [
            { type: Schema.Types.ObjectId, ref: 'Attendance' },
          ],
        },
        { _id: false }
      ),
      default: null,
    },
  },
  {
    timestamps: true,
    // Exclude deleted users from queries by default
    toJSON: {
      transform: function (doc, ret) {
        if (ret.isDeleted) {
          return null;
        }
        return ret;
      },
    },
  }
);

// Indexes for performance optimization
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ isDeleted: 1 });
userSchema.index({ createdAt: 1 });
userSchema.index({ lastLogin: 1 });

// Compound indexes for common queries
userSchema.index({ role: 1, status: 1 });
userSchema.index({ role: 1, isDeleted: 1 });
userSchema.index({ status: 1, isDeleted: 1 });

// Update the initializeRoleData method in your User schema
userSchema.methods.initializeRoleData = function () {
  // Clear existing role data first
  this.educatorData = null;
  this.studentData = null;
  this.adminData = null;

  switch (this.role) {
    case 'educator':
      this.educatorData = {
        dateEmployed: new Date(),
        teacherId: `TEA${Math.floor(100 + Math.random() * 900)}${Date.now()
          .toString()
          .slice(-4)}${this.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()}`,
        isWithdrawn: false,
        isSuspended: false,
        subjects: [],
        classLevel: null,
        academicYear: null,
        academicTerm: null,
        examsCreated: [],
        lessonsCreated: [],
      };
      this.markModified('educatorData'); // Mark as modified
      break;

    case 'student':
      this.studentData = {
        studentId: `STU${Math.floor(1000 + Math.random() * 9000)}${Date.now()
          .toString()
          .slice(-4)}${this.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()}`,
        enrolledSubjects: [],
        classLevel: null,
        academicYear: null,
        sponsorsContact: {
          name: '',
          email: '',
          phone: '',
        },
        enrollmentDate: new Date(),
        graduationDate: null,
        progressReports: [],
        attendanceRecord: [],
      };
      this.markModified('studentData'); // Mark as modified
      break;

    case 'admin':
      this.adminData = {
        academicTerms: [],
        subjects: [],
        yearGroups: [],
        academicYears: [],
        classLevels: [],
      };
      this.markModified('adminData'); // Mark as modified
      break;
  }
};

userSchema.methods.softDelete = function (deletedBy: Types.ObjectId) {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.modifiedBy = deletedBy;
  this.status = 'inactive';
  return this.save();
};

userSchema.methods.restore = function (restoredBy: Types.ObjectId) {
  this.isDeleted = false;
  this.deletedAt = null;
  this.modifiedBy = restoredBy;
  this.status = 'active';
  return this.save();
};

// Query middleware to exclude deleted users by default
userSchema.pre(/^find/, function (this: any, next) {
  // Only exclude deleted users if not explicitly querying for them
  const query = this.getQuery();
  if (query.isDeleted === undefined) {
    this.find({ isDeleted: { $ne: true } });
  }
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
