// Shared CTA button used by the commercial sections.
// Keeps hover, focus and sizing behaviour identical across the page.

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14.5px] font-semibold leading-none transition duration-200 ease-out active:translate-y-px';

const variants = {
  primary:
    'bg-mint text-obsidian shadow-[0_10px_30px_-12px_rgba(52,211,153,0.55)] hover:-translate-y-0.5 hover:bg-[#6ee7b7]',
  secondary:
    'border border-solid border-white/20 bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-mint hover:text-mint',
  outline:
    'border border-solid border-line bg-white text-ink hover:-translate-y-0.5 hover:border-emerald-600 hover:text-emerald-700',
};

export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
