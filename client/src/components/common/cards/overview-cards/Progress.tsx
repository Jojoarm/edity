import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Progress = () => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const circumference = 2 * Math.PI * 80;

  const textProgress = useRef({ value: 0 });

  useGSAP(() => {
    if (!circleRef.current || !textRef.current) return;

    // Force hardware acceleration for better performance
    gsap.set([circleRef.current, textRef.current], {
      force3D: true,
      backfaceVisibility: 'hidden',
    });

    // Initialize circle
    gsap.set(circleRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference, // Start fully hidden
    });

    // Initialize text
    gsap.set(textRef.current, { textContent: '0.0 hours' });

    // Create master timeline
    const masterTl = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: 'power1.out',
        force3D: true,
      },
    });

    // circle animation
    const circleAnimation = () => {
      const circleTl = gsap.timeline();

      // First entrance animation
      circleTl.to(circleRef.current, {
        strokeDashoffset: circumference * 0.08, // 92% complete
        duration: 6,
        ease: 'power1.out',
      });

      // Reset for loop
      circleTl.to(circleRef.current, {
        strokeDashoffset: circumference * 0.88, // Reset to 12%
        duration: 3,
        ease: 'power1.out',
      });

      // Loop animation
      const circleLoop = gsap.timeline({ repeat: -1, yoyo: true });
      circleLoop.to(circleRef.current, {
        strokeDashoffset: circumference * 0.08,
        duration: 6,
        ease: 'power1.out',
      });

      circleTl.add(circleLoop);
      return circleTl;
    };

    // text animation
    const textAnimation = () => {
      const textTl = gsap.timeline();

      // First entrance animation
      textTl.to(textProgress.current, {
        value: 15.0,
        duration: 6,
        ease: 'power1.out',
        onUpdate: () => {
          if (textRef.current) {
            const roundedValue =
              Math.round(textProgress.current.value * 10) / 10;
            textRef.current.textContent = `${roundedValue.toFixed(1)} hours`;
          }
        },
      });

      // Reset for loop
      textTl.to(textProgress.current, {
        value: 0,
        duration: 3,
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.textContent = `${textProgress.current.value.toFixed(
              1
            )} hours`;
          }
        },
      });

      // Loop animation
      const textLoop = gsap.timeline({ repeat: -1, yoyo: true });
      textLoop.to(textProgress.current, {
        value: 15.0,
        duration: 6,
        ease: 'power1.out',
        onUpdate: () => {
          if (textRef.current) {
            const roundedValue =
              Math.round(textProgress.current.value * 10) / 10;
            textRef.current.textContent = `${roundedValue.toFixed(1)} hours`;
          }
        },
      });

      textTl.add(textLoop);
      return textTl;
    };

    // Add both animations to master timeline with perfect sync
    masterTl.add(circleAnimation(), 0);
    masterTl.add(textAnimation(), 0); // Start at same time for perfect sync
  }, [circumference]);

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="relative">
        <svg
          className="size-[150px] md:size-[200px] lg:size-[250px] -rotate-60"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="transparent"
            stroke="rgba(79, 70, 229, 0.1)"
            strokeWidth="20"
            strokeDasharray={`${2 * Math.PI * 80 * 0.95} ${2 * Math.PI * 80}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
          />
          {/* Animated progress circle */}
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r="80"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="20"
            className="text-primary-green drop-shadow-lg"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <p
          ref={textRef}
          className="text-gray-600 text-sm md:text-lg lg:text-xl"
        >
          0.0 hours
        </p>
        <h2 className="text-sm md:text-lg lg:text-xl font-semibold text-green-new-500">
          Saved
        </h2>
      </div>
    </div>
  );
};

export default Progress;
