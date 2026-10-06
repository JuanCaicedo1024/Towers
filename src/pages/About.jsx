import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AboutHero from '../sections/About/AboutHero'
import AboutIdentity from '../sections/About/AboutIdentity'
import AboutLocation from '../sections/About/AboutLocation'
import AboutPrinciples from '../sections/About/AboutPrinciples'
import AboutProposal from '../sections/About/AboutProposal'
import AboutPurpose from '../sections/About/AboutPurpose'
import AboutVision from '../sections/About/AboutVision'
import AboutClosing from '../sections/About/AboutClosing'

function About() {
  return (
    <>
      <Navbar />
      <main className="experience-page">
        <AboutHero />
        <AboutIdentity />
        <AboutProposal />
        <AboutPurpose />
        <AboutVision />
        <AboutPrinciples />
        <AboutLocation />
        <AboutClosing />
      </main>
      <Footer />
    </>
  )
}

export default About
