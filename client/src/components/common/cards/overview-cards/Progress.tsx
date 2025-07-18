import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Progress = () => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const timeRef = useRef<HTMLParagraphElement | null>(null);
  const circumference = 2 * Math.PI * 80;

  // Create an object to hold the animated value
  const hoursData = useRef({ value: 0 });

  useGSAP(() => {
    if (!circleRef.current || !timeRef.current) return;

    gsap.set(circleRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference, // Start fully hidden
    });

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power1.inOut' },
    });

    // First entrance animation for circle
    tl.to(
      circleRef.current,
      {
        strokeDashoffset: circumference * 0.08,
        duration: 4,
      },
      0
    );

    // Animate the hours counter for the first cycle
    tl.to(
      hoursData.current,
      {
        value: 10.0,
        duration: 4,
        onUpdate: () => {
          if (timeRef.current) {
            timeRef.current.textContent = `${hoursData.current.value.toFixed(
              1
            )} hours`;
          }
        },
      },
      0
    ); // Start at the same time as circle animation

    // Looping rotation
    tl.to(circleRef.current, {
      strokeDashoffset: circumference * 0.88,
      duration: 1,
      onStart: () => {
        hoursData.current.value = 0;
        if (timeRef.current) {
          timeRef.current.textContent = `0.0 hours`;
        }
      },
    });

    // Create a nested timeline for the repeating part
    const loopTl = gsap.timeline({ repeat: -1, yoyo: true });

    // Reset hours and animate again
    loopTl
      .set(hoursData.current, { value: 0 })
      .to(
        hoursData.current,
        {
          value: 10.0,
          duration: 4,
          onUpdate: () => {
            if (timeRef.current) {
              timeRef.current.textContent = `${hoursData.current.value.toFixed(
                1
              )} hours`;
            }
          },
        },
        0
      )
      .to(
        circleRef.current,
        {
          strokeDashoffset: circumference * 0.08,
          duration: 4,
        },
        0
      );

    tl.add(loopTl);
  });

  return (
    <div className="flex items-center justify-center gap-5">
      <svg className="w-[250px] h-[250px] -rotate-90" viewBox="0 0 200 200">
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
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-new-500">
          Time Saved
        </h2>
        <p ref={timeRef} className="text-gray-600 text-lg">
          0.0 hours
        </p>
      </div>
    </div>
  );
};

export default Progress;
