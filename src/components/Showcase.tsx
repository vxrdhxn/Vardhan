import Image from "next/image";
import Curtain from "@/components/Curtain";
import Glyph from "@/components/Glyph";
import { TransitionLink } from "@/components/PageTransition";
import type { Project } from "@/data/projects";

// One project shown as a board of five tiles, laid out the same way for
// every project:
//   1. wide  : the first screenshot, or live ribs with the project's symbol
//   2. tall  : the one-line description
//   3. small : what it is built with
//   4. small : a key point
//   5. small : the second screenshot, or the symbol on a still wall of ribs
//
// The reveal animation for these tiles lives in Motion.tsx.

type Shot = NonNullable<Project["images"]>[number];

function ShotTile({ shot, slot }: { shot: Shot; slot: number }) {
  return (
    <div className={`tile tile-${slot} tile-shot`}>
      <div className="tile-inner">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={slot === 1 ? "(max-width: 760px) 100vw, 900px" : "(max-width: 760px) 50vw, 450px"}
        />
      </div>
    </div>
  );
}

export default function Showcase({ project, index }: { project: Project; index: number }) {
  // The board shows two screenshots at most. The project page shows them all.
  const shots = (project.images ?? []).slice(0, 2);
  const href = `/work/${project.slug}`;

  return (
    <article className="showcase">
      <header className="showcase-head">
        <div>
          <span className="showcase-kind">{project.kind}</span>
          <h3 className="showcase-name">{project.name}</h3>
        </div>
        <TransitionLink className="text-link" href={href}>
          View project
        </TransitionLink>
      </header>

      {/* The board itself is one big link for mouse users. Keyboard and
          screen-reader users already have "View project" above. */}
      <TransitionLink className="tiles" href={href} data-cursor="Open" tabIndex={-1} aria-hidden="true">
        {/* 1. Wide tile: first screenshot, or live ribs with the symbol. */}
        {shots[0] ? (
          <ShotTile shot={shots[0]} slot={1} />
        ) : (
          <div className="tile tile-1 tile-ribs">
            <div className="tile-inner">
              <Curtain variant="band" seed={index + 1} />
              <Glyph slug={project.slug} />
            </div>
          </div>
        )}

        {/* 2. Tall tile: the one-line description. */}
        <div className="tile tile-2 tile-text">
          <div className="tile-inner">
            <p className="tile-tagline">{project.tagline}</p>
          </div>
        </div>

        {/* 3. What it is built with. */}
        <div className="tile tile-3 tile-text">
          <div className="tile-inner">
            <ul className="pills">
              {project.stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. The first key point. */}
        <div className="tile tile-4 tile-text">
          <div className="tile-inner">
            <p className="tile-point">{project.points[0]}</p>
          </div>
        </div>

        {/* 5. Second screenshot, or the symbol on a still wall of ribs. */}
        {shots[1] ? (
          <ShotTile shot={shots[1]} slot={5} />
        ) : (
          <div className="tile tile-5 tile-still">
            <div className="tile-inner">
              <Glyph slug={project.slug} />
            </div>
          </div>
        )}
      </TransitionLink>
    </article>
  );
}
