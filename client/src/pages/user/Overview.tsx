import { howItWorksSteps, overviewIssues } from '@/assets/assets';
import AiExpertise from '@/components/common/cards/overview-cards/AiExpertise';
import HowItWorksStep from '@/components/common/cards/overview-cards/HowItWorksStep';
import OverviewCard from '@/components/common/cards/overview-cards/OverviewCard';
import Progress from '@/components/common/cards/overview-cards/Progress';
import Resources from '@/components/common/cards/overview-cards/Resources';
import ShapeDivider from '@/components/common/svg/ShapeDivider';
import TopWave from '@/components/common/svg/TopWave';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const Overview = () => {
  return (
    <div className=" w-full h-full ">
      <div className="relative section h-full bg-light-background-color pb-14 lg:pb-24 xl:pb-34">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 lg:flex-row">
          <div className="flex w-full  lg:w-[60%] flex-col space-y-4 overflow-hidden pt-6 md:pt-8">
            <h1 className="font-playfair text-left text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-dark-background-color">
              <span className="inline text-balance ">Create Exactly </span>
              <div className=" flex flex-wrap space-x-3">
                <span>What You Need</span>
                <span className="inline  bg-gradient-to-r from-[#ffb178] via-[#ff7eb3] to-[#9c7aff] bg-clip-text text-transparent">
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

      <div className="relative w-full h-full section bg-primary-green/10 pb-14 lg:pb-24 xl:pb-34">
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
      </div>

      <div className="relative section h-full pb-34">
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
          <div className="w-full flex flex-col items-center space-y-6 mb-4">
            <p className="p-2 bg-primary text-white text-center font-semibold font-roboto rounded-2xl w-[150px]">
              How Edity Works
            </p>
            <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center text-dark-background-color">
              Tips on using our educator tools!
            </p>
          </div>

          <Carousel
            plugins={[
              Autoplay({
                delay: 6000,
              }),
            ]}
          >
            <CarouselContent>
              {howItWorksSteps.map((stepData, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
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

        <div></div>
      </div>

      <div className="relative w-full h-[631px] my-10 overflow-hidden">
        <svg
          viewBox="0 0 1366 631"
          height="631"
          width="100%"
          className="absolute top-0 left-0 -z-10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M1366 614.626V42.2878C1216.44 32.481 1071.16 25.6274 902.892 20.0618C647.674 11.6203 291.457 3.37253 0 0.135254V612.111C313.572 631.987 694.403 637.367 1189.78 619.86C1248.63 617.783 1307.48 616.071 1366 614.626Z"
            fill="#E4F0D0"
          />
        </svg>
        <svg
          viewBox="0 0 376 621"
          height="631"
          width="auto"
          className="absolute top-0 right-0 rotate-180 -z-10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 9.68462V617.774C147.168 622.024 270.083 621.875 376 618.496V0C260.308 0 77.1282 6.45641 0 9.68462Z"
            fill="#E4F0D0"
          />
        </svg>
      </div>
    </div>
  );
};

export default Overview;
