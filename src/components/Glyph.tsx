// One small symbol per project, drawn to sit in front of its name on the
// Work page. Each is a simple shape that hints at what the project is.
// They use currentColor, so they always match the text beside them.

const GLYPHS: Record<string, React.ReactNode> = {
  // OpenPM: the columns of a Kanban board.
  openpm: (
    <>
      <rect x="2" y="2" width="5.5" height="20" rx="1" />
      <rect x="9.25" y="2" width="5.5" height="13" rx="1" />
      <rect x="16.5" y="2" width="5.5" height="8" rx="1" />
    </>
  ),
  // Orbit: a body with a satellite on its ring.
  orbit: (
    <>
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.6" cy="6.3" r="2.4" />
    </>
  ),
  // Sentinel: a shield.
  sentinel: <path d="M12 1.5 21 5v6.5c0 5.2-3.7 9.2-9 11-5.3-1.8-9-5.8-9-11V5l9-3.5Zm0 6.2a3 3 0 0 0-1.2 5.75V17h2.4v-3.55A3 3 0 0 0 12 7.7Z" fillRule="evenodd" />,
  // Kōntext: a Kubernetes-style heptagon wheel, simplified to a hexagon hub.
  kontext: (
    <path
      d="M12 1.5 21.1 6.75v10.5L12 22.5 2.9 17.25V6.75L12 1.5Zm0 6a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
      fillRule="evenodd"
    />
  ),
  // DevHive: three cells of a honeycomb.
  devhive: (
    <>
      <path d="M7 2.5 11 4.8v4.6L7 11.7 3 9.4V4.8L7 2.5Z" />
      <path d="M17 2.5 21 4.8v4.6l-4 2.3-4-2.3V4.8l4-2.3Z" />
      <path d="M12 11.3 16 13.6v4.6l-4 2.3-4-2.3v-4.6l4-2.3Z" />
    </>
  ),
  // ExpensePro: a pie chart with one slice pulled out.
  expensepro: (
    <>
      <path d="M11 3.05A9.5 9.5 0 1 0 20.95 13H11V3.05Z" />
      <path d="M13.5 1.6a9 9 0 0 1 8.9 8.9h-8.9V1.6Z" />
    </>
  ),
};

export default function Glyph({ slug }: { slug: string }) {
  const shape = GLYPHS[slug];
  if (!shape) return null;

  return (
    <svg className="glyph" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {shape}
    </svg>
  );
}
