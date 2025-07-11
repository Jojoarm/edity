import { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

type SortOption = {
  value: string;
  label: string;
};

type SortDropdownProps = {
  options: SortOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SortDropdown = ({
  options,
  selected,
  onSelect,
  placeholder,
  className,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    options.find((option) => option.value === selected)?.label || placeholder;

  return (
    <div className={clsx('relative flex flex-col w-44 text-sm', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center text-left px-4 pr-2 py-2 border rounded-lg bg-white text-gray-700 shadow-xs hover:bg-gray-50 focus:outline-none"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={clsx(
            'size-6 text-gray-500  transition-transform duration-200',
            isOpen ? 'rotate-0' : '-rotate-90'
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full top-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
          {options.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => {
                onSelect(value);
                setIsOpen(false);
              }}
              className={clsx(
                'px-4 py-2 my-1 hover:bg-indigo-500 hover:text-white cursor-pointer',
                value === selected ? 'bg-indigo-500 text-white' : ''
              )}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
