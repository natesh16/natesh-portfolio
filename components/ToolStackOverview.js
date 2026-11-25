export default function ToolStackOverview() {
  return (
    <section id="architecture" aria-labelledby="architecture-heading">
      <div className="in">
        <span className="kicker">Architecture &amp; Tooling</span>
        <h2 id="architecture-heading">
          How Natesh Builds &amp; Deploys MERN Applications on AWS
        </h2>
        <p className="sub">
          As a Full Stack Developer &amp; DevOps Engineer, I build and deploy MERN applications on
          AWS and automate CI/CD pipelines with Jenkins, Docker and GitHub Actions, delivering
          scalable, secure and cost-efficient software.
        </p>

        <div className="g2 seo-tools">
          <article className="card">
            <h3>MERN Stack: MongoDB, Express.js, React.js &amp; Node.js</h3>
            <p>
              Modern web products demand fast interfaces, predictable APIs, and flexible data
              models. As a Full Stack Developer &amp; DevOps Engineer, Natesh uses the MERN stack—
              MongoDB, Express.js, React.js, and Node.js—alongside Next.js and TypeScript to ship
              maintainable applications from prototype to production. React.js powers responsive,
              component-driven user interfaces with clean state management and accessible markup,
              while Node.js and Express.js provide a lightweight, event-driven backend capable of
              handling concurrent REST API requests, JWT authentication, and real-time Socket.IO
              events.
            </p>
            <p>
              For persistence, MongoDB stores schema-flexible application records with indexed
              queries that keep response times low as datasets grow. Pairing MongoDB with Redis
              caching and background job queues like BullMQ prevents bottlenecks during traffic
              spikes. Every layer shares JavaScript and TypeScript conventions, allowing Natesh to
              move seamlessly between frontend UX, API validation, and database optimization
              without handoff friction.
            </p>
          </article>

          <article className="card">
            <h3>AWS Cloud Infrastructure for Scalability &amp; Security</h3>
            <p>
              Building an application is only half the engineering lifecycle; keeping it fast,
              resilient, and affordable in production requires disciplined cloud architecture. When
              deploying MERN applications on AWS, Natesh provisions isolated Virtual Private Cloud
              (VPC) networks, least-privilege IAM roles, EC2 compute instances behind Nginx
              reverse proxies, and S3 object storage for static assets and backups. For
              event-driven workloads and lightweight microservices, AWS Lambda reduces idle
              compute costs while scaling automatically with demand.
            </p>
            <p>
              Visibility is built in from day one using Amazon CloudWatch metrics, structured logs,
              and automated health alerts. By right-sizing EC2 instances, tuning caching layers,
              and eliminating unused cloud resources, Natesh consistently achieves 99.9% production
              uptime while lowering monthly AWS bills by up to 20%—ensuring startups and growing
              teams get enterprise-grade reliability without overspending.
            </p>
          </article>

          <article className="card">
            <h3>Docker Containers &amp; Consistent Environments</h3>
            <p>
              Eliminating environment drift between local development, staging, and AWS production
              is essential for reliable releases. Natesh containerizes Node.js APIs, React/Next.js
              frontends, Redis caches, and Nginx proxies using Docker and Docker Compose. Each
              service runs inside a reproducible, version-pinned container image with multi-stage
              builds that minimize image size and attack surface.
            </p>
            <p>
              With Docker, new team members can spin up the entire stack in minutes, and production
              deployments roll forward or roll back deterministically. Combined with environment
              variable isolation and non-root container users, Docker forms the foundation for
              secure, portable cloud deployments across any AWS region.
            </p>
          </article>

          <article className="card">
            <h3>CI/CD Automation with Jenkins &amp; GitHub Actions</h3>
            <p>
              Manual deployments slow teams down and introduce avoidable human error. To keep
              delivery fast and predictable, Natesh automates build, test, and deployment workflows
              through CI/CD pipelines built with Jenkins and GitHub Actions. Every pull request
              triggers automated linting, dependency checks, and build verification before code
              ever reaches the main branch.
            </p>
            <p>
              Once merged, GitHub Actions or Jenkins pipelines automatically build fresh Docker
              images, run integration checks, and deploy zero-downtime updates to AWS EC2. This
              end-to-end automation has accelerated release cycles by 35%, allowing clients to ship
              features faster, recover quickly, and focus on product growth instead of manual
              server maintenance.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
