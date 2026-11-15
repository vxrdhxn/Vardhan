// The large intro paragraph on Home.
//
// The text comes from `intro` in data/projects.ts and may contain two kinds
// of marker:
//   {ring} {nodes} {spark}   an inline symbol at that spot
//   [word]                   an underlined key word
//
// Every word and symbol is wrapped in its own span so Motion.tsx can light
// them up one by one as the paragraph scrolls past. The symbols also turn
// with the scroll, and the ruler on the right tracks progress.

const SYMBOLS: Record<string, React.ReactNode> = {
  // A rounded square with a round hole, standing on its corner.
  ring: (
    <path
      d="M12 1.2 22.8 12 12 22.8 1.2 12 12 1.2Zm0 5.3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
      fillRule="evenodd"
    />
  ),
  // Four connected nodes.
  nodes: (
    <>
      <circle cx="12" cy="5" r="4" />
      <circle cx="19" cy="12" r="4" />
      <circle cx="12" cy="19" r="4" />
      <circle cx="5" cy="12" r="4" />
    </>
  ),
  // A burst of twelve rays.
  spark: (
    <>
      {Array.from({ length: 12 }, (_, ray) => (
        <rect key={ray} x="11.1" y="1" width="1.8" height="8" rx="0.9" transform={`rotate(${ray * 30} 12 12)`} />
      ))}
    </>
  ),
};

export default function Intro({ text }: { text: string }) {
  const tokens = text.split(" ");

  return (
    <div className="intro-wrap">
      <p className="intro-text">
        {tokens.map((token, index) => {
          const symbol = token.match(/^\{(\w+)\}$/);
          if (symbol) {
            return (
              <span key={index} className="intro-word intro-symbol" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {SYMBOLS[symbol[1]]}
                </svg>{" "}
              </span>
            );
          }

          // "[pipelines]," becomes an underlined "pipelines" followed by ",".
          const keyWord = token.match(/^\[(.+)\](.*)$/);
          if (keyWord) {
            return (
              <span key={index} className="intro-word">
                <span className="intro-key">{keyWord[1]}</span>
                {keyWord[2]}{" "}
              </span>
            );
          }

          return (
            <span key={index} className="intro-word">
              {token}{" "}
            </span>
          );
        })}
      </p>

      {/* A ruler of ticks with a pointer that travels down as you read. */}
      <div className="intro-ruler" aria-hidden="true">
        <span className="intro-pointer" />
      </div>
    </div>
  );
}
