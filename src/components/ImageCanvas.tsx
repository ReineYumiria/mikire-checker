"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type Dispatch,
  type PointerEvent,
  type SetStateAction,
  type WheelEvent,
} from "react";
import type { Preset } from "@/types/preset";

type ExportPngOptions = {
  includeSafeAreaGuide: boolean;
};

export type ImageCanvasHandle = {
  exportPng: (fileName: string, options: ExportPngOptions) => void;
};

type ImageCanvasProps = {
  preset: Preset;
  imageUrl: string | null;
  imageFileName: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  showSafeAreaGuide: boolean;
  setZoom: Dispatch<SetStateAction<number>>;
  setOffsetX: Dispatch<SetStateAction<number>>;
  setOffsetY: Dispatch<SetStateAction<number>>;
};

const MIN_ZOOM = 50;
const MAX_ZOOM = 1000;
const WHEEL_ZOOM_STEP = 10;

export const ImageCanvas = forwardRef<ImageCanvasHandle, ImageCanvasProps>(
  function ImageCanvas(
    {
      preset,
      imageUrl,
      imageFileName,
      zoom,
      offsetX,
      offsetY,
      showSafeAreaGuide,
      setZoom,
      setOffsetX,
      setOffsetY,
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const isDraggingRef = useRef(false);
    const lastPointerXRef = useRef(0);
    const lastPointerYRef = useRef(0);
    const activePointersRef = useRef(
      new Map<number, { clientX: number; clientY: number }>(),
    );
    const pinchStartDistanceRef = useRef<number | null>(null);
    const pinchStartZoomRef = useRef(zoom);
    const pinchStartOffsetXRef = useRef(0);
    const pinchStartOffsetYRef = useRef(0);
    const pinchCenterPointRef = useRef({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
      exportPng: (fileName: string, options: ExportPngOptions) => {
        exportPng(fileName, options);
      },
    }));

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
    }, [preset, zoom, offsetX, offsetY, imageFileName, showSafeAreaGuide]);

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

      drawCanvasContent(context, canvas, {
        includeSafeAreaGuide: showSafeAreaGuide,
        includePlaceholder: true,
      });
    };

    const drawCanvasContent = (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      options: {
        includeSafeAreaGuide: boolean;
        includePlaceholder: boolean;
      },
    ) => {
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
      } else if (options.includePlaceholder) {
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

      if (options.includeSafeAreaGuide) {
        drawSafeArea(context, canvas);
      }
    };

    const drawSafeArea = (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
    ) => {
      if (!preset.safeArea) {
        return;
      }

      const guideShape = preset.guideShape ?? "rect";
      const { x, y, width, height } = preset.safeArea;

      context.save();

      if (guideShape === "circle") {
        drawCircleSafeArea(context, canvas, x, y, width, height);
      } else {
        drawRectSafeArea(context, canvas, x, y, width, height);
      }

      context.restore();
    };

    const drawRectSafeArea = (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      context.fillStyle = "rgba(0, 0, 0, 0.42)";
      context.beginPath();
      context.rect(0, 0, canvas.width, canvas.height);
      context.rect(x, y, width, height);
      context.fill("evenodd");

      context.strokeStyle = "#38bdf8";
      context.lineWidth = Math.max(4, canvas.width / 400);
      context.strokeRect(x, y, width, height);
    };

    const drawCircleSafeArea = (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      const radius = Math.min(width, height) / 2;

      context.fillStyle = "rgba(0, 0, 0, 0.42)";
      context.beginPath();
      context.rect(0, 0, canvas.width, canvas.height);
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill("evenodd");

      context.strokeStyle = "#38bdf8";
      context.lineWidth = Math.max(4, canvas.width / 400);
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();
    };

    const exportPng = (fileName: string, options: ExportPngOptions) => {
      if (!imageRef.current) {
        alert("先に画像を選択してください。");
        return;
      }

      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = preset.outputWidth;
      exportCanvas.height = preset.outputHeight;

      const context = exportCanvas.getContext("2d");

      if (!context) {
        alert("PNG書き出しに失敗しました。");
        return;
      }

      drawCanvasContent(context, exportCanvas, {
        includeSafeAreaGuide: options.includeSafeAreaGuide,
        includePlaceholder: false,
      });

      exportCanvas.toBlob((blob) => {
        if (!blob) {
          alert("PNG書き出しに失敗しました。");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
      }, "image/png");
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

    const getCanvasPointFromClient = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return {
          x: preset.outputWidth / 2,
          y: preset.outputHeight / 2,
        };
      }

      const rect = canvas.getBoundingClientRect();
      const { scaleX, scaleY } = getCanvasScale();

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const getPointerDistance = (
      first: { clientX: number; clientY: number },
      second: { clientX: number; clientY: number },
    ) => {
      return Math.hypot(
        first.clientX - second.clientX,
        first.clientY - second.clientY,
      );
    };

    const getPointerCenter = (
      first: { clientX: number; clientY: number },
      second: { clientX: number; clientY: number },
    ) => {
      return {
        clientX: (first.clientX + second.clientX) / 2,
        clientY: (first.clientY + second.clientY) / 2,
      };
    };

    const handleWheel = (event: WheelEvent<HTMLCanvasElement>) => {
      if (!imageUrl) {
        return;
      }

      event.preventDefault();

      const direction = event.deltaY < 0 ? 1 : -1;
      const nextZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, zoom + direction * WHEEL_ZOOM_STEP),
      );

      if (nextZoom === zoom) {
        return;
      }

      const point = getCanvasPointFromClient(event.clientX, event.clientY);
      const zoomRatio = nextZoom / zoom;

      const canvasCenterX = preset.outputWidth / 2;
      const canvasCenterY = preset.outputHeight / 2;

      const relativeX = point.x - canvasCenterX - offsetX;
      const relativeY = point.y - canvasCenterY - offsetY;

      setOffsetX(point.x - canvasCenterX - relativeX * zoomRatio);
      setOffsetY(point.y - canvasCenterY - relativeY * zoomRatio);
      setZoom(nextZoom);
    };

    const startPinchZoom = () => {
      const pointers = Array.from(activePointersRef.current.values());

      if (pointers.length < 2) {
        return;
      }

      const [firstPointer, secondPointer] = pointers;
      const center = getPointerCenter(firstPointer, secondPointer);
      const centerPoint = getCanvasPointFromClient(
        center.clientX,
        center.clientY,
      );

      pinchStartDistanceRef.current = getPointerDistance(
        firstPointer,
        secondPointer,
      );
      pinchStartZoomRef.current = zoom;
      pinchStartOffsetXRef.current = offsetX;
      pinchStartOffsetYRef.current = offsetY;
      pinchCenterPointRef.current = centerPoint;
    };

    const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
      if (!imageUrl) {
        return;
      }

      activePointersRef.current.set(event.pointerId, {
        clientX: event.clientX,
        clientY: event.clientY,
      });

      event.currentTarget.setPointerCapture(event.pointerId);

      if (activePointersRef.current.size === 1) {
        isDraggingRef.current = true;
        lastPointerXRef.current = event.clientX;
        lastPointerYRef.current = event.clientY;
        return;
      }

      if (activePointersRef.current.size === 2) {
        isDraggingRef.current = false;
        startPinchZoom();
      }
    };

    const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
      if (!imageUrl) {
        return;
      }

      const pointer = activePointersRef.current.get(event.pointerId);

      if (!pointer) {
        return;
      }

      activePointersRef.current.set(event.pointerId, {
        clientX: event.clientX,
        clientY: event.clientY,
      });

      if (activePointersRef.current.size >= 2) {
        const pointers = Array.from(activePointersRef.current.values());
        const [firstPointer, secondPointer] = pointers;

        const startDistance = pinchStartDistanceRef.current;

        if (!startDistance || startDistance <= 0) {
          startPinchZoom();
          return;
        }

        const currentDistance = getPointerDistance(firstPointer, secondPointer);
        const nextZoom = Math.min(
          MAX_ZOOM,
          Math.max(
            MIN_ZOOM,
            pinchStartZoomRef.current * (currentDistance / startDistance),
          ),
        );

        const zoomRatio = nextZoom / pinchStartZoomRef.current;
        const point = pinchCenterPointRef.current;

        const canvasCenterX = preset.outputWidth / 2;
        const canvasCenterY = preset.outputHeight / 2;

        const relativeX =
          point.x - canvasCenterX - pinchStartOffsetXRef.current;
        const relativeY =
          point.y - canvasCenterY - pinchStartOffsetYRef.current;

        setOffsetX(point.x - canvasCenterX - relativeX * zoomRatio);
        setOffsetY(point.y - canvasCenterY - relativeY * zoomRatio);
        setZoom(Math.round(nextZoom));

        return;
      }

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
      activePointersRef.current.delete(event.pointerId);

      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer capture may already be released.
      }

      pinchStartDistanceRef.current = null;

      if (activePointersRef.current.size === 1) {
        const [remainingPointer] = Array.from(
          activePointersRef.current.values(),
        );

        isDraggingRef.current = true;
        lastPointerXRef.current = remainingPointer.clientX;
        lastPointerYRef.current = remainingPointer.clientY;
        return;
      }

      isDraggingRef.current = false;
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
          touchAction: "none",
          maxHeight: "72vh",
          width: `min(100%, calc(72vh * ${preset.outputWidth / preset.outputHeight}))`,
        }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    );
  },
);
