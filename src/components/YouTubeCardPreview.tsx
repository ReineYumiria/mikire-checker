"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Preset } from "@/types/preset";

type YouTubeCardPreviewProps = {
  imageUrl: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  preset: Preset;
};

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export function YouTubeCardPreview({
  imageUrl,
  zoom,
  offsetX,
  offsetY,
  rotation,
  flipX,
  flipY,
  preset,
}: YouTubeCardPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    ctx.fillStyle = "#27272a";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const image = imageRef.current;
    if (!image) return;

    const { outputWidth, outputHeight } = preset;

    // ImageCanvas と同じ描画数式
    const baseScale = Math.min(
      outputWidth / image.naturalWidth,
      outputHeight / image.naturalHeight,
    );
    const drawWidth = image.naturalWidth * baseScale * (zoom / 100);
    const drawHeight = image.naturalHeight * baseScale * (zoom / 100);

    ctx.save();
    ctx.translate(outputWidth / 2 + offsetX, outputHeight / 2 + offsetY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  }, [zoom, offsetX, offsetY, rotation, flipX, flipY, preset]);

  useEffect(() => {
    if (!imageUrl) {
      imageRef.current = null;
      draw();
      return;
    }

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current = image;
      draw();
    };
    image.onerror = () => {
      imageRef.current = null;
      draw();
    };
    // draw は imageUrl 変化時の画像ロードのみをトリガーとするため依存から除外
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="mt-4 border-t border-zinc-800 pt-4">
      <p className="mb-3 text-sm font-medium text-zinc-300">
        サイト表示風プレビュー（YouTube ホーム風）
      </p>

      <div className="w-full max-w-xs">
        {/* サムネイル */}
        <div className="relative overflow-hidden rounded-xl">
          <canvas
            ref={canvasRef}
            className="block w-full"
            style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
          />
          {/* 再生時間バッジ（ダミー） */}
          <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
            10:23
          </span>
        </div>

        {/* カードメタ情報（ダミー） */}
        <div className="mt-3 flex gap-3">
          {/* チャンネルアイコン */}
          <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-600" />

          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-100">
              動画タイトルのサンプルテキスト（ダミー）
            </p>
            <p className="mt-1 text-xs text-zinc-400">チャンネル名（ダミー）</p>
            <p className="text-xs text-zinc-400">再生回数 12.3万回 · 3日前</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        実際の表示とは異なる場合があります。
      </p>
    </div>
  );
}
