import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { capitalize } from '../../lib/utils';
import {
  Calendar1,
  ChevronDown,
  Mail,
  MapPinHouse,
  Phone,
  Upload,
  User,
  Venus,
} from 'lucide-react';
import Input from '../../components/common/Input';
import { useNavigate } from 'react-router-dom';
import { completeRegistration, fetchUser } from '../../api/user-api';
import { useAppStore } from '../../contexts/useAppStore';

export type RegisterData = {
  role: string;
  dob: string;
  gender: string;
  tel: string;
  address: string;
  profilePicture: FileList;
  sponsorsName?: string;
  sponsorsEmail?: string;
  sponsorsTel?: string;
};

const Register = () => {
  const roles = ['student', 'educator', 'admin', 'stakeholder', 'researcher'];
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const navigate = useNavigate();
  const { user, setUser, setAuthLoading } = useAppStore();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsRoleOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const profileFileList = watch('profilePicture');
  const previewUrl =
    profileFileList && profileFileList[0]
      ? URL.createObjectURL(profileFileList[0])
      : '';

  const mutation = useMutation({
    mutationFn: completeRegistration,
    onSuccess: async () => {
      await fetchUser(setUser, setAuthLoading);
      navigate('/');
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

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  //to ensure you only get to this page if your profile is incomplete
  useEffect(() => {
    if (!user || user?.isSubmitted) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="relative z-10 py-10 flex flex-col items-center justify-center h-full w-full bg-light-background-color overflow-hidden">
      <div className="relative flex flex-col gap-3 items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-xl px-6 py-8 ">
        <p
          className="absolute z-12 top-0 right-0 m-4 rounded-2xl px-4 text-sm text-gray-500 border-gray-300 border-b cursor-pointer"
          onClick={() => navigate('/')}
        >
          Skip
        </p>
        <h2 className=" text-primary text-2xl lg:text-4xl font-bold">EDITY</h2>
        <p className="text-base text-gray-800/80 font-semibold border-b border-gray-300">
          Complete your registration
        </p>

        {/* Select role */}
        <div className="flex flex-row gap-2 items-center w-full text-sm relative">
          <p className="font-medium text-gray-800 pb-2 ">
            Which role best suits you?
          </p>

          <button
            type="button"
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="group flex items-center justify-between flex-1 text-left px-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{capitalize(selectedRole)}</span>
            </div>
            <ChevronDown
              className={`size-5 md:size-7 text-gray-600 transition-['rotate'] ${
                isRoleOpen ? 'rotate-[180deg]' : ''
              }`}
            />
          </button>

          <input type="hidden" value={selectedRole} {...register('role')} />

          {isRoleOpen && (
            <ul className="absolute top-full w-64 bg-white border border-gray-300 rounded shadow-md mt-1 py-2 right-0 z-10">
              {roles.map((role, index) => (
                <li
                  key={index}
                  className={`px-2 py-2 flex items-center gap-2 cursor-pointer ${
                    role === selectedRole
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <span>{capitalize(role)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fields based on roles */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center shadow-xl border border-gray-300/80 rounded-2xl py-2 px-6 "
        >
          {/* profile picture */}
          <label
            htmlFor="image"
            className="flex items-center w-full justify-between border border-gray-300/60 h-12 px-6 mb-2 rounded-xl gap-2 overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <p className="text-gray-500/80 text-sm">Upload Picture:</p>
            <div>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="size-10 object-cover rounded"
                />
              ) : (
                <Upload className="size-5 text-gray-500/80" />
              )}
            </div>
            <input
              type="file"
              id="image"
              hidden
              {...register('profilePicture', {
                required: 'This field is required!',
              })}
            />
          </label>

          <div className="flex flex-col md:flex-row md:gap-2 w-full">
            {/* Date of Birth */}
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

            {/* Gender */}
            <Input
              label="Gender"
              icon={Venus}
              isSelect
              options={genderOptions}
              required
              error={errors.gender?.message}
              {...register('gender', {
                required: 'This field is required!',
              })}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            {/* Phone */}
            <Input
              label="Tel"
              icon={Phone}
              type="text"
              placeholder="Phone No"
              required
              error={errors.tel?.message}
              {...register('tel', {
                required: 'This field is required!',
              })}
            />

            {/* Address */}
            <Input
              label="Address"
              icon={MapPinHouse}
              type="text"
              placeholder="Address"
              required
              error={errors.address?.message}
              {...register('address', {
                required: 'This field is required!',
              })}
            />
          </div>

          {/* Student-specific fields */}
          {selectedRole === 'student' && (
            <div className="w-full">
              <Input
                label="Sponsor's Name"
                icon={User}
                type="text"
                placeholder="Sponsor's Full Name"
                required
                error={errors.sponsorsName?.message}
                {...register('sponsorsName', {
                  required: 'This field is required!',
                })}
              />

              <Input
                label="Sponsor's Email"
                icon={Mail}
                type="email"
                placeholder="Sponsor's Email"
                required
                error={errors.sponsorsEmail?.message}
                {...register('sponsorsEmail', {
                  required: 'This field is required!',
                })}
              />

              <Input
                label="Sponsor's Phone No"
                icon={MapPinHouse}
                type="text"
                placeholder="Sponsor's Phone No"
                required
                error={errors.sponsorsTel?.message}
                {...register('sponsorsTel', {
                  required: 'This field is required!',
                })}
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-xl text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <div className="animate-spin rounded-full h-7 w-7 m-auto border-2 border-white border-t-primary-500 "></div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
