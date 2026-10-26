import AnimatedText from "@/components/ui/AnimatedText";

const businessPartners = [
  { name: "Aliado empresarial 01" },
  { name: "Aliado empresarial 02" },
  { name: "Aliado empresarial 03" },
  { name: "Aliado empresarial 04" },
  { name: "Aliado empresarial 05" },
  { name: "Aliado empresarial 06" },
];

function PartnerMark({ partner }) {
  return partner.logo ? (
    <img
      className="h-10 w-auto max-w-[170px] object-contain grayscale"
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
    <section className="overflow-hidden bg-white px-[6%] py-14 text-[#071026] lg:px-[10%] lg:py-20">
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
