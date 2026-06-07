"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Preset } from "@/types/preset";

type CircleIconPreviewProps = {
  imageUrl: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  preset: Preset;
};

const PREVIEW_SIZE = 160;

export function CircleIconPreview({
  imageUrl,
  zoom,
  offsetX,
  offsetY,
  preset,
}: CircleIconPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = PREVIEW_SIZE;
    canvas.height = PREVIEW_SIZE;
    ctx.clearRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);

    ctx.save();
    ctx.beginPath();
    ctx.arc(PREVIEW_SIZE / 2, PREVIEW_SIZE / 2, PREVIEW_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = "#3f3f46";
    ctx.fillRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);

    const image = imageRef.current;
    if (image) {
      const previewScale = PREVIEW_SIZE / preset.outputWidth;
      const baseScale = Math.min(
        preset.outputWidth / image.naturalWidth,
        preset.outputHeight / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * baseScale * (zoom / 100) * previewScale;
      const drawHeight = image.naturalHeight * baseScale * (zoom / 100) * previewScale;
      const drawX = (PREVIEW_SIZE - drawWidth) / 2 + offsetX * previewScale;
      const drawY = (PREVIEW_SIZE - drawHeight) / 2 + offsetY * previewScale;
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    }

    ctx.restore();
  }, [zoom, offsetX, offsetY, preset]);

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
      <p className="mb-3 text-sm font-medium text-zinc-300">円形表示プレビュー</p>
      <div className="flex items-center gap-4">
        <canvas
          ref={canvasRef}
          style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
          className="block shrink-0"
        />
        <p className="text-xs text-zinc-500">
          実際の表示とは異なる場合があります。
        </p>
      </div>
    </div>
  );
}
