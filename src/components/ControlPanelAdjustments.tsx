type ControlPanelAdjustmentsProps = {
  className?: string;
  imageUrl: string | null;
  flipX: boolean;
  flipY: boolean;
  showSafeAreaGuide: boolean;
  includeGuideInExport: boolean;
  saveMethod: "download" | "picker";
  pickerFallbackMessage: string | null;
  onFlipXChange: (flip: boolean) => void;
  onFlipYChange: (flip: boolean) => void;
  onShowSafeAreaGuideChange: (show: boolean) => void;
  onIncludeGuideInExportChange: (include: boolean) => void;
  onSaveMethodChange: (method: "download" | "picker") => void;
  onResetPosition: () => void;
  onExportPng: () => void;
};

export function ControlPanelAdjustments({
  className,
  imageUrl,
  flipX,
  flipY,
  showSafeAreaGuide,
  includeGuideInExport,
  saveMethod,
  pickerFallbackMessage,
  onFlipXChange,
  onFlipYChange,
  onShowSafeAreaGuideChange,
  onIncludeGuideInExportChange,
  onSaveMethodChange,
  onResetPosition,
  onExportPng,
}: ControlPanelAdjustmentsProps) {
  return (
    <section
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-4 ${className ?? ""}`}
    >
      <div className="space-y-5">
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
