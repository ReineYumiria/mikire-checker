"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import {
  ImageCanvas,
  type ImageCanvasHandle,
} from "@/components/ImageCanvas";
import { PresetInfoPanel } from "@/components/PresetInfoPanel";
import { presets } from "@/data/presets";

export default function Home() {
  const services = useMemo(() => {
    return Array.from(new Set(presets.map((preset) => preset.service)));
  }, []);

  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [showSafeAreaGuide, setShowSafeAreaGuide] = useState(true);

  const imageCanvasRef = useRef<ImageCanvasHandle | null>(null);

  const servicePresets = useMemo(() => {
    return presets.filter((preset) => preset.service === selectedService);
  }, [selectedService]);

  const selectedPreset = useMemo(() => {
    return (
      presets.find((preset) => preset.id === selectedPresetId) ??
      servicePresets[0] ??
      presets[0]
    );
  }, [selectedPresetId, servicePresets]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const resetView = () => {
    setZoom(100);
    setOffsetX(0);
    setOffsetY(0);
  };

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
    resetView();
  };

  const handleServiceChange = (service: string) => {
    const nextPreset = presets.find((preset) => preset.service === service);

    if (!nextPreset) {
      return;
    }

    setSelectedService(service);
    setSelectedPresetId(nextPreset.id);
    resetView();
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    resetView();
  };

  const handleExportPng = () => {
    const baseName = imageFileName
      ? imageFileName.replace(/\.[^/.]+$/, "")
      : "mikire-checker";

    const fileName = `${baseName}_${selectedPreset.id}.png`;

    imageCanvasRef.current?.exportPng(fileName);
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
        <ControlPanel
          services={services}
          presets={servicePresets}
          selectedService={selectedService}
          selectedPresetId={selectedPresetId}
          imageUrl={imageUrl}
          imageFileName={imageFileName}
          zoom={zoom}
          showSafeAreaGuide={showSafeAreaGuide}
          onImageChange={handleImageChange}
          onServiceChange={handleServiceChange}
          onPresetChange={handlePresetChange}
          onZoomChange={setZoom}
          onShowSafeAreaGuideChange={setShowSafeAreaGuide}
          onResetPosition={resetView}
          onExportPng={handleExportPng}
        />

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
            <ImageCanvas
              ref={imageCanvasRef}
              preset={selectedPreset}
              imageUrl={imageUrl}
              imageFileName={imageFileName}
              zoom={zoom}
              offsetX={offsetX}
              offsetY={offsetY}
              showSafeAreaGuide={showSafeAreaGuide}
              setZoom={setZoom}
              setOffsetX={setOffsetX}
              setOffsetY={setOffsetY}
            />
          </div>
        </section>

        <PresetInfoPanel preset={selectedPreset} />
      </div>
    </main>
  );
}
