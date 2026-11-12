import AnimatedText from '@/components/ui/AnimatedText';
import { TextEffect } from '../../../components/motion-primitives/text-effect';
import { ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge } from 'lucide-react';

function Hero() {
  return (
    <section id="home-hero" className="relative overflow-hidden bg-[#fff8f6] text-[#17233a]">
      <div className="mx-auto grid min-h-[620px] w-[88%] max-w-[1440px] grid-cols-1 items-center gap-8 pb-16 pt-14 lg:w-[84%] lg:pt-28 xl:grid-cols-[1.1fr_0.9fr] xl:gap-4 xl:pb-0 xl:pt-24">
        <div className="relative z-10 max-w-[780px]">
          <Link
            className="mb-4 hidden w-fit rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E83E33] lg:block"
            to="/"
            aria-label="Towers, inicio"
          >
            <img
              className="h-[100px] w-[260px] object-contain xl:h-[112px] xl:w-[300px]"
              src="/images/Towers_logo.png"
              alt="Towers Centro activo de idiomas"
            />
          </Link>
          <h1 className="m-0 max-w-[780px] text-[clamp(2.8rem,4.5vw,5.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#101820]">
            <TextEffect as="span" per="word" preset="fade-in-blur" className="inline">
              Aprende un idioma
            </TextEffect>
            <br />
            <TextEffect as="span" per="word" preset="fade-in-blur" delay={0.25} className="inline">
              para usarlo donde
            </TextEffect>
            <br />
            <TextEffect as="span" per="word" preset="fade-in-blur" delay={0.5} className="inline text-[#E83E33]">
              realmente importa.
            </TextEffect>
          </h1>
          <p className="mt-6 max-w-[760px] text-base font-medium leading-[1.45] text-[#294d78] sm:text-lg">
            <AnimatedText>Aprende inglés y otros idiomas a través de clases interactivas,
            profesores preparados y experiencias que llevan el idioma a
            situaciones reales.</AnimatedText>
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link className="inline-flex min-w-[250px] items-center justify-between gap-6 rounded-xl bg-[#E83E33] px-7 py-4 text-base font-bold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_10px_22px_rgb(232_62_51_/_32%)]" to="/idiomas">
              Encuentra tu programa
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-w-[250px] items-center justify-center gap-3 rounded-xl border border-[#9eabb9] bg-[#edf1f5] px-7 py-4 text-base font-bold text-[#183454] shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md" to="/clase-introductoria">
              Regístrate para tu clase gratuita
              <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-[#183454] text-sm text-white">+</span>
            </Link>
          </div>
          <Link
            className="mt-4 inline-flex items-center gap-3 rounded-xl border border-[#f2d5d0] bg-[#fff] px-5 py-3.5 text-base font-bold text-[#183454] shadow-[0_8px_22px_rgb(23_35_58_/_8%)] transition hover:-translate-y-0.5 hover:border-[#E83E33] hover:shadow-[0_12px_26px_rgb(23_35_58_/_14%)]"
            to="/prueba-de-nivel"
          >
            <Gauge className="h-5 w-5 text-[#E83E33]" aria-hidden="true" />
            Descubre tu nivel gratis
            <ArrowRight className="h-4 w-4 text-[#E83E33]" aria-hidden="true" />
          </Link>
          <ScrollVelocityRow
            className="mt-5 w-[390px] max-w-full font-mono text-sm font-bold uppercase tracking-[0.08em] text-[#C83A2F]"
            baseVelocity={2}
          >
            <div className="inline-flex items-center gap-x-5 pr-5">
              <span>Presencial</span>
              <span className="text-[#183454]">·</span>
              <span>Online</span>
              <span className="text-[#183454]">·</span>
              <span>Grupos semipersonalizados</span>
              <span className="text-[#183454]">·</span>
              <span className="text-[#183454]">·</span>
            </div>
          </ScrollVelocityRow>
        </div>

        <div className="home-hero__visual relative flex min-h-[430px] items-end justify-center self-stretch xl:min-h-[720px]">
          <img
            className="home-hero__image relative z-10 h-auto w-[90%] max-w-[500px] object-contain object-bottom xl:absolute xl:bottom-0 xl:right-0 xl:h-[92%] xl:w-auto xl:max-w-full"
            src="/images/Hero_Towers.png"
            alt="El mejor lugar para aprender y crecer, con una estudiante y el Big Ben"
          />
          <span className="home-hero__image-blend" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default Hero
