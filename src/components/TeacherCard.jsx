import { ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function TeacherCard({ teacher }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#d9dfe8] bg-white shadow-[0_10px_24px_rgb(23_35_58_/_10%)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_34px_rgb(23_35_58_/_18%)]">
      <div className="relative h-[230px] overflow-hidden bg-gradient-to-br from-[#183454] via-[#315d87] to-[#f13d35]">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={teacher.photo} alt={`Foto de ${teacher.name}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17233a]/75 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#294d78]">
          {teacher.languageName}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#17233a]">{teacher.name}</h3>
        <p className="mt-1 text-sm font-semibold text-[#f13d35]">Docente de {teacher.languageName}</p>
        <p className="mt-4 min-h-[72px] text-base leading-6 text-[#294d78]">{teacher.shortDescription}</p>
        <NavLink
          className="language-action mt-5 flex items-center justify-between rounded-xl bg-[#08244a] px-5 py-3 text-base font-bold text-white"
          to={`/docentes/${teacher.id}`}
        >
          <span>Conocer perfil</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </NavLink>
      </div>
    </article>
  )
}

export default TeacherCard
