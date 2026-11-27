// Single source of truth for freelancer identity and navigation.
// Resume-style personal details are intentionally omitted.

export const profile = {
  name: "Natesh L",
  title: "Full-Stack Web Developer & SEO Consultant",
  email: "nateshlakshmanan27@gmail.com",
  phone: "+91 8300604677",
  phoneHref: "tel:+918300604677",
  linkedin: "https://www.linkedin.com/in/natesh-l",
  github: "https://github.com/natesh16",
  intro:
    "I design and build high-converting websites, scalable web applications and e-commerce experiences for startups and growing brands worldwide.",
};

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#client-details", label: "Client details" },
  { href: "#contact", label: "Contact" },
];

// Section ids in page order (used by the side navigation dots).
export const sectionIds = [
  "home", "services", "pricing", "client-details", "contact",
];
