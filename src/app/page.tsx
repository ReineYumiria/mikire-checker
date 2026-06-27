"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { ControlPanelAdjustments } from "@/components/ControlPanelAdjustments";
import { ImageCanvas, type ImageCanvasHandle } from "@/components/ImageCanvas";
import { AdSlot } from "@/components/AdSlot";
import { CircleIconPreview } from "@/components/CircleIconPreview";
import { PresetInfoPanel } from "@/components/PresetInfoPanel";
import { YouTubeCardPreview } from "@/components/YouTubeCardPreview";
import { presets, serviceCategories } from "@/data/presets";
import { rotateOffset } from "@/lib/canvas";

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

  const handleRotationChange = (nextRotation: number) => {
    const delta = nextRotation - rotation;

    if (delta !== 0) {
      const rotated = rotateOffset(offsetX, offsetY, delta);
      setOffsetX(rotated.offsetX);
      setOffsetY(rotated.offsetY);
    }

    setRotation(nextRotation);
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
          className="lg:col-start-1 lg:row-start-1"
          categories={serviceGroups.map((g) => g.category)}
          selectedCategory={selectedCategory}
          servicesInCategory={servicesInCategory}
          presets={servicePresets}
          selectedService={selectedService}
          selectedPresetId={selectedPresetId}
          imageFileName={imageFileName}
          zoom={zoom}
          rotation={rotation}
          onImageChange={handleImageChange}
          onCategoryChange={handleCategoryChange}
          onServiceChange={handleServiceChange}
          onPresetChange={handlePresetChange}
          onZoomChange={handleZoomChange}
          onRotationChange={handleRotationChange}
        />

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 lg:col-start-2 lg:row-start-1 lg:row-span-2">
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

        <ControlPanelAdjustments
          className="lg:col-start-1 lg:row-start-2"
          imageUrl={imageUrl}
          flipX={flipX}
          flipY={flipY}
          showSafeAreaGuide={showSafeAreaGuide}
          includeGuideInExport={includeGuideInExport}
          saveMethod={saveMethod}
          pickerFallbackMessage={pickerFallbackMessage}
          onFlipXChange={setFlipX}
          onFlipYChange={setFlipY}
          onShowSafeAreaGuideChange={setShowSafeAreaGuide}
          onIncludeGuideInExportChange={setIncludeGuideInExport}
          onSaveMethodChange={setSaveMethod}
          onResetPosition={resetView}
          onExportPng={handleExportPng}
        />

        <div className="flex flex-col gap-4 lg:col-start-3 lg:row-start-1 lg:row-span-2">
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
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">
            見切れチェッカーでできること
          </h2>
          <p className="mb-8 leading-relaxed text-zinc-400">
            見切れチェッカーは、YouTube、X（旧Twitter）、Discordなどに投稿する画像が、実際の表示枠で切れて見えないかを事前に確認するためのWebツールです。
            サムネイル、ヘッダー、プロフィール画像、バナー、ストア画像などの用途に合わせて、画像の位置・ズーム・回転を調整し、必要に応じてPNGとして書き出せます。
          </p>

          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="mb-2 text-sm font-semibold text-zinc-200">
                表示範囲を確認
              </p>
              <p className="text-sm leading-relaxed text-zinc-500">
                各プリセットの出力サイズに合わせて、画像がどのように収まるかをプレビューできます。顔、ロゴ、文字、商品画像など、切れて困る要素の配置確認に役立ちます。
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="mb-2 text-sm font-semibold text-zinc-200">
                安全領域を確認
              </p>
              <p className="text-sm leading-relaxed text-zinc-500">
                ヘッダーや丸型アイコンなど、端末や表示場所によって見切れやすい画像には安全領域ガイドを表示できます。重要要素を中央寄りに置く判断材料になります。
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="mb-2 text-sm font-semibold text-zinc-200">
                PNGとして書き出し
              </p>
              <p className="text-sm leading-relaxed text-zinc-500">
                調整した結果をPNGとして保存できます。ガイド付きPNGは、投稿前の確認やチーム内共有用のチェック画像として利用できます。
              </p>
            </div>
          </div>

          <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <section>
              <h3 className="mb-3 text-lg font-semibold text-zinc-100">
                使い方3ステップ
              </h3>
              <ol className="space-y-3 text-sm leading-relaxed text-zinc-400">
                <li>
                  <span className="font-semibold text-zinc-200">1. 画像をアップロード</span>
                  <br />
                  確認したいPNG、JPG、WebP画像を選択します。
                </li>
                <li>
                  <span className="font-semibold text-zinc-200">2. サービスと用途を選ぶ</span>
                  <br />
                  YouTubeサムネイル、Twitterヘッダー、Discordアイコンなど、目的に近いプリセットを選択します。
                </li>
                <li>
                  <span className="font-semibold text-zinc-200">3. 位置を整えて書き出す</span>
                  <br />
                  ドラッグ、ズーム、回転で見え方を調整し、安全領域を確認してからPNGを書き出します。
                </li>
              </ol>
              <Link href="/how-to-use" className="mt-4 inline-block text-sm text-sky-400 hover:underline">
                詳しい使い方を見る →
              </Link>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-zinc-100">
                対応プリセットについて
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-zinc-400">
                プリセットは、サービス名と用途ごとに出力サイズや安全領域の目安をまとめたものです。SNSのプロフィール画像、動画サムネイル、配信用バナー、ゲームストア画像など、用途によって必要な比率や見切れやすい場所が異なります。
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                代表的には、YouTubeサムネイル、X（旧Twitter）ヘッダー、Discordサーバーアイコン、Steamカプセル画像、pixivやnoteのカバー画像などに対応しています。サービス側の表示仕様は変わることがあるため、最終投稿前には実際の画面でも確認してください。
              </p>
            </section>
          </div>

          <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <h3 className="mb-3 text-lg font-semibold text-zinc-100">
              画像の扱いとプライバシー
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              アップロードした画像はサーバーへ送信されません。画像の読み込み、Canvas上のプレビュー、位置調整、PNG書き出しは、すべて利用中のブラウザ内で処理されます。公開前のサムネイル案やプロフィール画像を確認したい場合でも、サイト側に画像ファイルを保存しない設計です。
            </p>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <section>
              <h3 className="mb-3 text-lg font-semibold text-zinc-100">
                よくある質問
              </h3>
              <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
                <div>
                  <p className="font-semibold text-zinc-200">
                    画像はどこかにアップロードされますか？
                  </p>
                  <p>
                    いいえ。選択した画像はブラウザ内で読み込まれ、サーバーには送信されません。
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-zinc-200">
                    安全領域は公式仕様ですか？
                  </p>
                  <p>
                    一部は公式推奨サイズを参考にしつつ、見切れ確認用の目安として設定しています。端末差やサービス側の変更があるため、最終確認には実機表示も併用してください。
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-zinc-200">
                    スマホでも使えますか？
                  </p>
                  <p>
                    スマホでも画像選択、ドラッグ、ピンチズーム、PNG書き出しを利用できます。大きな画像を扱う場合は、端末のメモリ状況によって動作が重くなることがあります。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-zinc-100">
                関連ガイド
              </h3>
              <div className="grid gap-3 text-sm">
                <Link href="/guides/youtube-thumbnail-safe-area" className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100">
                  YouTubeサムネイルの見切れ確認ガイド
                </Link>
                <Link href="/guides/twitter-header-safe-area" className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100">
                  Twitterヘッダーの安全領域ガイド
                </Link>
                <Link href="/guides/discord-profile-image" className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100">
                  Discordアイコン・バナーの見切れ確認
                </Link>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/about" className="text-sky-400 hover:underline">
              このサイトについて →
            </Link>
            <Link href="/contact" className="text-sky-400 hover:underline">
              お問い合わせ →
            </Link>
            <Link href="/privacy" className="text-sky-400 hover:underline">
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
          <Link href="/contact" className="hover:text-zinc-300">
            お問い合わせ
          </Link>
          <span>/</span>
          <Link href="/guides/youtube-thumbnail-safe-area" className="hover:text-zinc-300">
            ガイド
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
