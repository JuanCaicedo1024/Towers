import FAQ from '@/sections/Home/FAQ'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ClassExperience from '../sections/Modalities/ClassExperience'

import ModalitiesHeader from '../sections/Modalities/ModalitiesHeader'
import ModalitiesLocation from '../sections/Modalities/ModalitiesLocation'

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
        
        <FAQ/>
        
      </main>
      <Footer />
    </>
  )
}

export default Modalities
