// Single source of truth for all portfolio content.
// Every fact below comes from Natesh L's resume (public/resume.pdf).

export const profile = {
  name: "Natesh L",
  title: "Full Stack Developer & DevOps Engineer",
  // Location comes from the original portfolio, not the resume header.
  location: "Coimbatore, Tamil Nadu, India",
  email: "nateshlakshmanan27@gmail.com",
  phone: "+91 8300604677",
  phoneHref: "tel:+918300604677",
  linkedin: "https://www.linkedin.com/in/natesh-l",
  github: "https://github.com/natesh16",
  resume: "/resume.pdf",
  resumeFileName: "Natesh_L_Resume.pdf",
  intro:
    "I build and deploy MERN applications on AWS and automate CI/CD pipelines with Jenkins, Docker and GitHub Actions, delivering scalable, secure and cost-efficient software.",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#training", label: "Training" },
  { href: "#profiles", label: "Profiles" },
  { href: "#contact", label: "Contact" },
];

// Section ids in page order (used by the side navigation dots).
export const sectionIds = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "training",
  "profiles",
  "resume",
  "contact",
];

export const about = {
  heading: "Code it, ship it, keep it running.",
  paragraphs: [
    "Full Stack Developer & DevOps Engineer with expertise in building and deploying MERN applications on AWS cloud. I automate CI/CD pipelines with Jenkins, Docker and GitHub Actions, optimize system performance, and have improved release cycles by 35%.",
    "My work centres on scalable, secure and cost-efficient applications delivered in Agile environments, and has improved user satisfaction by 40%.",
  ],
  interests: [
    "MERN applications",
    "AWS cloud",
    "CI/CD automation",
    "Infrastructure as Code",
    "Serverless (Lambda)",
    "Monitoring & logging",
    "Performance optimization",
  ],
  focus:
    "Delivering scalable, secure and cost-efficient applications in Agile environments.",
  journey: [
    {
      date: "Sep 2022",
      title: "Started B.E. in Electrical and Electronics Engineering",
      sub: "Rohini College of Engineering & Technology",
    },
    {
      date: "Sep 2023",
      title: "Began freelance work as Full Stack Developer & DevOps Engineer",
      sub: "Freelance / Remote",
    },
    {
      date: "Jul 2024",
      title: "Started the Land Promoter Management System",
      sub: "MERN stack on AWS",
    },
    {
      date: "May 2026",
      title: "B.E. in Electrical and Electronics Engineering (2022 – 2026)",
    },
  ],
};

export const experience = {
  role: "Full Stack Developer & DevOps Engineer",
  company: "Freelance / Remote",
  period: "September 2023 – Present",
  details: [
    {
      title: "Full-stack development",
      text: "Built and deployed full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
    },
    {
      title: "Deployment automation",
      text: "Automated deployments using Jenkins, Docker, and GitHub Actions, ensuring faster and error-free releases.",
    },
    {
      title: "AWS configuration",
      text: "Configured AWS services (EC2, S3, VPC, IAM, CloudWatch) to achieve 99.9% uptime and reduce cloud costs by 20%.",
    },
    {
      title: "Monitoring and logging",
      text: "Implemented monitoring & logging on AWS to improve reliability and reduce downtime.",
    },
    {
      title: "Client collaboration",
      text: "Collaborated with clients to gather requirements, optimize features, and deliver cloud-ready solutions.",
    },
  ],
  tech: [
    { id: "mongodb", label: "MongoDB" },
    { id: "express", label: "Express.js" },
    { id: "react", label: "React.js" },
    { id: "node", label: "Node.js" },
    { id: "jenkins", label: "Jenkins" },
    { id: "docker", label: "Docker" },
    { id: "githubactions", label: "GitHub Actions" },
    { id: "aws", label: "AWS" },
  ],
};

export const projects = [
  {
    id: "transport",
    title: "Employee Transport Management System",
    period: "Final Year Project",
    image: "/employeetransportmanagementsystem.png",
    imageAlt:
      "Employee transport SaaS platform with fleet dashboard and live tracking",
    description:
      "A multi-tenant SaaS platform that simplifies corporate employee transportation through automated trip planning, fleet management and real-time tracking.",
    features: [
      "Multi-tenant portals with role-based access control",
      "Automated employee trip planning and scheduling",
      "Fleet, vendor, driver and vehicle management",
      "Real-time GPS tracking and ETA updates",
      "Employee OTP verification and trip notifications",
    ],

  
techGroups: [
  {
    category: 'Frontend',
    items: [
      { id: 'next', label: 'Next.js' },
      { id: 'react', label: 'React.js' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'tailwind', label: 'Tailwind CSS' },
      { id: 'radix', label: 'Radix UI' },
      { id: 'react-hook-form', label: 'React Hook Form' },
      { id: 'zod', label: 'Zod' },
      { id: 'react-query', label: 'TanStack Query' },
      { id: 'zustand', label: 'Zustand' },
      { id: 'axios', label: 'Axios' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { id: 'node', label: 'Node.js' },
      { id: 'express', label: 'Express.js' },
      { id: 'jwt', label: 'JWT' },
      { id: 'bcrypt', label: 'Bcrypt' },
      { id: 'bullmq', label: 'BullMQ' },
    ],
  },
  {
    category: 'Database & Real-time',
    items: [
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'mongoose', label: 'Mongoose' },
      { id: 'redis', label: 'Redis' },
      { id: 'socket', label: 'Socket.IO' },
    ],
  },
  {
    category: 'Maps & Visualization',
    items: [
      { id: 'aws-location', label: 'AWS Location' },
      { id: 'leaflet', label: 'Leaflet' },
      { id: 'recharts', label: 'Recharts' },
      { id: 'gsap', label: 'GSAP' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { id: 'aws', label: 'AWS' },
      { id: 'ses', label: 'AWS SES' },
      { id: 'docker', label: 'Docker' },
      { id: 'compose', label: 'Docker Compose' },
      { id: 'nginx', label: 'Nginx' },
    ],
  },
],

  },
];

export const skillGroups = [
  {
    title: "Programming languages",
    description:
      "Core languages used for application development, scripting and problem solving.",
    items: [
      { id: "javascript", label: "JavaScript (ES6+)" },
      { id: "python", label: "Python" },
      { id: "cpp", label: "C++" },
      { id: "c", label: "C" },
    ],
  },
  {
    title: "Frontend development",
    description:
      "Building responsive interfaces and reusable, component-based user experiences.",
    items: [
      { id: "react", label: "React.js" },
      { id: "redux", label: "Redux" },
      { id: "html", label: "HTML5" },
      { id: "css", label: "CSS3" },
      { id: "tailwind", label: "Tailwind CSS" },
      { id: "bootstrap", label: "Bootstrap" },
    ],
  },
  {
    title: "Backend & API development",
    description:
      "Developing server-side logic, authentication flows and service integrations.",
    items: [
      { id: "node", label: "Node.js" },
      { id: "express", label: "Express.js" },
      { id: "rest", label: "REST APIs" },
      { id: "jwt", label: "JWT Authentication" },
      { id: "api", label: "Third-party API Integration" },
    ],
  },
  {
    title: "Databases & caching",
    description:
      "Structuring application data and supporting fast, reliable data access.",
    items: [
      { id: "mongodb", label: "MongoDB" },
      { id: "mysql", label: "MySQL" },
      { id: "redis", label: "Redis" },
      { id: "sqlite", label: "SQLite" },
    ],
  },
  {
    title: "Cloud & AWS",
    description:
      "Deploying and operating applications with cloud infrastructure and managed services.",
    items: [
      { id: "aws", label: "Amazon Web Services" },
      { id: "ec2", label: "EC2" },
      { id: "s3", label: "S3" },
      { id: "vpc", label: "VPC" },
      { id: "iam", label: "IAM" },
      { id: "cloudwatch", label: "CloudWatch" },
      { id: "lambda", label: "AWS Lambda" },
    ],
  },
  {
    title: "DevOps & developer tools",
    description:
      "Containerization, version control, automated delivery and deployment workflows.",
    items: [
      { id: "docker", label: "Docker" },
      { id: "jenkins", label: "Jenkins" },
      { id: "githubactions", label: "GitHub Actions" },
      { id: "git", label: "Git" },
      { id: "github", label: "GitHub" },
      { id: "cicd", label: "CI/CD Pipelines" },
      { id: "iac", label: "Infrastructure as Code" },
    ],
  },
  {
    title: "Electrical engineering",
    description:
      "Practical production knowledge from industrial electrical control-panel work.",
    items: [
      { id: "schematic", label: "Electrical Schematic Reading" },
      { id: "sld", label: "Single-Line Diagrams (SLD)" },
      { id: "controlpanel", label: "LT & Control Panels" },
      { id: "mcc", label: "Motor Control Centres (MCC)" },
      { id: "plc", label: "PLC-Ready Panels" },
      { id: "wiring", label: "Wiring, Ferruling & Testing" },
    ],
  },
  {
    title: "Ways of working",
    description:
      "Collaborative practices for planning, integration and continuous improvement.",
    items: [
      { id: "agile", label: "Agile / Scrum" },
      { id: "monitoring", label: "Monitoring & Logging" },
      { id: "security", label: "Access Control & Security" },
    ],
  },
];

export const education = [
  {
    period: "Sep 2022 – May 2026",
    title: "B.E. in Electrical and Electronics Engineering",
    place:
      "Rohini College of Engineering & Technology, Kanyakumari, Tamil Nadu",
  },
  {
    period: "2020 – May 2022",
    title: "Higher Secondary Education",
    place: "KV Matriculation School, Coimbatore, Tamil Nadu",
    score: 68,
  },
];

export const certifications = [
  {
    issuer: "AWS",
    icon: "aws",
    title: "AWS Certified Cloud Practitioner",
    note: "All 12 modules",
  },
  {
    issuer: "AWS",
    icon: "aws",
    title: "AWS Certified – Core Security Concepts",
    note: "Cloud security",
  },
  {
    issuer: "OpenWeaver",
    icon: "python",
    title: "OpenWeaver Certified – Python Basics",
    note: "Python",
  },
  {
    issuer: "OpenWeaver",
    icon: "html",
    title: "OpenWeaver Certified – HTML & CSS Basics",
    note: "Web fundamentals",
  },
];
