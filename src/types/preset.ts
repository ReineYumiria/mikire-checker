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
  description: string;
  notes?: string[];
};
