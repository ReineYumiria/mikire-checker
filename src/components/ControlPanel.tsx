import type { Preset } from "@/types/preset";

type ServiceGroup = { category: string; services: string[] };

type ControlPanelProps = {
  serviceGroups: ServiceGroup[];
  presets: Preset[];
  selectedService: string;
  selectedPresetId: string;
  imageUrl: string | null;
  imageFileName: string | null;
  zoom: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  showSafeAreaGuide: boolean;
  includeGuideInExport: boolean;
  saveMethod: "download" | "picker";
  pickerFallbackMessage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onServiceChange: (service: string) => void;
  onPresetChange: (presetId: string) => void;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  onFlipXChange: (flip: boolean) => void;
  onFlipYChange: (flip: boolean) => void;
  onShowSafeAreaGuideChange: (show: boolean) => void;
  onIncludeGuideInExportChange: (include: boolean) => void;
  onSaveMethodChange: (method: "download" | "picker") => void;
  onResetPosition: () => void;
  onExportPng: () => void;
};

export function ControlPanel({
  serviceGroups,
  presets,
  selectedService,
  selectedPresetId,
  imageUrl,
  imageFileName,
  zoom,
  rotation,
  flipX,
  flipY,
  showSafeAreaGuide,
  includeGuideInExport,
  saveMethod,
  pickerFallbackMessage,
  onImageChange,
  onServiceChange,
  onPresetChange,
  onZoomChange,
  onRotationChange,
  onFlipXChange,
  onFlipYChange,
  onShowSafeAreaGuideChange,
  onIncludeGuideInExportChange,
  onSaveMethodChange,
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
            対象サービス
          </label>
          <select
            value={selectedService}
            onChange={(event) => onServiceChange(event.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-500"
          >
            {serviceGroups.map(({ category, services }) => (
              <optgroup key={category} label={category}>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </optgroup>
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
            value={rotation}
            onChange={(event) => onRotationChange(Number(event.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs text-zinc-500">-180°</span>
            <input
              type="number"
              min="-180"
              max="180"
              step="1"
              value={rotation}
              onChange={(event) => {
                const val = Number(event.target.value);
                if (!isNaN(val)) {
                  onRotationChange(Math.max(-180, Math.min(180, Math.round(val))));
                }
              }}
              className="w-16 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-center text-xs text-zinc-100 outline-none focus:border-sky-500"
            />
            <span className="text-xs text-zinc-500">180°</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
            <input
              type="checkbox"
              checked={flipX}
              onChange={(event) => onFlipXChange(event.target.checked)}
              className="h-4 w-4 accent-sky-500"
            />
            <span>左右反転</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
            <input
              type="checkbox"
              checked={flipY}
              onChange={(event) => onFlipYChange(event.target.checked)}
              className="h-4 w-4 accent-sky-500"
            />
            <span>上下反転</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
            <input
              type="checkbox"
              checked={showSafeAreaGuide}
              onChange={(event) =>
                onShowSafeAreaGuideChange(event.target.checked)
              }
              className="h-4 w-4 accent-sky-500"
            />
            <span>安全領域ガイドを表示</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
            <input
              type="checkbox"
              checked={includeGuideInExport}
              onChange={(event) =>
                onIncludeGuideInExportChange(event.target.checked)
              }
              className="h-4 w-4 accent-sky-500"
            />
            <span>書き出しにガイドを含める</span>
          </label>
        </div>

        <button
          type="button"
          onClick={onResetPosition}
          className="w-full rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
        >
          位置をリセット
        </button>

        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">保存方法</p>
          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
              <input
                type="radio"
                name="saveMethod"
                value="download"
                checked={saveMethod === "download"}
                onChange={() => onSaveMethodChange("download")}
                className="accent-sky-500"
              />
              <span>通常ダウンロード</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
              <input
                type="radio"
                name="saveMethod"
                value="picker"
                checked={saveMethod === "picker"}
                onChange={() => onSaveMethodChange("picker")}
                className="accent-sky-500"
              />
              <span>保存先を選んで保存</span>
            </label>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={onExportPng}
            disabled={!imageUrl}
            className="w-full rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            PNGで書き出し
          </button>
          {pickerFallbackMessage && (
            <p className="mt-2 text-xs text-zinc-400">{pickerFallbackMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
