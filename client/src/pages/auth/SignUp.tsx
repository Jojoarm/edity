import { Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import GoogleLoginButton from '../../components/common/GoogleLoginButton';
import PasswordStrengthMeter from '../../components/common/PasswordStrengthMeter';
import { createUser, fetchUser } from '../../api/user-api';
import { useAppStore } from '../../contexts/useAppStore';

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { setUser, setAuthLoading } = useAppStore();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  //using email to send state to complete registration

  // Mutations
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await fetchUser(setUser, setAuthLoading);
      navigate('/complete-profile');
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="relative z-10 py-10 flex flex-col items-center justify-center h-full">
      <form
        onSubmit={onSubmit}
        className="w-85 md:w-106 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-xl px-10 py-4"
      >
        <h2 className=" text-primary text-2xl lg:text-4xl font-bold">EDITY</h2>
        <p className="text-sm text-gray-500/90 mt-3 text-center">
          Sign up! Create your account to get started
        </p>

        <GoogleLoginButton />

        <div className="flex items-center gap-4 w-full my-5">
          <div className="w-full h-px bg-gray-300/90"></div>
          <p className="w-full text-nowrap text-sm font-semibold text-gray-500/90">
            or sign up with email and password
          </p>
          <div className="w-full h-px bg-gray-300/90"></div>
        </div>

        <div className="flex flex-col gap-1 items-center mb-4 w-full">
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-xl overflow-hidden pl-6 gap-2">
            <User className="size-4 text-[#6B7280] " />
            <input
              type="text"
              placeholder="Full name"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              {...register('name', {
                required: 'This field is required!',
              })}
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 items-center mb-4 w-full">
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-xl overflow-hidden pl-6 gap-2">
            <Mail className="size-4 text-[#6B7280] " />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              {...register('email', { required: 'This field is required!' })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 items-center mb-4 w-full">
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-xl overflow-hidden pl-6 gap-2">
            <Lock className="size-4 text-[#6B7280] " />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              {...register('password', {
                required: 'This field is required!',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: {
                  hasUpper: (v) =>
                    /[A-Z]/.test(v) || 'Must include an uppercase letter',
                  hasLower: (v) =>
                    /[a-z]/.test(v) || 'Must include a lowercase letter',
                  hasNumber: (v) => /\d/.test(v) || 'Must include a number',
                  hasSpecial: (v) =>
                    /[^A-Za-z0-9]/.test(v) ||
                    'Must include a special character',
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 items-center mb-4 w-full">
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-xl overflow-hidden pl-6 gap-2">
            <Lock className="size-4 text-[#6B7280] " />
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              {...register('confirmPassword', {
                validate: (val) => {
                  if (!val) {
                    return 'This field is required';
                  } else if (watch('password') !== val) {
                    return 'Passwords do not match!';
                  }
                },
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <PasswordStrengthMeter password={watch('password') || ''} />

        <button
          type="submit"
          className="mt-8 w-full h-11 rounded-xl text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="animate-spin rounded-full h-7 w-7 m-auto border-2 border-white border-t-primary-500 "></div>
          ) : (
            'Create Account'
          )}
        </button>

        <p className="text-gray-500/90 text-sm mt-4">
          Already have an account?{' '}
          <Link
            className="text-primary hover:underline cursor-pointer"
            to="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
