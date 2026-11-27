const clientDetails = [
  {
    title: 'Name & company',
    text: 'Who you are, your company name, and the best contact name for project communication.',
  },
  {
    title: 'Project goal',
    text: 'What you are trying to achieve, who the project is for, and which problem it should solve.',
  },
  {
    title: 'Scope & service',
    text: 'The pages, features, designs, integrations, e-commerce needs, or SEO work you need delivered.',
  },
  {
    title: 'Budget & timeline',
    text: 'Your budget range, target launch date, required milestones, and any deadlines that affect scope.',
  },
  {
    title: 'Existing assets',
    text: 'Current website or app, brand guidelines, copy, images, domains, analytics, CMS, or design files.',
  },
  {
    title: 'Technical requirements',
    text: 'Preferred platforms, integrations, payment processors, hosting, accessibility needs, and team handoff requirements.',
  },
];

export default function ClientDetails() {
  return (
    <section id="client-details">
      <div className="in">
        <span className="kicker">Client intake</span>
        <h2>Client details</h2>
        <p className="sub">
          Share these details with me so the scope, timeline, and price can be confirmed accurately before work begins.
        </p>

        <div className="g2 stag">
          {clientDetails.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <p className="focus">
          Send a project inquiry below. A scope and timeline will be confirmed in writing before work begins.
        </p>
      </div>
    </section>
  );
}
