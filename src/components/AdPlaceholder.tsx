type AdPlaceholderProps = {
  label?: string;
  className?: string;
};

export function AdPlaceholder({
  label = "広告枠（プレースホルダー）",
  className = "",
}: AdPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded border border-dashed border-zinc-700 bg-zinc-900/40 text-xs text-zinc-600 ${className}`}
    >
      {label}
    </div>
  );
}
