"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { presets } from "@/data/presets";

export default function Home() {
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerYRef = useRef(0);

  const selectedPreset = useMemo(() => {
    return presets.find((preset) => preset.id === selectedPresetId) ?? presets[0];
  }, [selectedPresetId]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください。");
      return;
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const nextImageUrl = URL.createObjectURL(file);
    setImageUrl(nextImageUrl);
    setImageFileName(file.name);
    setZoom(100);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!imageUrl) {
      return;
    }

    isDraggingRef.current = true;
    lastPointerXRef.current = event.clientX;
    lastPointerYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - lastPointerXRef.current;
    const deltaY = event.clientY - lastPointerYRef.current;

    setOffsetX((current) => current + deltaX);
    setOffsetY((current) => current + deltaY);

    lastPointerXRef.current = event.clientX;
    lastPointerYRef.current = event.clientY;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleResetPosition = () => {
    setZoom(100);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            見切れチェッカー
          </h1>
          <p className="text-sm text-zinc-400">
            画像はサーバーに送らず、ブラウザ内だけで処理します。
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 lg:grid-cols-[280px_1fr_320px]">
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
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 text-sm text-zinc-300 file:mr-3 file:border-0 file:bg-zinc-700 file:px-3 file:py-2 file:text-zinc-100 hover:file:bg-zinc-600"
              />
              <p className="mt-2 text-xs text-zinc-500">
                PNG / JPG / WebP に対応
              </p>

              {imageFileName && (
                <p className="mt-2 break-all rounded-lg bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
                  選択中: {imageFileName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                プリセット
              </label>
              <select
                value={selectedPresetId}
                onChange={(event) => setSelectedPresetId(event.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-500"
              >
                {presets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.service} / {preset.name}
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
                onChange={(event) => setZoom(Number(event.target.value))}
                className="w-full"
              />
              <div className="mt-1 flex justify-between text-xs text-zinc-500">
                <span>50%</span>
                <span>{zoom}%</span>
                <span>500%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPosition}
              className="w-full rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
            >
              位置をリセット
            </button>

            <button
              type="button"
              className="w-full rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400"
            >
              PNGで書き出し
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">プレビュー</h2>
              <p className="text-sm text-zinc-400">
                {selectedPreset.outputWidth} × {selectedPreset.outputHeight}
              </p>
            </div>
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              {selectedPreset.service}
            </span>
          </div>

          <div className="flex min-h-[520px] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-6">
            <div
              className={`relative w-full max-w-3xl overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow-2xl ${
                imageUrl ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              style={{
                aspectRatio: `${selectedPreset.outputWidth} / ${selectedPreset.outputHeight}`,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageFileName ?? "アップロード画像"}
                  draggable={false}
                  className="h-full w-full select-none object-contain will-change-transform"
                  style={{
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom / 100})`,
                    transformOrigin: "center center",
                  }}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className="text-sm font-medium text-zinc-300">
                      ここに画像プレビューを表示
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      画像を選択すると、この枠内に表示されます
                    </p>
                  </div>
                </div>
              )}

              {selectedPreset.safeArea && (
                <div
                  className="pointer-events-none absolute border-2 border-sky-400 bg-sky-400/10"
                  style={{
                    left: `${(selectedPreset.safeArea.x / selectedPreset.outputWidth) * 100}%`,
                    top: `${(selectedPreset.safeArea.y / selectedPreset.outputHeight) * 100}%`,
                    width: `${(selectedPreset.safeArea.width / selectedPreset.outputWidth) * 100}%`,
                    height: `${(selectedPreset.safeArea.height / selectedPreset.outputHeight) * 100}%`,
                  }}
                >
                  <div className="absolute left-2 top-2 rounded bg-sky-400 px-2 py-1 text-xs font-semibold text-zinc-950">
                    SAFE AREA
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-4 text-lg font-semibold">プリセット情報</h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500">用途</p>
              <p className="text-base font-semibold">
                {selectedPreset.service} / {selectedPreset.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">出力サイズ</p>
              <p className="text-base">
                {selectedPreset.outputWidth} × {selectedPreset.outputHeight}px
              </p>
            </div>

            {selectedPreset.safeArea ? (
              <div>
                <p className="text-xs text-zinc-500">安全領域</p>
                <p className="text-base">
                  {selectedPreset.safeArea.width} ×{" "}
                  {selectedPreset.safeArea.height}px
                </p>
              </div>
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
                {selectedPreset.description}
              </p>
            </div>

            {selectedPreset.notes && selectedPreset.notes.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500">注意点</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-300">
                  {selectedPreset.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
