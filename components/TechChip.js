import { TECH } from '../lib/icons';

export default function TechChip({ id, label }) {
  const { Icon, color } = TECH[id] ?? TECH.fallback;
  return (
    <span className="chip tech" style={{ '--ic': color }}>
      <Icon aria-hidden="true" />
      {label}
    </span>
  );
}
