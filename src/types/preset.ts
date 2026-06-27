export type GuideShape = "rect" | "circle";

export type PreviewSize = {
  label: string;
  width: number;
  height: number;
  shape?: GuideShape;
};

export type SafeArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Preset = {
  id: string;
  service: string;
  name: string;
  outputWidth: number;
  outputHeight: number;
  safeArea?: SafeArea;
  guideShape?: GuideShape;
  previewSizes?: PreviewSize[];
  description: string;
  notes?: string[];
};
