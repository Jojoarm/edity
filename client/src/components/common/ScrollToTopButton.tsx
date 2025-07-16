import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showAt = 500;

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-6 right-6 z-50 size-10 md:size-12 lg:size-14 bg-navy-50 hover:bg-gray-50 text-gray-700 shadow-lg 
        hover:shadow-xl border border-gray-200 cursor-pointer 
        rounded-full flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-blue-200
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp
        className={`size-6 md:size-8 lg:size-10 transition-transform duration-200 text-gray-600 animate-pulse ${
          isHovered ? 'transform -translate-y-0.5' : ''
        }`}
      />
    </button>
  );
};

export default ScrollToTopButton;
