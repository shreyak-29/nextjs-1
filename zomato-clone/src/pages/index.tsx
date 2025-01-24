import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Explore from '../components/ExploreOptions';
import BestFoodItems from '../components/BestFoodItems';


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <BestFoodItems/>
      <Explore />
      <Footer />
    </div>
  );
}
