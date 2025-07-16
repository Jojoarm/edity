import About from '../../components/common/sections/About';
import Hero from '../../components/common/sections/Hero';
import Info from '../../components/common/sections/Info';
import Info2 from '../../components/common/sections/Info2';
import Solutions from '../../components/common/sections/Solutions';
import Testimonials from '../../components/common/sections/Testimonials';
import Transform from '../../components/common/sections/Transform';

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <Info />
      <Info2 />
      <Solutions />
      <About />
      <Testimonials />
      <Transform />
    </div>
  );
};

export default Home;
