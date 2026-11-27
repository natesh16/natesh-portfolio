import { FiArrowRight, FiCalendar, FiCheck, FiCreditCard, FiGlobe } from 'react-icons/fi';
import { pricing, pricingTrust } from '../data/consulting';
import Button from './ui/Button';

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-obsidian py-24 text-white sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="in relative">
        <div className="max-w-3xl">
          <span className="kicker text-mint">Pricing</span>
          <h2 className="mb-0 text-[clamp(2rem,4.2vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            Transparent tiers. Fixed scope. No surprise invoices.
          </h2>
          <p className="mt-5 mb-0 max-w-[62ch] text-[17px] leading-[1.7] text-[#9ca3af]">
            Pick the level of build you need today. Every tier includes strategy, design and
            development from one person — so nothing gets lost between teams.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {pricing.map((tier) => (
            <article
              key={tier.id}
              className={`relative flex h-full flex-col rounded-2xl border border-solid p-7 transition duration-300 sm:p-8 ${
                tier.popular
                  ? 'border-mint/50 bg-[linear-gradient(180deg,#132a24_0%,#11151f_72%)] shadow-glow lg:-mt-4 lg:pb-10'
                  : 'border-white/10 bg-[#11151f] hover:border-white/25'
              }`}
            >
              {tier.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-mint px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-obsidian">
                  Most popular
                </span>
              ) : null}

              <div className="mb-6">
                <h3 className="mb-1.5 text-[18px] font-semibold text-white">{tier.name}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#8b93a3]">{tier.tagline}</p>
              </div>

              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-[clamp(1.9rem,3.2vw,2.25rem)] font-semibold tracking-[-0.035em] text-white">
                  {tier.price}
                </span>
              </div>
              <span className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#7b8394]">
                {tier.priceNote}
              </span>

              <div className="mb-6 rounded-lg border border-solid border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#7b8394]">
                  Best for
                </span>
                <p className="mt-0.5 text-[13px] font-medium text-[#d1d5db]">{tier.bestFor}</p>
              </div>

              <ul className="mb-8 grid gap-2.5">
                {tier.features.map((feature) =>
                  feature.startsWith('Everything in') ? (
                    <li
                      key={feature}
                      className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mint"
                    >
                      {feature}
                    </li>
                  ) : (
                    <li key={feature} className="flex items-start gap-2.5 text-[14px] text-[#c7ccd6]">
                      <FiCheck className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                      {feature}
                    </li>
                  )
                )}
              </ul>

              <Button
                href="#contact"
                variant={tier.popular ? 'primary' : 'secondary'}
                className="mt-auto w-full"
              >
                {tier.cta}
                <FiArrowRight aria-hidden="true" />
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-solid border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <FiCreditCard className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
              <div>
                <p className="mb-1 text-[14px] leading-relaxed text-[#c7ccd6]">
                  <strong className="font-semibold text-white">Flexible milestone payments</strong>{' '}
                  (25%–50% upfront). International payments accepted via Stripe, PayPal and
                  Payoneer.
                </p>
                <p className="text-[12.5px] text-[#7b8394]">{pricingTrust.currency}</p>
              </div>
            </div>

            <a
              href={pricingTrust.bookingUrl || '#contact'}
              className="inline-flex shrink-0 items-center gap-2 text-[13.5px] font-semibold text-mint transition hover:text-[#6ee7b7]"
            >
              <FiCalendar aria-hidden="true" />
              {pricingTrust.bookingLabel} {pricingTrust.bookingCta}
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-solid border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7b8394]">
            <span className="inline-flex items-center gap-1.5">
              <FiGlobe aria-hidden="true" /> US · UK · Middle East
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheck aria-hidden="true" /> Fixed-scope proposals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheck aria-hidden="true" /> 30-day post-launch support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
