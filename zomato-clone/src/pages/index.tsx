import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Explore from '../components/ExploreOptions'


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Explore />
      <Footer />
    </div>
  );
}
