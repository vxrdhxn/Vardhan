import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Curtain from "@/components/Curtain";
import { NextPage, PageTitle } from "@/components/PageParts";
import { TransitionLink } from "@/components/PageTransition";
import { projects } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  return { title: project?.name, description: project?.tagline };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const [leadImage, ...moreImages] = project.images ?? [];

  return (
    <main className="page">
      <TransitionLink className="back-link fade-in" href="/work">
        All work
      </TransitionLink>

      <PageTitle>{project.name}</PageTitle>

      <p className="case-tagline fade-in">
        {project.tagline}
        {project.status && <span className="project-status">{project.status}</span>}
      </p>

      {/* A project with screenshots leads with the first one. The others get
          a band of ribs with their own light pattern, picked by position. */}
      {leadImage ? (
        <figure className="case-shot fade-in">
          <Image
            src={leadImage.src}
            alt={leadImage.alt}
            width={leadImage.width}
            height={leadImage.height}
            sizes="(max-width: 1376px) 100vw, 1376px"
            priority
          />
        </figure>
      ) : (
        <div className="case-band fade-in">
          <Curtain variant="band" seed={index + 1} />
        </div>
      )}

      <div className="case fade-in">
        <div>
          <h2>Built with</h2>
          <ul className="pills">
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <ul className="case-links">
            {project.links?.map((link) => (
              <li key={link.href}>
                <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
                View the code on GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="case-summary">{project.summary}</p>
          <ul className="case-points">
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Big wide screenshots take a full row. The rest sit side by side. */}
      {moreImages.length > 0 && (
        <div className="case-gallery">
          {moreImages.map((image) => {
            // Big screenshots sit two to a row. Small ones (narrow panels,
            // dialogs) sit four to a row so they are not blown up and blurry.
            const isWide = image.width >= 1000;
            return (
              <figure key={image.src} className={isWide ? "case-shot case-shot-wide" : "case-shot"}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={isWide ? "(max-width: 760px) 100vw, 680px" : "(max-width: 760px) 50vw, 340px"}
                />
              </figure>
            );
          })}
        </div>
      )}

      <NextPage href={`/work/${next.slug}`} label="Next project" name={next.name} />
    </main>
  );
}
