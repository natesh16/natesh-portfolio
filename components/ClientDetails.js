import { FiArrowRight, FiCheckCircle, FiClock, FiShield, FiZap } from 'react-icons/fi';

const clientPromises = [
  {
    icon: FiZap,
    title: 'Start small from $50, scale to $2,000+',
    text: 'Test our collaboration on a quick fix or landing page first—no forced long-term retainers.',
  },
  {
    icon: FiClock,
    title: 'Fast, transparent milestones',
    text: 'Written scope, clear timelines, and regular progress previews before every payment milestone.',
  },
  {
    icon: FiShield,
    title: 'Clean code & 30-day support',
    text: 'Production-ready Next.js, MERN, and AWS setups with full documentation and post-launch care.',
  },
];

const clientDetails = [
  {
    title: 'Name & company',
    text: 'Who you are, your company name, and the best contact for project updates.',
  },
  {
    title: 'Project goal',
    text: 'What you want to achieve, who the product is for, and the core problem to solve.',
  },
  {
    title: 'Scope & service',
    text: 'Pages, features, UI/UX design, e-commerce, AWS deployment, or technical SEO needs.',
  },
  {
    title: 'Budget ($50 – $2,000+)',
    text: 'Your target budget range, ideal launch date, and any key deadlines.',
  },
  {
    title: 'Existing assets',
    text: 'Current website, brand guidelines, copy, domains, analytics, or Figma files.',
  },
  {
    title: 'Technical requirements',
    text: 'Preferred stack, payment gateways (Stripe/PayPal), hosting, or handoff needs.',
  },
];

export default function ClientDetails() {
  return (
    <section id="client-details" className="bg-alabaster py-24 sm:py-28">
      <div className="in">
        <div className="max-w-3xl">
          <span className="kicker text-emerald-700">Why Work With Me</span>
          <h2 className="mb-0 text-[clamp(2rem,4.2vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            Built to earn your trust from the very first milestone.
          </h2>
          <p className="mt-5 mb-0 max-w-[62ch] text-[17px] leading-[1.7] text-muted">
            You work directly with the engineer designing, building, and deploying your product—with
            fixed pricing starting at $50 and clear deliverables before work begins.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {clientPromises.map((promise) => {
            const Icon = promise.icon;
            return (
              <article
                key={promise.title}
                className="rounded-2xl border border-solid border-line bg-white p-6 shadow-[0_12px_28px_-20px_rgba(11,13,18,0.12)]"
              >
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-solid border-line bg-[#ecfdf5] text-emerald-700">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {promise.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-muted">{promise.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-solid border-line bg-white p-7 shadow-[0_12px_28px_-20px_rgba(11,13,18,0.12)] sm:p-9">
          <div className="flex flex-col justify-between gap-4 border-b border-solid border-line pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="kicker mb-2 text-emerald-700">Project Kickoff Checklist</span>
              <h3 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">
                Share these 6 details for a fast, accurate quote
              </h3>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-mint px-4 py-2.5 text-[13.5px] font-semibold text-obsidian transition hover:bg-emerald-500"
            >
              Send project inquiry
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clientDetails.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-emerald-700" aria-hidden="true" />
                <div>
                  <h4 className="mb-1 text-[15px] font-semibold text-ink">{item.title}</h4>
                  <p className="text-[13.5px] leading-[1.6] text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
