import TechChip from './TechChip';
import { getIcon } from '../lib/icons';

const STACK = [
  {
    title: 'MERN application stack',
    icon: 'react',
    text: 'React, Next.js and TypeScript interfaces backed by Node, Express and MongoDB APIs.',
    stat: 'Prototype to production',
    chips: [
      { id: 'react', label: 'React' },
      { id: 'next', label: 'Next.js' },
      { id: 'node', label: 'Node.js' },
      { id: 'express', label: 'Express' },
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'typescript', label: 'TypeScript' },
    ],
  },
  {
    title: 'AWS cloud infrastructure',
    icon: 'aws',
    text: 'VPC, IAM, EC2, S3 and Lambda, monitored with CloudWatch and tuned for cost.',
    stat: '99.9% uptime · 20% lower spend',
    chips: [
      { id: 'ec2', label: 'EC2' },
      { id: 's3', label: 'S3' },
      { id: 'lambda', label: 'Lambda' },
      { id: 'iam', label: 'IAM' },
      { id: 'cloudwatch', label: 'CloudWatch' },
    ],
  },
  {
    title: 'Docker environments',
    icon: 'docker',
    text: 'Docker and Compose images keep development, staging and production identical.',
    stat: 'One image, every environment',
    chips: [
      { id: 'docker', label: 'Docker' },
      { id: 'nginx', label: 'Nginx' },
      { id: 'redis', label: 'Redis' },
      { id: 'node', label: 'Node.js' },
    ],
  },
  {
    title: 'CI/CD automation',
    icon: 'cicd',
    text: 'Jenkins and GitHub Actions lint, test and deploy every merge with zero downtime.',
    stat: '35% faster releases',
    chips: [
      { id: 'jenkins', label: 'Jenkins' },
      { id: 'githubactions', label: 'GitHub Actions' },
      { id: 'docker', label: 'Docker' },
      { id: 'aws', label: 'AWS' },
    ],
  },
];

export default function ToolStackOverview() {
  return (
    <section id="architecture" aria-labelledby="architecture-heading">
      <div className="in">
        <span className="kicker">Architecture &amp; Tooling</span>
        <h2 id="architecture-heading">How I build &amp; deploy MERN applications on AWS</h2>
        <p className="sub">
          Full-stack development and DevOps, from interface to infrastructure.
        </p>

        <div className="g2 stack-grid">
          {STACK.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <article className="card stack-card" key={item.title}>
                <div className="stack-card-top">
                  <span className="stack-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="stack-num">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="wrapchips stack-chips">
                  {item.chips.map((chip) => (
                    <TechChip key={chip.id} id={chip.id} label={chip.label} />
                  ))}
                </div>
                <span className="stack-stat">{item.stat}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
