# Portfolio

Personal portfolio site of Sri Vardhan Mothukuri: projects, skills, background and contact.

## Stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- Tailwind CSS, plus hand-written CSS in `src/app/globals.css`
- [GSAP](https://gsap.com) and ScrollTrigger for animation
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- Fonts: Bricolage Grotesque and Instrument Serif, bundled through Fontsource

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To check the production build:

```bash
npm run build
npm start
```

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, intro, and a board for each project |
| `/work` | The list of projects |
| `/work/[slug]` | One project: summary, stack, key points, screenshots, links |
| `/skills` | Skills, grouped |
| `/about` | About me, education, awards and certifications |
| `/contact` | Email and profile links |

## Changing the content

Almost all of the text lives in one file: `src/data/projects.ts`.

- `heroLines` and `heroNotes`: the headline on Home and the two lines under it
- `intro` and `aboutMe`: the large paragraphs on Home and About.
  Write `{ring}`, `{nodes}` or `{spark}` to drop in a small symbol, and `[word]` to underline a word.
- `projects`: one entry per project. Add screenshots by putting the files in
  `public/projects/<slug>/` and listing them under `images`.
- `skills`, `education`, `awards`: the lists on Skills and About

## Where things are

```
src/
  app/            pages, the layout and globals.css
  components/     the building blocks
    Curtain.tsx         the flowing wall of green ribs
    Preloader.tsx       the startup sequence
    PageTransition.tsx  the rib wipe between pages
    Motion.tsx          scroll and entrance animations
    Cursor.tsx          the animated cursor disc
    Showcase.tsx        a project board on Home
  data/projects.ts      all the content
public/           images
```

## Tuning the look

- Colours and font sizes: the variables at the top of `src/app/globals.css`
- How fast the background light flows: `FLOW_SPEED` in `src/components/Curtain.tsx`

## Deploy

The site is built for [Vercel](https://vercel.com): import the GitHub repository and deploy.
No environment variables or extra configuration are needed.
