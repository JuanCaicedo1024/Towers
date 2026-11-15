import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Experience from "../sections/Home/Experience";
import FAQ from "../sections/Home/FAQ";
import Hero from "../sections/Home/Hero";
import Languages from "../sections/Home/Languages";
import Methodology from "../sections/Home/Methodology";
import Modalities from "../sections/Home/Modalities";
import BusinessPartners from "../sections/Home/BusinessPartners";
import Testimonials from "../sections/Home/Testimonials";
import HomeLocation from "../sections/Home/HomeLocation";
import { HomeContentProvider, useHomeContent } from '../hooks/useHomeContent.jsx'
import AnnouncementBar from '../components/AnnouncementBar'

function HomeAnnouncement() {
  const { announcementActive, announcementText } = useHomeContent()
  return announcementActive ? <AnnouncementBar text={announcementText} /> : null
}

function Home() {
  return (
    <>
      <Navbar />
      <HomeContentProvider><HomeAnnouncement /><main className="home-page">
        <Hero />
        <Languages />
        <Methodology />
        <Modalities />
        <Testimonials />
        <Experience />
        <BusinessPartners />
        <FAQ />
        <HomeLocation />
      </main></HomeContentProvider>
      <Footer />
    </>
  );
}

export default Home;
