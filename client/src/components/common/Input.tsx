import type { LucideIcon } from 'lucide-react';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  isSelect?: boolean;
  options?: { value: string; label: string }[];
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  (
    {
      label,
      icon: Icon,
      error,
      isSelect = false,
      options = [],
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 items-start justify-start mb-4 w-full">
        <label className="text-sm font-semibold text-gray-500/80">
          {label}:
        </label>
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-xl overflow-hidden pl-6 pr-2 gap-2">
          <Icon className="size-4 text-[#6B7280]" />
          {isSelect ? (
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              className={`bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full ${className}`}
              {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={`bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full ${className}`}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    );
  }
);

// Input.displayName = 'Input';

export default Input;
