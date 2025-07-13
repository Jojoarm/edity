import type { LucideIcon } from 'lucide-react';

type UserInfoProps = {
  icon: LucideIcon;
  label: string;
  info: string | undefined;
};

const UserInfo = ({ icon: Icon, label, info }: UserInfoProps) => {
  return (
    <div className="">
      <label className="text-sm font-semibold text-gray-500/80">{label}</label>
      <div className="flex items-center">
        <Icon className="w-4 h-4 text-gray-500 mr-2" />
        <span className="text-gray-100">{info}</span>
      </div>
    </div>
  );
};

export default UserInfo;
