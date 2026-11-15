import Glyph from "@/components/Glyph";
import { TransitionLink } from "@/components/PageTransition";
import { projects } from "@/data/projects";

// The Work list. Each row is one project: a short label on the left, the
// name with its symbol in the middle, and its state on the right.
export default function Projects() {
  return (
    <ul className="projects fade-in">
      {projects.map((project) => (
        <li key={project.slug} className="project">
          <TransitionLink className="project-head" href={`/work/${project.slug}`} data-cursor="Open">
            <span className="project-side">{project.kind}</span>
            <span className="project-name">
              <Glyph slug={project.slug} />
              {project.name}
            </span>
            <span className="project-side project-side-end">{project.status ?? (project.links ? "Live" : "Built")}</span>
          </TransitionLink>
        </li>
      ))}
    </ul>
  );
}
