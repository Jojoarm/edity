import { fetchUser, updateUser } from '@/api/user-api';
import CheckboxGroup from '@/components/common/CheckboxGroup';
import Input from '@/components/common/Input';
import Loader from '@/components/common/Loader';
import UserInfo from '@/components/common/UserInfo';
import ProfessionalDevelopmentHeader from '@/components/educator/ProfessionalDevelopmentHeader';
import { useAppStore } from '@/contexts/useAppStore';
import { useAcademicTerms } from '@/hooks/useAcademicTerms';
import { useAcademicYears } from '@/hooks/useAcademicYears';
import { useClassLevels } from '@/hooks/useClassLevels';
import { useSubjects } from '@/hooks/useSubjects';
import { capitalize, formatDate, formatDateForInput } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import {
  BookOpenText,
  Calendar,
  Calendar1,
  CalendarSync,
  Camera,
  Clock,
  Edit,
  ListPlus,
  Mail,
  MapPinHouse,
  Phone,
  Save,
  School2,
  Shield,
  User,
  Venus,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type UserProfileFormData = {
  name: string;
  role: string;
  gender: string;
  tel: string;
  address: string;
  dob: string;
  subject: string[];
  classLevel: string;
  academicYear: string;
  academicTerm: string;
  profilePicture?: FileList;
};

const EducatorProfile = () => {
  const { user, setUser, setAuthLoading } = useAppStore();
  const { isAcademicYearsPending, academicYears } = useAcademicYears();
  const { isAcademicTermsPending, academicTerms } = useAcademicTerms();
  const { isClassLevelPending, classLevels } = useClassLevels();
  const { isSubjectsPending, subjects } = useSubjects();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    defaultValues: {
      name: user?.name,
      role: user?.role,
      gender: user?.gender,
      tel: user?.tel,
      address: user?.address,
      dob: formatDateForInput(user!.dob),
      subject: user?.educatorData?.subjects || [],
      classLevel: user?.educatorData?.classLevel || '',
      academicYear: user?.educatorData?.academicYear || '',
      academicTerm: user?.educatorData?.academicTerm || '',
    },
  });

  const watchedProfilePicture = watch('profilePicture');
  const previewUrl =
    watchedProfilePicture && watchedProfilePicture[0]
      ? URL.createObjectURL(watchedProfilePicture[0])
      : '';

  const handleEdit = () => {
    setIsEditing(true);
    //reset form with current user data
    reset({
      name: user?.name,
      role: user?.role,
      gender: user?.gender,
      tel: user?.tel,
      address: user?.address,
      dob: formatDateForInput(user!.dob),
      subject: user?.educatorData?.subjects || [],
      classLevel: user?.educatorData?.classLevel || '',
      academicYear: user?.educatorData?.academicYear || '',
      academicTerm: user?.educatorData?.academicTerm || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(); // Reset form to initial values
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateUser(formData),
    onSuccess: async () => {
      await fetchUser(setUser, setAuthLoading);
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'profilePicture' && value instanceof FileList) {
        formData.append('profilePicture', value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    mutation.mutate(formData);
  });

  if (
    isAcademicYearsPending ||
    isAcademicTermsPending ||
    isClassLevelPending ||
    isSubjectsPending
  )
    return <Loader />;

  const academicYearOptions = academicYears.map((year) => ({
    value: year._id,
    label: year.name,
  }));
  const academicTermOptions = academicTerms.map((term) => ({
    value: term._id,
    label: term.name,
  }));
  const classLevelsOptions = classLevels.map((classLevel) => ({
    value: classLevel._id,
    label: classLevel.name,
  }));
  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: subject.name,
  }));
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const getClassLevel = (id: string) => {
    return classLevelsOptions.find((classLevel) => classLevel.value === id)
      ?.label;
  };
  const getAcademicTerm = (id: string) => {
    return academicTermOptions.find((term) => term.value === id)?.label;
  };
  const getAcademicYear = (id: string) => {
    return academicYearOptions.find((year) => year.value === id)?.label;
  };
  const getSubjects = (ids: string[]) => {
    return ids
      .map(
        (id) => subjectOptions.find((subject) => subject.value === id)?.label
      )
      .join(', ');
  };

  return (
    <div className="section min-h-screen bg-light-background-color">
      {/* Header */}
      <ProfessionalDevelopmentHeader />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
              My Profile
            </h2>
            <p className="text-gray-600">
              View and Edit Educator specific information.
            </p>
          </div>
          {isEditing ? (
            <div className="flex gap-2 mt-4 lg:mt-0">
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs md:text-sm font-medium cursor-pointer"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-100 text-sm font-medium cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* content */}
        {user && (
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Summary Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      {user?.profilePicture ? (
                        <img
                          src={`${user?.profilePicture}`}
                          alt="profile picture"
                          className="w-24 h-24 rounded-full mx-auto object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <p className="text-center text-white font-bold text-2xl">
                          {user?.name[0]}
                        </p>
                      )}

                      {isEditing && (
                        <label
                          htmlFor="image"
                          className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Profile"
                              className="size-10 object-cover rounded"
                            />
                          ) : (
                            <Camera className="size-5 text-gray-500/80" />
                          )}
                        </label>
                      )}

                      <input
                        type="file"
                        id="image"
                        accept=".jpg,.jpeg,.png"
                        hidden
                        {...register('profilePicture', {
                          validate: (files) => {
                            if (!files || files.length === 0) return true;
                            const file = files[0];
                            const validTypes = [
                              'application/pdf',
                              'image/jpeg',
                              'image/png',
                            ];

                            if (!validTypes.includes(file.type)) {
                              return 'Please upload a JPG, or PNG file';
                            }

                            const fileSizeInMB = file.size / (1024 * 1024);
                            if (fileSizeInMB > 5) {
                              return 'File size must be less than 5MB';
                            }

                            return true;
                          },
                        })}
                      />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mt-4">
                      {user?.name}
                    </h2>
                    <p className="text-gray-600 capitalize">{user?.role}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Teacher ID: {user?.educatorData?.teacherId}
                    </p>

                    <div className="mt-4 space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user?.status
                        )}`}
                      >
                        {capitalize(user?.status)}
                      </span>
                      <br />
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getApplicationStatusColor(
                          user?.applicationStatus
                        )}`}
                      >
                        Application {user?.applicationStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Joined {formatDate(user.educatorData!.dateEmployed)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Last updated {formatDate(user.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details*/}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      <button
                        type="button"
                        onClick={() => setActiveTab('personal')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                          activeTab === 'personal'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Personal Information
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('professional')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                          activeTab === 'professional'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Professional Details
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'personal' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name */}
                          {isEditing ? (
                            <Input
                              label="Full Name *"
                              icon={User}
                              type="text"
                              placeholder="Full Name"
                              required
                              error={errors.name?.message}
                              {...register('name', {
                                required: 'Full name is required',
                                validate: (value) =>
                                  value.length > 2 ||
                                  'Full name must contain 2 or more character',
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={User}
                              label="Full Name"
                              info={user.name}
                            />
                          )}

                          {/* Email */}
                          <UserInfo
                            icon={Mail}
                            label="Email Address"
                            info={user.email}
                          />

                          {/* Tel */}
                          {isEditing ? (
                            <Input
                              label="Phone Number *"
                              icon={User}
                              type="text"
                              placeholder="Phone Number"
                              required
                              error={errors.name?.message}
                              {...register('tel', {
                                required: 'Phone Number is required',
                                validate: (value) =>
                                  /^[0-9+\-\s()]+$/.test(value) ||
                                  'Invalid phone number format',
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={Phone}
                              label="Phone Number"
                              info={user.tel}
                            />
                          )}

                          {/* Gender */}
                          {isEditing ? (
                            <Input
                              label="Gender *"
                              icon={Venus}
                              isSelect
                              options={genderOptions}
                              required
                              error={errors.gender?.message}
                              {...register('gender', {
                                required: 'This field is required!',
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={Venus}
                              label="Gender"
                              info={user.gender}
                            />
                          )}

                          {/* Date of Birth */}
                          {isEditing ? (
                            <Input
                              label="Date of Birth"
                              icon={Calendar1}
                              type="date"
                              placeholder="Your Date of Birth"
                              required
                              error={errors.dob?.message}
                              {...register('dob', {
                                required: 'This field is required!',
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={Calendar1}
                              label="Date of Birth"
                              info={formatDate(user.dob)}
                            />
                          )}

                          {/* Address */}
                          {isEditing ? (
                            <Input
                              label="Address *"
                              icon={MapPinHouse}
                              type="text"
                              placeholder="Address"
                              required
                              error={errors.address?.message}
                              {...register('address', {
                                required: 'This field is required!',
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={MapPinHouse}
                              label="Address"
                              info={user.address}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'professional' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Professional Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Teacher Id */}
                          <UserInfo
                            icon={Shield}
                            label="Teacher ID"
                            info={user.educatorData!.teacherId}
                          />

                          {/* Date Employed */}
                          <UserInfo
                            icon={Calendar}
                            label="Date Employed"
                            info={formatDate(user.educatorData!.dateEmployed)}
                          />

                          {/* Class Level */}
                          {isEditing ? (
                            <Input
                              label="Current Class Level"
                              icon={ListPlus}
                              isSelect
                              options={classLevelsOptions}
                              error={errors.classLevel?.message}
                              {...register('classLevel', {
                                validate: (value) => {
                                  if (!value)
                                    return 'Please select a class level';
                                  return (
                                    /^[0-9a-fA-F]{24}$/.test(value) ||
                                    'Invalid Class Level'
                                  );
                                },
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={School2}
                              label="Current Class Level"
                              info={
                                user.educatorData!.classLevel
                                  ? getClassLevel(user.educatorData!.classLevel)
                                  : 'Not specified'
                              }
                            />
                          )}

                          {/* Academic Year */}
                          {isEditing ? (
                            <Input
                              label="Current Academic Year"
                              icon={ListPlus}
                              isSelect
                              options={academicYearOptions}
                              error={errors.academicYear?.message}
                              {...register('academicYear', {
                                validate: (value) => {
                                  if (!value)
                                    return 'Please select an academic year';
                                  return (
                                    /^[0-9a-fA-F]{24}$/.test(value) ||
                                    'Invalid Academic Year'
                                  );
                                },
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={CalendarSync}
                              label="Current Academic Year"
                              info={
                                user.educatorData!.academicYear
                                  ? getAcademicYear(
                                      user.educatorData!.academicYear
                                    )
                                  : 'Not specified'
                              }
                            />
                          )}

                          {/* Academic term */}
                          {isEditing ? (
                            <Input
                              label="Current Academic Term"
                              icon={CalendarSync}
                              isSelect
                              options={academicTermOptions}
                              error={errors.academicTerm?.message}
                              {...register('academicTerm', {
                                required: 'Academic term is required',
                                validate: (value) => {
                                  if (!value)
                                    return 'Please select an academic term';
                                  return (
                                    /^[0-9a-fA-F]{24}$/.test(value) ||
                                    'Invalid Academic Term'
                                  );
                                },
                              })}
                            />
                          ) : (
                            <UserInfo
                              icon={ListPlus}
                              label="Current Academic Term"
                              info={
                                user.educatorData!.academicTerm
                                  ? getAcademicTerm(
                                      user.educatorData!.academicTerm
                                    )
                                  : 'Not specified'
                              }
                            />
                          )}

                          {/* Subject */}
                          {isEditing ? (
                            <CheckboxGroup
                              name="subject"
                              label="Subjects Taught"
                              control={control}
                              options={subjectOptions}
                              error={errors.subject?.message}
                            />
                          ) : (
                            <UserInfo
                              icon={BookOpenText}
                              label="Subject"
                              info={
                                user.educatorData!.subjects
                                  ? getSubjects(user.educatorData!.subjects)
                                  : 'No subject assigned'
                              }
                            />
                          )}

                          {!isEditing && (
                            <div className="pt-6 border-t border-gray-200">
                              <h4 className="text-md font-semibold text-gray-900 mb-4">
                                Activity Summary
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                  <div className="text-2xl font-bold text-blue-600">
                                    0
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Exams Created
                                  </div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                  <div className="text-2xl font-bold text-green-600">
                                    0
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Lessons Created
                                  </div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                  <div className="text-2xl font-bold text-purple-600">
                                    {new Date().getFullYear() -
                                      new Date(
                                        user.educatorData!.dateEmployed
                                      ).getFullYear()}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Years of Service
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {isEditing && (
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary text-xs md:text-sm font-medium disabled:opacity-50 cursor-pointer"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {mutation.isPending ? 'Saving...' : 'Save Changes'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default EducatorProfile;
