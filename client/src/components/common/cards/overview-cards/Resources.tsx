import { educatorTools } from '@/assets/assets';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const Resources = () => {
  useGSAP(() => {
    gsap.fromTo(
      '.card',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.card',
          start: 'top bottom-=100',
          end: 'bottom top+=100',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  });
  const filteredTools = educatorTools.slice(0, 8);
  return (
    <div className="[transform:rotate(-5deg)_translateZ(10px)] relative -top-[100px] -right-[10px] grid max-h-[450px] grid-cols-4 gap-2 pt-24 md:gap-5 ">
      {filteredTools.map((tool, index) => (
        <div
          key={index}
          className="card px-6 py-2 border border-gray-300 rounded-md flex flex-col gap-4 items-center justify-center"
        >
          <i
            className={`text-2xl md:text-3xl lg:text-4xl ${tool.icon} ${tool.textColor}`}
            aria-hidden="true"
          ></i>
          <div className="text-center text-[7px] lg:text-[9px]  font-medium text-gray-800">
            {tool.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resources;
