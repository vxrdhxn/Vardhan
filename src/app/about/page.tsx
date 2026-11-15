import type { Metadata } from "next";
import Intro from "@/components/Intro";
import { NextPage, PageTitle } from "@/components/PageParts";
import Portrait from "@/components/Portrait";
import { aboutMe, awards, education } from "@/data/projects";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <main className="page">
      <PageTitle>
        A bit <em>about me</em>
      </PageTitle>

      {/* Photo on the left, the story on the right. The text lights up word
          by word as it scrolls, the same way the Home intro does. */}
      <section className="intro about-me" aria-label="About me">
        <Portrait />
        <Intro text={aboutMe} />
      </section>

      <section className="about-facts">
        <h2 className="section-title">
          Where I have <em>been</em>
        </h2>

        <div className="background fade-in">
          <div>
            <h3>Education</h3>
            <ul className="facts">
              {education.map((entry) => (
                <li key={entry.school}>
                  <strong>{entry.school}</strong>
                  <span>{entry.detail}</span>
                  <span className="fact-meta">{entry.period}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Awards and certifications</h3>
            <ul className="facts">
              {awards.map((entry) => (
                <li key={entry.title}>
                  <strong>{entry.title}</strong>
                  <span className="fact-meta">{entry.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <NextPage href="/contact" label="Next" name="Contact" />
    </main>
  );
}
