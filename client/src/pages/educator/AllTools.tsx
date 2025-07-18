import { educatorToolConfig } from '@/assets/educatorToolConfig';
import AiToolCard from '@/components/common/cards/AiToolCard';
import CircularShape from '@/components/common/CircularShape';
import ToolTitle from '@/components/common/ToolTitle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AllTools = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  const filteredTools = educatorToolConfig.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useGSAP(() => {
    const featureCards = gsap.utils.toArray('.feature-card') as HTMLElement[];

    featureCards.forEach((card) => {
      gsap.from(card, {
        xPercent: 0,
        opacity: 0,
        duration: 2,
        stagger: { from: 'center', each: 0.5 },
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
      });

      const icon = card.querySelector('.icon');

      if (icon) {
        gsap.to(icon, {
          rotation: 360,
          opacity: 1,
          duration: 2,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
            toggleActions: 'play none none none', // play only once
          },
        });
      }
    });

    gsap.from('.input-field', {
      opacity: 0,
      duration: 3,
      ease: 'sine.out',
    });
  });

  return (
    <div className="relative section w-full h-full min-h-screen bg-light-background-color overflow-hidden pb-10">
      <CircularShape
        xPosition="-left-40"
        yPosition="-top-40"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <CircularShape
        xPosition="-right-50"
        yPosition="bottom-0"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <div className="relative flex flex-col gap-6 w-full">
        <ToolTitle
          title="Empower Your Teaching with Intelligent Tools"
          description="Explore our suite of AI-powered tools designed to support lesson planning, performance analysis, curriculum mapping, and more—built to enhance educator productivity and student success."
        />

        {/* Search Input */}
        <div className="input-field w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for a tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 text-gray-800 placeholder-gray-400 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
          />
        </div>

        {/* Tool Cards */}
        <div className="grid gap-12 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <AiToolCard
                key={tool.id}
                icon={tool.icon}
                bgFill={tool.bgFill}
                textColor={tool.textColor}
                title={tool.title}
                description={tool.description}
                onClick={() => handleToolClick(tool.path)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No tools match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTools;
