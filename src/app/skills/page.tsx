import type { Metadata } from "next";
import { NextPage, PageTitle } from "@/components/PageParts";
import { skills } from "@/data/projects";

export const metadata: Metadata = { title: "Skills" };

// Every skill in one flat list, for the two moving bands under the title.
const allSkills = skills.flatMap((group) => group.items);
const half = Math.ceil(allSkills.length / 2);
const bands = [allSkills.slice(0, half), allSkills.slice(half)];

export default function Skills() {
  return (
    <main className="page">
      <PageTitle>
        What I <em>work with</em>
      </PageTitle>

      {/* Two bands of skill names drifting in opposite directions. Each band
          holds its list twice so the loop has no visible seam. */}
      <div className="marquee fade-in" aria-hidden="true">
        {bands.map((band, index) => (
          <div key={index} className={index === 0 ? "marquee-track" : "marquee-track marquee-track-reverse"}>
            {[...band, ...band].map((skill, position) => (
              <span key={position}>{skill}</span>
            ))}
          </div>
        ))}
      </div>

      {/* The readable version: one row per group. The little wall of ribs
          has one rib per skill, and lights up when the row is hovered.
          The entrance of each row is animated in Motion.tsx. */}
      <dl className="skills">
        {skills.map((group) => (
          <div key={group.label} className="skill-row">
            <dt>
              <span className="skill-name">
                <span>{group.label}</span>
              </span>
              <span className="skill-ribs" aria-hidden="true">
                {group.items.map((item, index) => (
                  <i key={item} style={{ transitionDelay: `${index * 45}ms` }} />
                ))}
              </span>
            </dt>
            <dd>
              <ul className="pills">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <NextPage href="/about" label="Next" name="About" />
    </main>
  );
}
