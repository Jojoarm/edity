import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FaqItemProps = {
  question: string;
  answer: string;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconColor?: string;
  bgColor?: string;
  accentColor?: string;
};
const FaqItem = ({
  question,
  answer,
  className = '',
  questionClassName = '',
  answerClassName = '',
  iconColor = 'text-white',
  bgColor = 'bg-primary-green/5',
  accentColor = 'bg-primary',
}: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`${bgColor} w-full max-w-6xl rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-out ${className}`}
    >
      <div className="p-5 md:p-6">
        <button
          className="flex justify-between items-start w-full group rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <h3
            className={`w-[92%] text-left text-base md:text-lg lg:text-xl font-semibold font-roboto text-gray-900 pr-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-200 ${questionClassName}`}
          >
            {question}
          </h3>
          <div
            className={`${accentColor} p-1 md:p-2 rounded-full flex items-center justify-center ${iconColor} shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0`}
          >
            <ChevronDown
              className={`size-4 md:size-5 transition-transform duration-300 ease-out ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2">
            <p
              className={`text-sm md:text-base lg:text-lg text-gray-600 font-roboto leading-relaxed ${answerClassName}`}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
