import Curtain from "@/components/Curtain";
import Intro from "@/components/Intro";
import { NextPage } from "@/components/PageParts";
import Showcase from "@/components/Showcase";
import { heroLines, heroNotes, intro, projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <header className="hero">
        <Curtain />
        <div className="hero-fade" aria-hidden="true" />

        <div className="hero-body">
          <h1 className="hero-title">
            {heroLines.map((line, index) => (
              <span key={line.text} className={`rise hero-line-${line.face} hero-line-${index + 1}`}>
                <span>{line.text}</span>
              </span>
            ))}
          </h1>

          <div className="hero-notes fade-in">
            {heroNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="section intro" aria-label="About">
          <Intro text={intro} />
        </section>

        <section className="section showcases" aria-label="Projects">
          <h2 className="section-title">
            What I have <em>built</em>
          </h2>
          {projects.map((project, index) => (
            <Showcase key={project.slug} project={project} index={index} />
          ))}
        </section>

        <NextPage href="/work" label="Next" name="Work" />
      </main>
    </>
  );
}
