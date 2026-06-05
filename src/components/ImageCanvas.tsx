"use client";

import {
  useEffect,
  useRef,
  type Dispatch,
  type PointerEvent,
  type SetStateAction,
} from "react";
import type { Preset } from "@/types/preset";

type ImageCanvasProps = {
  preset: Preset;
  imageUrl: string | null;
  imageFileName: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  setOffsetX: Dispatch<SetStateAction<number>>;
  setOffsetY: Dispatch<SetStateAction<number>>;
};

export function ImageCanvas({
  preset,
  imageUrl,
  imageFileName,
  zoom,
  offsetX,
  offsetY,
  setOffsetX,
  setOffsetY,
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerYRef = useRef(0);

  useEffect(() => {
    if (!imageUrl) {
      imageRef.current = null;
      drawCanvas();
      return;
    }

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      imageRef.current = image;
      drawCanvas();
    };

    image.onerror = () => {
      imageRef.current = null;
      drawCanvas();
      alert("画像の読み込みに失敗しました。");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    drawCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, zoom, offsetX, offsetY, imageFileName]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    canvas.width = preset.outputWidth;
    canvas.height = preset.outputHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#27272a";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const image = imageRef.current;

    if (image) {
      const baseScale = Math.min(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );

      const drawWidth = image.naturalWidth * baseScale * (zoom / 100);
      const drawHeight = image.naturalHeight * baseScale * (zoom / 100);

      const drawX = (canvas.width - drawWidth) / 2 + offsetX;
      const drawY = (canvas.height - drawHeight) / 2 + offsetY;

      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    } else {
      context.fillStyle = "#d4d4d8";
      context.font = "28px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        "ここに画像プレビューを表示",
        canvas.width / 2,
        canvas.height / 2 - 20,
      );

      context.fillStyle = "#71717a";
      context.font = "20px sans-serif";
      context.fillText(
        "画像を選択すると、この枠内に表示されます",
        canvas.width / 2,
        canvas.height / 2 + 24,
      );
    }

    drawSafeArea(context, canvas);
  };

  const drawSafeArea = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    if (!preset.safeArea) {
      return;
    }

    const { x, y, width, height } = preset.safeArea;

    context.save();

    // 安全領域の外側を暗くする
    context.fillStyle = "rgba(0, 0, 0, 0.42)";
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.rect(x, y, width, height);
    context.fill("evenodd");

    // 安全領域の枠線
    context.strokeStyle = "#38bdf8";
    context.lineWidth = Math.max(4, canvas.width / 400);
    context.strokeRect(x, y, width, height);

    context.restore();
  };

  const getCanvasScale = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return { scaleX: 1, scaleY: 1 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      scaleX: preset.outputWidth / rect.width,
      scaleY: preset.outputHeight / rect.height,
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!imageUrl) {
      return;
    }

    isDraggingRef.current = true;
    lastPointerXRef.current = event.clientX;
    lastPointerYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    const { scaleX, scaleY } = getCanvasScale();

    const deltaX = (event.clientX - lastPointerXRef.current) * scaleX;
    const deltaY = (event.clientY - lastPointerYRef.current) * scaleY;

    setOffsetX((current) => current + deltaX);
    setOffsetY((current) => current + deltaY);

    lastPointerXRef.current = event.clientX;
    lastPointerYRef.current = event.clientY;
  };

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <canvas
      ref={canvasRef}
      aria-label={imageFileName ?? "画像プレビュー"}
      className={`block h-auto w-full max-w-3xl rounded-lg border border-zinc-700 bg-zinc-800 shadow-2xl ${
        imageUrl ? "cursor-grab touch-none active:cursor-grabbing" : ""
      }`}
      style={{
        aspectRatio: `${preset.outputWidth} / ${preset.outputHeight}`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
}
