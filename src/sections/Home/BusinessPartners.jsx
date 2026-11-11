import AnimatedText from "@/components/ui/AnimatedText";

const businessPartners = [
  {
    name: "Convenio empresarial",
    logo: "/images/convenio-empresarial.png",
  },
  { name: "Addi", logo: "/images/Addi.png" },
  { name: "Sistecrédito", logo: "/images/Sistecredito.png", crop: true },
  { name: "Universidad del Sinú", logo: "/images/Universidad.png", crop: true },
  { name: "CENS", logo: "/images/Cens.jpg", logoClassName: "h-[72px] w-[72px] object-contain" },
  { name: "Clínica Machicado", logo: "/images/Clinica.svg" },
];

function PartnerMark({ partner }) {
  return partner.logo ? (
    <img
      className={partner.logoClassName || `h-12 w-[180px] ${
        partner.crop ? "object-cover" : "object-contain"
      }`}
      src={partner.logo}
      alt={partner.name}
    />
  ) : (
    <span className="text-center text-sm font-bold uppercase tracking-[0.12em] text-[#526174]">
      {partner.name}
    </span>
  );
}

function BusinessPartners() {
  const carouselItems = [...businessPartners, ...businessPartners];

  return (
    <section id="towers-empresas" className="scroll-mt-24 overflow-hidden bg-white px-[6%] py-14 text-[#071026] lg:px-[10%] lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#e83e33]">
            CONVENIOS EMPRESARIALES
          </p>
          <h2 className="mt-3 text-3xl font-bold italic tracking-[-0.05em] sm:text-5xl">
            <AnimatedText>Impulsamos el talento de tu equipo</AnimatedText>
          </h2>
          <p className="mt-5 text-base leading-7 text-[#526174] sm:text-lg">
            Creamos alianzas para que más personas puedan aprender idiomas y
            crecer profesionalmente.
          </p>
        </div>

        <div className="business-partners-carousel relative mt-10" aria-label="Empresas aliadas">
          <div className="business-partners-carousel__track">
            {carouselItems.map((partner, index) => (
              <div
                className="business-partner-mark"
                key={`${partner.name}-${index}`}
                aria-hidden={index >= businessPartners.length}
              >
                <PartnerMark partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessPartners;
