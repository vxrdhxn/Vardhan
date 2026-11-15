import type { Metadata } from "next";
import { NextPage, PageTitle } from "@/components/PageParts";
import Projects from "@/components/Projects";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <main className="page">
      <PageTitle>
        Things I have <em>built</em>
      </PageTitle>
      <Projects />
      <NextPage href="/skills" label="Next" name="Skills" />
    </main>
  );
}
