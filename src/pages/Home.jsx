import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Experience from "../sections/Home/Experience";
import FAQ from "../sections/Home/FAQ";
import Hero from "../sections/Home/Hero";
import Languages from "../sections/Home/Languages";
import Methodology from "../sections/Home/Methodology";
import Modalities from "../sections/Home/Modalities";
import Testimonials from "../sections/Home/Testimonials";

function Home() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <Hero />
        <Languages />
        <Methodology />
        
        
        <Modalities />
        <Testimonials />
        <Experience />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default Home;
