import AnimatedText from "@/components/ui/AnimatedText";
import { Building2, Monitor, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const modalities = [
  [
    "Presencial",
    "/images/modalities/in-person.png",
    UsersRound,
    "Asiste a clases en una sede, practica en persona con tu docente y comparte el proceso con otros estudiantes.",
  ],
  [
    "Virtual",
    "/images/modalities/online.png",
    Monitor,
    "Conéctate a clases en vivo desde donde estés e interactúa con tu docente y compañeros en línea.",
  ],
  [
    "Híbrida",
    "/images/modalities/hybrid.png",
    Building2,
    "Combina clases presenciales y virtuales para adaptar tu aprendizaje a tus horarios y necesidades.",
  ],
];

function StudyOptions() {
  return (
    <section className="bg-white px-[6%] py-16 text-[#17233a] lg:px-[12%] lg:py-20">
      <div className="relative z-10 mx-auto max-w-[1340px]">
        <h2 className="mt-5 text-4xl font-bold italic leading-[1.05] tracking-[-0.045em] text-[#101820] sm:text-5xl lg:text-6xl">
          <AnimatedText>Cómo puedes estudiar</AnimatedText>
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {modalities.map(([title, image, Icon, description], index) => (
            <article
              className="language-modality-card group overflow-hidden rounded-xl border border-white/40 bg-white/95 shadow-[0_10px_25px_rgb(0_0_0_/_22%)]"
              style={{ "--card-delay": `${index * 120}ms` }}
              key={title}
            >
              <div className="relative flex h-[180px] items-center justify-center overflow-hidden bg-[#183454]">
                <img
                  className="absolute inset-0 z-0 h-full w-full object-cover opacity-75"
                  src={image}
                  alt=""
                />
                <span className="absolute bottom-0 left-7 z-30 grid h-[82px] w-[102px] translate-y-0 place-items-center rounded-t-2xl bg-white text-[#f13d35] shadow-[0_-5px_15px_rgb(0_0_0_/_12%)]">
                  <Icon
                    className="h-11 w-11"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="px-7 pb-6 pt-12">
                <h3 className="text-2xl font-bold text-[#071026]">{title}</h3>
                <p className="mt-4 min-h-[58px] text-base leading-6 text-[#4b5563]">
                  {description}
                </p>
                <NavLink
                  className="mt-5 flex items-center justify-center rounded-xl bg-[#08244a] px-5 py-3 text-lg font-bold text-white"
                  to="/modalidades"
                >
                  Ver Modalidad
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudyOptions;
