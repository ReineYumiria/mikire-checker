"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { ImageCanvas, type ImageCanvasHandle } from "@/components/ImageCanvas";
import { AdSlot } from "@/components/AdSlot";
import { CircleIconPreview } from "@/components/CircleIconPreview";
import { PresetInfoPanel } from "@/components/PresetInfoPanel";
import { YouTubeCardPreview } from "@/components/YouTubeCardPreview";
import { presets, serviceCategories } from "@/data/presets";

const CATEGORY_ORDER = [
  "SNS",
  "コミュニケーション",
  "動画 / 配信",
  "創作 / 投稿",
  "クリエイター支援 / ファンコミュニティ",
  "音楽",
  "ゲーム / ストア",
  "開発 / その他",
];

export default function Home() {
  const services = useMemo(() => {
    return Array.from(new Set(presets.map((preset) => preset.service)));
  }, []);

  const serviceGroups = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    for (const service of services) {
      const category = serviceCategories[service] ?? "開発 / その他";
      (grouped[category] ??= []).push(service);
    }
    return CATEGORY_ORDER.filter((cat) => grouped[cat]?.length > 0).map(
      (cat) => ({ category: cat, services: grouped[cat] }),
    );
  }, [services]);

  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [showSafeAreaGuide, setShowSafeAreaGuide] = useState(true);
  const [includeGuideInExport, setIncludeGuideInExport] = useState(false);
  const [saveMethod, setSaveMethod] = useState<"download" | "picker">("download");
  const [pickerFallbackMessage, setPickerFallbackMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(
    () => serviceCategories[services[0]] ?? CATEGORY_ORDER[0],
  );

  const imageCanvasRef = useRef<ImageCanvasHandle | null>(null);

  const servicesInCategory = useMemo(() => {
    return serviceGroups.find((g) => g.category === selectedCategory)?.services ?? [];
  }, [serviceGroups, selectedCategory]);

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
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
  };

  const handleZoomChange = (nextZoom: number) => {
    const zoomRatio = nextZoom / zoom;
    setOffsetX((current) => current * zoomRatio);
    setOffsetY((current) => current * zoomRatio);
    setZoom(nextZoom);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isSupportedImage =
      file.type.startsWith("image/") ||
      /\.(png|jpe?g|webp)$/i.test(file.name);

    if (!isSupportedImage) {
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

  const handleCategoryChange = (category: string) => {
    const group = serviceGroups.find((g) => g.category === category);
    if (!group || group.services.length === 0) return;
    const nextService = group.services[0];
    const nextPreset = presets.find((p) => p.service === nextService);
    if (!nextPreset) return;
    setSelectedCategory(category);
    setSelectedService(nextService);
    setSelectedPresetId(nextPreset.id);
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
    setPickerFallbackMessage(null);

    const baseName = imageFileName
      ? imageFileName.replace(/\.[^/.]+$/, "")
      : "mikire-checker";

    const guideSuffix = includeGuideInExport ? "_guide" : "";
    const fileName = `${baseName}_${selectedPreset.id}${guideSuffix}.png`;

    imageCanvasRef.current?.exportPng(fileName, {
      includeSafeAreaGuide: includeGuideInExport,
      saveMethod,
      onPickerFallback: () => {
        setPickerFallbackMessage(
          "このブラウザでは保存先選択に対応していないため、通常ダウンロードしました。",
        );
      },
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            見切れチェッカー
          </h1>
          <p className="text-sm text-zinc-400">
            画像はサーバーに送信されず、ブラウザ内だけで処理されます。
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 lg:grid-cols-[280px_1fr_320px]">
        <ControlPanel
          categories={serviceGroups.map((g) => g.category)}
          selectedCategory={selectedCategory}
          servicesInCategory={servicesInCategory}
          presets={servicePresets}
          selectedService={selectedService}
          selectedPresetId={selectedPresetId}
          imageUrl={imageUrl}
          imageFileName={imageFileName}
          zoom={zoom}
          rotation={rotation}
          flipX={flipX}
          flipY={flipY}
          showSafeAreaGuide={showSafeAreaGuide}
          includeGuideInExport={includeGuideInExport}
          saveMethod={saveMethod}
          pickerFallbackMessage={pickerFallbackMessage}
          onImageChange={handleImageChange}
          onCategoryChange={handleCategoryChange}
          onServiceChange={handleServiceChange}
          onPresetChange={handlePresetChange}
          onZoomChange={handleZoomChange}
          onRotationChange={setRotation}
          onFlipXChange={setFlipX}
          onFlipYChange={setFlipY}
          onShowSafeAreaGuideChange={setShowSafeAreaGuide}
          onIncludeGuideInExportChange={setIncludeGuideInExport}
          onSaveMethodChange={setSaveMethod}
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

          <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-3 sm:min-h-[520px] sm:p-6">
            <ImageCanvas
              ref={imageCanvasRef}
              preset={selectedPreset}
              imageUrl={imageUrl}
              imageFileName={imageFileName}
              zoom={zoom}
              offsetX={offsetX}
              offsetY={offsetY}
              rotation={rotation}
              flipX={flipX}
              flipY={flipY}
              showSafeAreaGuide={showSafeAreaGuide}
              setZoom={setZoom}
              setOffsetX={setOffsetX}
              setOffsetY={setOffsetY}
              setRotation={setRotation}
            />
          </div>

          {selectedPreset.id === "youtube-thumbnail" && (
            <YouTubeCardPreview
              imageUrl={imageUrl}
              zoom={zoom}
              offsetX={offsetX}
              offsetY={offsetY}
              rotation={rotation}
              flipX={flipX}
              flipY={flipY}
              preset={selectedPreset}
            />
          )}

          {selectedPreset.guideShape === "circle" && (
            <CircleIconPreview
              imageUrl={imageUrl}
              zoom={zoom}
              offsetX={offsetX}
              offsetY={offsetY}
              rotation={rotation}
              flipX={flipX}
              flipY={flipY}
              preset={selectedPreset}
            />
          )}
        </section>

        <div className="flex flex-col gap-4">
          <PresetInfoPanel preset={selectedPreset} />
          <AdSlot
            slotId={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
            className="h-[250px] w-full"
            label="広告枠（右カラムプレースホルダー）"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-4">
        <AdSlot
          slotId={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER}
          className="h-[90px] w-full"
          label="広告枠（ページ下部プレースホルダー）"
        />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-8">
          <h2 className="mb-2 text-lg font-semibold text-zinc-100">
            見切れチェッカーとは
          </h2>
          <p className="mb-6 leading-relaxed text-zinc-400">
            画像をアップロードして、各サービスの表示範囲・安全領域をブラウザ内で確認できる無料のWebツールです。
            YouTubeサムネイル、X（旧Twitter）ヘッダー、Discordアイコン、Steamカプセル画像など、創作・配信・ゲーム・SNS向けのプリセットを多数用意しています。
          </p>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-zinc-300">主な機能</p>
              <ul className="space-y-1 text-sm text-zinc-500">
                <li>・ 安全領域ガイド表示（矩形 / 円形）</li>
                <li>・ 画像のドラッグ位置調整</li>
                <li>・ ズーム調整（ホイール・ピンチ対応）</li>
                <li>・ PNG書き出し / ガイド付きPNG書き出し</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-zinc-300">プライバシー</p>
              <p className="text-sm text-zinc-500">
                アップロードした画像はサーバーに送信されません。画像の読み込み・プレビュー・書き出しはすべてブラウザ内で処理されます。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/how-to-use"
              className="text-sky-400 hover:underline"
            >
              使い方を見る →
            </Link>
            <Link
              href="/about"
              className="text-sky-400 hover:underline"
            >
              対応サービス一覧 →
            </Link>
            <Link
              href="/privacy"
              className="text-sky-400 hover:underline"
            >
              プライバシーポリシー →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-4 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <Link href="/about" className="hover:text-zinc-300">
            About
          </Link>
          <span>/</span>
          <Link href="/how-to-use" className="hover:text-zinc-300">
            使い方
          </Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-zinc-300">
            プライバシーポリシー
          </Link>
          <span>/</span>
          <a
            href="https://github.com/ReineYumiria/mikire-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
        <p className="mx-auto mt-2 max-w-7xl text-zinc-600">
          画像はブラウザ内で処理されます
        </p>
      </footer>
    </main>
  );
}
