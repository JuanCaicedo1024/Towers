import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AboutHero from '../sections/About/AboutHero'
import AboutIdentity from '../sections/About/AboutIdentity'
import AboutProposal from '../sections/About/AboutProposal'
import AboutPurpose from '../sections/About/AboutPurpose'
import AboutVision from '../sections/About/AboutVision'
import ModalitiesLocation from '../sections/Modalities/ModalitiesLocation'

function About() {
  return (
    <>
      <Navbar />
      <main className="experience-page about-page">
        <AboutHero />
        <AboutIdentity />
        <AboutProposal />
        <AboutPurpose />
        <AboutVision />
        
        <ModalitiesLocation />
      </main>
      <Footer />
    </>
  )
}

export default About
