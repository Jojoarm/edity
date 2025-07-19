import { howItWorksSteps, overviewIssues, testimonials } from '@/assets/assets';
import { edityFAQs } from '@/assets/faq';
import AiExpertise from '@/components/common/cards/overview-cards/AiExpertise';
import FaqItem from '@/components/common/cards/overview-cards/FaqItem';
import HowItWorksStep from '@/components/common/cards/overview-cards/HowItWorksStep';
import OverviewCard from '@/components/common/cards/overview-cards/OverviewCard';
import Progress from '@/components/common/cards/overview-cards/Progress';
import Resources from '@/components/common/cards/overview-cards/Resources';
import TestimonialCard from '@/components/common/cards/overview-cards/TestimonialCard';
import SemiCircle from '@/components/common/svg/SemiCircle';
import ShapeDivider from '@/components/common/svg/ShapeDivider';
import TopWave from '@/components/common/svg/TopWave';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';

const Overview = () => {
  //for carousel
  const createAutoplay = (delay = 5000) =>
    Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: false });
  const plugin1 = useRef(createAutoplay(5000));
  const plugin2 = useRef(createAutoplay(7000));
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? edityFAQs : edityFAQs.slice(0, 5);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect(); // initial
    api.on('select', onSelect);
  }, [api]);

  return (
    <div className=" w-full h-full ">
      <div className="relative section h-full bg-light-background-color pb-14 lg:pb-24 xl:pb-34">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 lg:flex-row">
          <div className="flex w-full  lg:w-[60%] flex-col space-y-4 overflow-hidden pt-6 md:pt-8">
            <h1 className="font-playfair text-left text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-dark-background-color">
              <span className="inline text-balance ">Create Exactly </span>
              <div className=" flex flex-wrap space-x-3">
                <span>What You Need</span>
                <span className="inline  bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                  Your Way!
                </span>
              </div>
            </h1>
            <p className="font-roboto font-medium text-left text-lg leading-7 text-balance text-gray-600 sm:text-xl sm:leading-8">
              Use Edity to design interactive activities, generate smart lesson
              plans, and build high-quality teaching tools like curriculum maps,
              quizzes, games, and professional reports—all powered by AI.
            </p>
          </div>
          <div className="relative w-full lg:w-[40%] ">
            <img
              src="/assets/images/edity1.png"
              className="object-contain max-h-[300px] transition-all duration-300  lg:max-h-[592px]"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 rotate-180 w-full">
          <ShapeDivider />
        </div>
      </div>

      <div className="relative section pb-14 lg:pb-24 xl:pb-34 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <img
            src="/assets/images/editybg7.png"
            alt="tears-drop-bg-image"
            className="max-w-[70%] opacity-10"
          />
        </div>
        <div className="relative flex flex-col items-center space-y-6">
          <p className="p-2 bg-primary text-white text-center font-semibold font-roboto rounded-2xl w-[150px]">
            Lingering Issue
          </p>
          <p className="font-bold text-xl md:text-2xl lg:text-3xl :text-4xl text-dark-background-color">
            Inside the Teacher's Reality
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {overviewIssues.map((issue, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-5 border-r-4 xl:last:border-none border-medium-background-color px-6"
              >
                <div className="flex items-center justify-center size-20 rounded-full bg-light-background-color">
                  <i className={`${issue.icon} text-4xl text-navy-500`}></i>
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                  {issue.title}
                </h2>
                <p className="text-lg text-gray-500">{issue.issue}</p>
                <div className="border-l-4 border-medium-background-color px-4 flex gap-3">
                  <p className=" italic text-sm text-gray-600 ">
                    {issue.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-full section bg-primary-green/10 pb-24 xl:pb-34">
        <div className="absolute inset-0 flex justify-end items-center -z-10">
          <img
            src="/assets/images/laptopbg.png"
            alt="laptop-bg-image"
            className="max-w-[600px] w-full opacity-5 object-contain"
          />
        </div>
        <div className="flex flex-col items-center space-y-6 ">
          <p className="p-2 bg-primary text-white text-center font-semibold font-roboto rounded-2xl w-[150px]">
            Our Solutions
          </p>
          <p className="font-bold text-xl md:text-2xl lg:text-3xl text-dark-background-color">
            Why Edity works!
          </p>
          <p className="text-lg text-gray-500 max-w-6xl text-center">
            Edity is your all-in-one toolkit for smarter teaching. From
            AI-powered lesson plans and curriculum design to performance
            tracking and collaborative tools, we help Nigerian educators save
            time, stay organized, and teach with confidence, so they can focus
            on what truly matters: inspiring student success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 py-10">
          <OverviewCard
            iconClass="fa-solid fa-clock"
            title="Save Time, Teach More"
            description="Edity’s smart lesson design tools help you plan faster, smarter, and with more confidence—so you can spend less time prepping and more time teaching effectively."
          >
            <Progress />
          </OverviewCard>

          <OverviewCard
            iconClass="fa-solid fa-rectangle-list"
            title="Nigeria-Focused Resources"
            description="From WAEC-ready assignments to activity templates aligned with national standards, Edity gives you a deep library of classroom resources built for Nigerian teachers, by Nigerian teachers."
          >
            <Resources />
          </OverviewCard>

          <OverviewCard
            iconClass="fa-solid fa-person-snowboarding"
            title="AI that Works for You"
            description="No need to be a tech expert—Edity handles the heavy AI lifting. Just choose your goal, and our tools generate context-aware content you can trust in any Nigerian classroom."
          >
            <AiExpertise />
          </OverviewCard>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <TopWave />
        </div>
      </div>

      {/* How to */}
      <div className="relative section h-full pb-14 lg:pb-34">
        <div className="absolute top-0 left-0 rotate-180 w-full">
          <TopWave />
        </div>

        <div className="absolute inset-0 flex justify-start items-center -z-10">
          <img
            src="/assets/images/editybg5.png"
            alt="bg-image"
            className="max-w-[600px] w-full opacity-10 object-contain"
          />
        </div>

        <div className="w-full p-6">
          <div className="w-full flex flex-col items-center gap-6 mb-10">
            <p className="p-2 bg-primary text-white text-center font-semibold font-roboto rounded-2xl w-[150px]">
              How Edity Works
            </p>
            <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center text-dark-background-color">
              Tips on using our educator tools!
            </p>
          </div>

          <Carousel opts={{ loop: true }} plugins={[plugin1.current]}>
            <CarouselContent>
              {howItWorksSteps.map((stepData, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 md:p-2 border rounded-2xl bg-light-background-color shadow-md">
                    <Card className="py-10">
                      <CardContent>
                        <HowItWorksStep
                          step={stepData.step}
                          imageSrc={stepData.imageSrc}
                          iconClass={stepData.iconClass}
                          title={stepData.title}
                          description={stepData.description}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative w-full">
        <div className="absolute top-0 left-0 w-full">
          <SemiCircle />
        </div>
        <div className="absolute bottom-0 left-0 w-full rotate-180">
          <SemiCircle />
        </div>

        <div className="section bg-primary-green/10 pb-34">
          <div className=" h-full min-h-[500px] flex flex-col gap-4 justify-center items-center">
            <div className="w-full flex flex-col items-center space-y-6 mb-4">
              <p className="p-2 bg-primary text-white text-center font-semibold font-roboto rounded-2xl w-[150px]">
                Our Community
              </p>
              <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center text-dark-background-color">
                What other educators are saying!
              </p>
            </div>
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-6">
              <Carousel
                opts={{ loop: true }}
                plugins={[plugin2.current]}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((item, index) => (
                    <CarouselItem key={index}>
                      <TestimonialCard {...item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Dot indicators */}
              <div className="flex gap-2 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => api?.scrollTo(idx)}
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      selectedIndex === idx
                        ? 'bg-dark-background-color'
                        : 'bg-dark-background-color/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faqs */}
      <div className="relative section h-full pb-34">
        <div className="w-full flex flex-col items-center space-y-6 mb-4">
          <p className="p-2 bg-primary text-white text-center font-semibold font-roboto rounded-2xl w-[150px]">
            FAQ Section
          </p>
          <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center text-dark-background-color">
            Frequently Asked Questions!
          </p>
          <div className="w-full max-w-6xl border rounded-2xl shadow-md p-6">
            <div className="flex flex-col gap-3">
              {visibleFaqs.map((faq, index) => (
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  key={index}
                />
              ))}
            </div>

            {edityFAQs.length > 5 && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="mt-4 text-primary cursor-pointer hover:underline"
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
