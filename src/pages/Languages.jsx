import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LanguagesHero from '../sections/Languages/LanguagesHero'
import LanguageSlider from '../sections/Languages/LanguageSlider'
import LanguageGoals from '../sections/Languages/LanguageGoals'
import LanguageMethodology from '../sections/Languages/LanguageMethodology'


function Languages() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-[#17233a]">
        <LanguagesHero />
        <LanguageSlider />
        <LanguageGoals />
        <LanguageMethodology />
      </main>
      <Footer />
    </>
  )
}

export default Languages
