import Image from "next/image";

// The photo on the About page. It starts hidden behind a wall of ribs,
// which lift off one after another when the page opens (animated in
// Motion.tsx). Hovering washes the photo in green and leans it in.

const RIBS = 10;

export default function Portrait() {
  return (
    <figure className="portrait">
      <div className="portrait-photo">
        <Image
          src="/about/vardhan.webp"
          alt="Vardhan in a white hoodie and cap, taking a mirror photo with his phone"
          width={680}
          height={880}
          sizes="(max-width: 760px) 100vw, 480px"
          priority
        />
      </div>
      <span className="portrait-tint" aria-hidden="true" />
      <span className="portrait-ribs" aria-hidden="true">
        {Array.from({ length: RIBS }, (_, index) => (
          <i key={index} />
        ))}
      </span>
    </figure>
  );
}
