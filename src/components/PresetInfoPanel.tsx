import type { Preset } from "@/types/preset";

type PresetInfoPanelProps = {
  preset: Preset;
};

export function PresetInfoPanel({ preset }: PresetInfoPanelProps) {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">プリセット情報</h2>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-zinc-500">用途</p>
          <p className="text-base font-semibold">
            {preset.service} / {preset.name}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">出力サイズ</p>
          <p className="text-base">
            {preset.outputWidth} × {preset.outputHeight}px
          </p>
        </div>

        {preset.safeArea ? (
          <>
            <div>
              <p className="text-xs text-zinc-500">安全領域</p>
              <p className="text-base">
                {preset.safeArea.width} × {preset.safeArea.height}px
              </p>
            </div>

            <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-sm leading-6 text-zinc-300">
              <p>水色の枠内が安全領域です。</p>
              <p className="mt-1">
                暗く表示される部分は、見切れや非推奨表示になりやすい領域です。
              </p>
            </div>
          </>
        ) : (
          <div>
            <p className="text-xs text-zinc-500">安全領域</p>
            <p className="text-sm text-zinc-400">
              このプリセットでは未設定です。
            </p>
          </div>
        )}

        <div>
          <p className="text-xs text-zinc-500">説明</p>
          <p className="mt-1 text-sm leading-6 text-zinc-300">
            {preset.description}
          </p>
        </div>

        {preset.notes && preset.notes.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500">注意点</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-300">
              {preset.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
