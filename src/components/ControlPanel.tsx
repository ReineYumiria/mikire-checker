import type { Preset } from "@/types/preset";

type ControlPanelProps = {
  services: string[];
  presets: Preset[];
  selectedService: string;
  selectedPresetId: string;
  imageUrl: string | null;
  imageFileName: string | null;
  zoom: number;
  showSafeAreaGuide: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onServiceChange: (service: string) => void;
  onPresetChange: (presetId: string) => void;
  onZoomChange: (zoom: number) => void;
  onShowSafeAreaGuideChange: (show: boolean) => void;
  onResetPosition: () => void;
  onExportPng: () => void;
};

export function ControlPanel({
  services,
  presets,
  selectedService,
  selectedPresetId,
  imageUrl,
  imageFileName,
  zoom,
  showSafeAreaGuide,
  onImageChange,
  onServiceChange,
  onPresetChange,
  onZoomChange,
  onShowSafeAreaGuideChange,
  onResetPosition,
  onExportPng,
}: ControlPanelProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">操作</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            画像を選択
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
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
            対象サービス
          </label>
          <select
            value={selectedService}
            onChange={(event) => onServiceChange(event.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-500"
          >
            {services.map((service) => (
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
            max="500"
            value={zoom}
            onChange={(event) => onZoomChange(Number(event.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-500">
            <span>50%</span>
            <span>{zoom}%</span>
            <span>500%</span>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
          <input
            type="checkbox"
            checked={showSafeAreaGuide}
            onChange={(event) => onShowSafeAreaGuideChange(event.target.checked)}
            className="h-4 w-4 accent-sky-500"
          />
          <span>安全領域ガイドを表示</span>
        </label>

        <button
          type="button"
          onClick={onResetPosition}
          className="w-full rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
        >
          位置をリセット
        </button>

        <button
          type="button"
          onClick={onExportPng}
          disabled={!imageUrl}
          className="w-full rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
        >
          PNGで書き出し
        </button>
      </div>
    </section>
  );
}
