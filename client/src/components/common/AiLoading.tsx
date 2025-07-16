import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface AiLoadingProps {
  isPending: boolean;
}

const AiLoading = ({ isPending }: AiLoadingProps) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to('.fa-icon', {
      rotation: 360,
      repeat: -1,
      ease: 'linear',
      duration: 3,
      transformOrigin: 'center center',
    });

    // Pulse effect behind icon
    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.2,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }

    // Content fade in
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );
    }

    // Progress bar animation
    if (barRef.current) {
      if (isPending) {
        gsap.fromTo(
          barRef.current,
          { width: '0%' },
          {
            width: '90%',
            duration: 40,
            ease: 'power2.out',
          }
        );
      } else {
        gsap.to(barRef.current, {
          width: '100%',
          duration: 0.3,
          onComplete: () => {
            gsap.to(barRef.current, { opacity: 0, duration: 0.3 });
          },
        });
      }
    }
  }, [isPending]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-primary/25 rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary shadow-lg shadow-primary/20"
          ref={barRef}
        ></div>
      </div>

      {/* Main content */}
      <div
        className="w-full h-full flex flex-col items-center justify-center text-navy-50"
        ref={contentRef}
      >
        {/* Icon container  */}
        <div className="relative mb-8">
          {/* Background pulse */}
          <div
            ref={pulseRef}
            className="absolute inset-0 w-24 h-24 bg-primary/30 rounded-full blur-xl"
          ></div>

          {/* Icon */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
            <i className="fa-icon fa-solid fa-pen-nib text-5xl text-primary drop-shadow-lg relative z-10"></i>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center space-y-4 max-w-md px-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Generating Ideas...
          </h2>

          <div className="space-y-2">
            <p className="text-slate-300 text-sm md:text-base">
              Edity AI is crafting your personalized content
            </p>
            <p className="text-slate-400 text-xs md:text-sm italic">
              This may take 10-60 seconds
            </p>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center space-x-4 mt-6">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-ping"
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-ping"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-ping"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <span>Processing your request...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiLoading;
