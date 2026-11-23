import { getIcon } from '../lib/icons';

export default function TechChip({ id, label }) {
  const Icon = getIcon(id);
  return (
    <span className="chip tech">
      <Icon aria-hidden="true" />
      {label}
    </span>
  );
}
