import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BusinessCTA from '../sections/Modalities/BusinessCTA'
import ModalitiesHeader from '../sections/Modalities/ModalitiesHeader'
import StudyOptions from '../sections/Modalities/StudyOptions'

function Modalities() {
  return (
    <>
      <Navbar />
      <main className="bg-white px-[6%] py-14 lg:px-[12%] lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <ModalitiesHeader />
          <StudyOptions />
          <BusinessCTA />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Modalities
