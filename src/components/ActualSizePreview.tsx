"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Preset, PreviewSize } from "@/types/preset";

type ActualSizePreviewProps = {
  imageUrl: string | null;
  preset: Preset;
  zoom: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
};

export function ActualSizePreview({
  imageUrl,
  preset,
  zoom,
  offsetX,
  offsetY,
  rotation,
  flipX,
  flipY,
}: ActualSizePreviewProps) {
  const canvasRefs = useRef(new Map<string, HTMLCanvasElement>());
  const imageRef = useRef<HTMLImageElement | null>(null);

  const previewSizes = useMemo(() => preset.previewSizes ?? [], [preset.previewSizes]);

  const setCanvasRef = (key: string) => (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      canvasRefs.current.set(key, canvas);
    } else {
      canvasRefs.current.delete(key);
    }
  };

  const drawPreview = useCallback(
    (canvas: HTMLCanvasElement, previewSize: PreviewSize) => {
      const context = canvas.getContext("2d");
      if (!context) return;

      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(previewSize.width * devicePixelRatio);
      canvas.height = Math.round(previewSize.height * devicePixelRatio);
      canvas.style.width = `${previewSize.width}px`;
      canvas.style.height = `${previewSize.height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.clearRect(0, 0, previewSize.width, previewSize.height);

      context.save();

      if ((previewSize.shape ?? preset.guideShape) === "circle") {
        const radius = Math.min(previewSize.width, previewSize.height) / 2;
        context.beginPath();
        context.arc(
          previewSize.width / 2,
          previewSize.height / 2,
          radius,
          0,
          Math.PI * 2,
        );
        context.clip();
      }

      context.fillStyle = "#27272a";
      context.fillRect(0, 0, previewSize.width, previewSize.height);

      const image = imageRef.current;
      if (image) {
        const scaleX = previewSize.width / preset.outputWidth;
        const scaleY = previewSize.height / preset.outputHeight;
        const baseScale = Math.min(
          preset.outputWidth / image.naturalWidth,
          preset.outputHeight / image.naturalHeight,
        );
        const drawWidth = image.naturalWidth * baseScale * (zoom / 100);
        const drawHeight = image.naturalHeight * baseScale * (zoom / 100);

        context.scale(scaleX, scaleY);
        context.translate(
          preset.outputWidth / 2 + offsetX,
          preset.outputHeight / 2 + offsetY,
        );
        context.rotate((rotation * Math.PI) / 180);
        context.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      }

      context.restore();
    },
    [flipX, flipY, offsetX, offsetY, preset, rotation, zoom],
  );

  const drawAll = useCallback(() => {
    for (const previewSize of previewSizes) {
      const key = getPreviewKey(previewSize);
      const canvas = canvasRefs.current.get(key);
      if (canvas) {
        drawPreview(canvas, previewSize);
      }
    }
  }, [drawPreview, previewSizes]);

  useEffect(() => {
    if (!imageUrl) {
      imageRef.current = null;
      drawAll();
      return;
    }

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current = image;
      drawAll();
    };
    image.onerror = () => {
      imageRef.current = null;
      drawAll();
    };
  }, [drawAll, imageUrl]);

  useEffect(() => {
    drawAll();
  }, [drawAll]);

  if (previewSizes.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-zinc-800 pt-4">
      <p className="mb-2 text-sm font-medium text-zinc-300">
        実表示サイズプレビュー
      </p>
      <p className="mb-4 text-xs leading-5 text-zinc-500">
        各サービス上で小さく表示されたときの見え方の目安です。実際の表示とは異なる場合があります。
      </p>

      <div className="flex flex-wrap items-end gap-4">
        {previewSizes.map((previewSize) => {
          const key = getPreviewKey(previewSize);
          const shape = previewSize.shape ?? preset.guideShape ?? "rect";

          return (
            <div key={key} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
              <p className="mb-2 text-xs font-medium text-zinc-300">
                {previewSize.label}
              </p>
              <div className="flex min-h-12 min-w-12 items-center justify-center rounded border border-zinc-700 bg-zinc-900 p-2">
                <canvas
                  ref={setCanvasRef(key)}
                  aria-label={`${previewSize.label} 実表示サイズプレビュー`}
                  className={`block bg-zinc-800 ${shape === "circle" ? "rounded-full" : "rounded-sm"}`}
                  style={{
                    width: previewSize.width,
                    height: previewSize.height,
                  }}
                />
              </div>
              <p className="mt-2 text-center text-[11px] text-zinc-500">
                {previewSize.width} × {previewSize.height}px
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getPreviewKey(previewSize: PreviewSize) {
  return `${previewSize.label}-${previewSize.width}x${previewSize.height}-${previewSize.shape ?? "rect"}`;
}