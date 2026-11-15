import type { Metadata } from "next";
import Curtain from "@/components/Curtain";
import { PageTitle } from "@/components/PageParts";
import { person } from "@/data/projects";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="contact-wrap">
      {/* The same flowing wall of ribs as the Home hero, with its own
          pattern of light. It is kept bright so the dark text stays
          readable wherever the light moves. */}
      <div className="contact-backdrop" aria-hidden="true">
        <Curtain variant="wall" seed={7} bright />
        <div className="hero-fade" />
      </div>

      <main className="page page-contact">
        <PageTitle>
          Get in <em>touch</em>
        </PageTitle>
        <a className="contact-email fade-in" href={`mailto:${person.email}`} data-cursor="Write">
          {person.email}
        </a>
        <ul className="contact-links fade-in">
          {person.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
