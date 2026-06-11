import { normalizeAngle } from "@/lib/canvas";
import type { Preset } from "@/types/preset";

// Maps a slider value (-180..180) to the nearest continuous rotation via the shortest angular path.
const sliderValueToRotation = (
  currentRotation: number,
  sliderValue: number,
): number => {
  const currentNormalized = normalizeAngle(currentRotation);
  let delta = sliderValue - currentNormalized;

  if (delta > 180) {
    delta -= 360;
  } else if (delta < -180) {
    delta += 360;
  }

  return currentRotation + delta;
};

type ControlPanelProps = {
  className?: string;
  categories: string[];
  selectedCategory: string;
  servicesInCategory: string[];
  presets: Preset[];
  selectedService: string;
  selectedPresetId: string;
  imageFileName: string | null;
  zoom: number;
  rotation: number;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (category: string) => void;
  onServiceChange: (service: string) => void;
  onPresetChange: (presetId: string) => void;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
};

export function ControlPanel({
  className,
  categories,
  selectedCategory,
  servicesInCategory,
  presets,
  selectedService,
  selectedPresetId,
  imageFileName,
  zoom,
  rotation,
  onImageChange,
  onCategoryChange,
  onServiceChange,
  onPresetChange,
  onZoomChange,
  onRotationChange,
}: ControlPanelProps) {
  return (
    <section
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-4 ${className ?? ""}`}
    >
      <h2 className="mb-4 text-lg font-semibold">操作</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            画像を選択
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onClick={(event) => {
              event.currentTarget.value = "";
            }}
            onChange={onImageChange}
            className="block w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 text-sm text-zinc-300 file:mr-3 file:border-0 file:bg-zinc-700 file:px-3 file:py-2 file:text-zinc-100 hover:file:bg-zinc-600"
          />
          <p className="mt-2 text-xs text-zinc-500">PNG / JPG / WebP に対応</p>

          {imageFileName && (
            <p className="mt-2 break-all rounded-lg bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
              選択中: {imageFileName}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            カテゴリ
          </label>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            対象サービス
          </label>
          <select
            value={selectedService}
            onChange={(event) => onServiceChange(event.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-500"
          >
            {servicesInCategory.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            用途プリセット
          </label>
          <select
            value={selectedPresetId}
            onChange={(event) => onPresetChange(event.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-500"
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            ズーム
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            value={zoom}
            onChange={(event) => onZoomChange(Number(event.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs text-zinc-500">50%</span>
            <input
              type="number"
              min="50"
              max="1000"
              step="1"
              value={zoom}
              onChange={(event) => {
                const val = Number(event.target.value);
                if (!isNaN(val)) {
                  onZoomChange(Math.max(50, Math.min(1000, Math.round(val))));
                }
              }}
              className="w-20 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-center text-xs text-zinc-100 outline-none focus:border-sky-500"
            />
            <span className="text-xs text-zinc-500">1000%</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            回転
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            value={normalizeAngle(rotation)}
            onChange={(event) =>
              onRotationChange(
                sliderValueToRotation(rotation, Number(event.target.value)),
              )
            }
            className="w-full"
          />
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs text-zinc-500">-180°</span>
            <input
              type="number"
              step="1"
              value={rotation}
              onChange={(event) => {
                const val = Number(event.target.value);
                if (!isNaN(val)) {
                  onRotationChange(Math.round(val));
                }
              }}
              className="w-16 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-center text-xs text-zinc-100 outline-none focus:border-sky-500"
            />
            <span className="text-xs text-zinc-500">180°</span>
          </div>
        </div>
      </div>
    </section>
  );
}
