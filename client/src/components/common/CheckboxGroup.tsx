import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: CheckboxOption[];
  error?: string;
  disabled?: boolean;
}

const CheckboxGroup = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  error,
  disabled = false,
}: CheckboxGroupProps<T>) => {
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const selectedValues = (value || []) as string[];
  const handleCheckboxChange = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((v) => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-500/80">{label}</label>
      <div className="flex flex-col gap-2 px-2 py-2 bg-white border border-gray-300 rounded-lg">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={disabled}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
