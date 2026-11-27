import Image from 'next/image';
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { profile } from '../data/portfolio';
import { hero } from '../data/consulting';
import Button from './ui/Button';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="in relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="hero-copy">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-solid border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            {hero.availability}
          </p>

          <h1 className="hero-title mt-6 font-semibold text-white">
            {hero.headline} <span className="text-gradient">{hero.headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-[#a3aab8]">
            {hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#contact">
              {hero.primaryCta}
              <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="#pricing" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>

          <a
            href="#contact"
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-[#c7ccd6] underline decoration-white/25 underline-offset-4 transition hover:text-mint hover:decoration-mint"
          >
            {hero.callCta}
            <FiArrowUpRight aria-hidden="true" />
          </a>

          <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-solid border-white/10 pt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#8b93a3]">
            {hero.proof.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FiCheck className="shrink-0 text-mint" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[350px] lg:justify-self-end">
          <div
            className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_50%_45%,rgba(52,211,153,0.20),transparent_65%)] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-[26px] border border-solid border-white/[0.12] bg-panel p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]">
            <Image
              src="/profile.png"
              alt={`${profile.name} — ${profile.title}`}
              width={1106}
              height={1422}
              sizes="(max-width: 1024px) 70vw, 350px"
              preload
              className="h-auto w-full rounded-[19px] object-cover"
            />
            <div
              className="pointer-events-none absolute inset-2 rounded-[19px] ring-1 ring-inset ring-white/10"
              aria-hidden="true"
            />
          </div>

          <div className="hero-float absolute -left-3 top-6 flex items-center gap-2 rounded-full border border-solid border-white/15 bg-obsidian/90 px-3 py-1.5 shadow-lg backdrop-blur sm:-left-5">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#d1d5db]">
              Open for projects
            </span>
          </div>

          <div className="absolute -bottom-5 right-2 w-[192px] rounded-xl border border-solid border-white/[0.12] bg-obsidian/95 p-3.5 shadow-2xl backdrop-blur sm:-right-4">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#8b93a3]">
              Core stack
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['Next.js', 'MERN', 'Stripe', 'Technical SEO'].map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-solid border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9.5px] text-[#c7ccd6]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
