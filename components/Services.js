import { FiArrowUpRight, FiCheck, FiCode, FiPenTool, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import { services } from '../data/consulting';

const icons = {
  code: FiCode,
  commerce: FiShoppingBag,
  design: FiPenTool,
  seo: FiTrendingUp,
};

export default function Services() {
  return (
    <section id="services" className="bg-alabaster py-24 sm:py-28">
      <div className="in">
        <div className="max-w-3xl">
          <span className="kicker text-emerald-700">Services</span>
          <h2 className="mb-0 text-[clamp(2rem,4.2vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            One partner for the strategy, design and code behind your next growth stage.
          </h2>
          <p className="mt-5 mb-0 max-w-[62ch] text-[17px] leading-[1.7] text-muted">
            Every engagement is scoped around a business outcome — more qualified leads, more
            completed orders, or a product your team can actually operate. No hand-offs between
            agencies, no mystery invoices.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-solid border-line bg-white p-7 shadow-[0_12px_28px_-20px_rgba(11,13,18,0.12)] transition duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-lift sm:p-8"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-solid border-line bg-[#ecfdf5] text-emerald-700 transition duration-300 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted-2">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-[21px] font-semibold tracking-[-0.02em] text-ink">
                  {service.title}
                </h3>
                <p className="mb-6 text-[15.5px] leading-[1.65] text-muted">{service.summary}</p>

                <ul className="mb-7 grid gap-2.5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-ink/80">
                      <FiCheck
                        className="mt-0.5 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-solid border-line pt-5">
                  <span className="text-[13px] font-medium text-emerald-700">
                    {service.outcome}
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-ink transition-all duration-200 group-hover:gap-2.5 group-hover:text-emerald-700"
                    aria-label={`Discuss ${service.title}`}
                  >
                    Discuss
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
