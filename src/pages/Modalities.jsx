import FAQ from '@/sections/Home/FAQ'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ClassExperience from '../sections/Modalities/ClassExperience'
import ModalitiesClosing from '../sections/Modalities/ModalitiesClosing'
import ModalitiesHeader from '../sections/Modalities/ModalitiesHeader'
import ModalitiesLocation from '../sections/Modalities/ModalitiesLocation'
import ModalitiesMethodology from '../sections/Modalities/ModalitiesMethodology'
import StudyOptions from '../sections/Modalities/StudyOptions'


function Modalities() {
  return (
    <>
      <Navbar />
      <main className="modalities-page">
        <ModalitiesHeader />
        <StudyOptions />
        <ClassExperience />
        <ModalitiesLocation />
        <ModalitiesMethodology />
        <FAQ/>
        <ModalitiesClosing />
      </main>
      <Footer />
    </>
  )
}

export default Modalities
