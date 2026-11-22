import { sectionIds } from '../data/portfolio';

export default function SectionDots() {
  return (
    <div className="dots" id="dots" aria-hidden="true">
      {sectionIds.map((id) => (
        <a key={id} href={`#${id}`} data-go tabIndex={-1} />
      ))}
    </div>
  );
}
