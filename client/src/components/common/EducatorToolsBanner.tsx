import { useAppStore } from '@/contexts/useAppStore';

const EducatorToolsBanner = () => {
  const { user } = useAppStore();
  const isEducator = user?.role === 'educator';
  const isProfileApproved = user?.applicationStatus === 'approved';

  if (!user || !isEducator || isProfileApproved) return null;

  return (
    <div className="w-full flex flex-col pt-4 sm:flex-row items-center justify-center space-x-2 rounded-lg font-medium text-sm  text-center bg-light-background-color ">
      <p className="text-red-400">
        You can't use educator's tools until your profile is approved
      </p>
      <div className="flex gap-2 group cursor-pointer">
        <span className="underline text-navy-500">Check back later!</span>
      </div>
    </div>
  );
};

export default EducatorToolsBanner;
