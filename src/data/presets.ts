import type { Preset } from "@/types/preset";

export const presets: Preset[] = [
  {
    id: "youtube-thumbnail",
    service: "YouTube",
    name: "サムネイル",
    outputWidth: 1280,
    outputHeight: 720,
    description: "YouTube動画用の標準的なサムネイルサイズです。",
    notes: [
      "重要な文字や顔は、端に寄せすぎないようにしてください。",
      "MVPでは外枠確認を優先し、安全領域は後で細かく調整します。",
    ],
  },
  {
    id: "youtube-channel-banner",
    service: "YouTube",
    name: "チャンネルバナー",
    outputWidth: 2560,
    outputHeight: 1440,
    safeArea: {
      x: 507,
      y: 508,
      width: 1546,
      height: 423,
    },
    description:
      "端末によって表示範囲が大きく変わるため、安全領域の確認が重要な画像です。",
    notes: [
      "ロゴ・文字・顔などの重要要素は安全領域内に収めるのがおすすめです。",
      "テレビ表示では広く、スマホやPCでは中央付近が主に表示されます。",
    ],
  },
  {
    id: "twitter-header",
    service: "X（旧Twitter）",
    name: "ヘッダー",
    outputWidth: 1500,
    outputHeight: 500,
    safeArea: {
      x: 120,
      y: 60,
      width: 1260,
      height: 380,
    },
    description:
      "X（旧Twitter）プロフィール上部に表示されるヘッダー画像です。端や左下付近の見切れに注意します。",
    notes: [
      "アイコンと重なる左下付近には、重要な文字や顔を置かない方が安全です。",
      "端末や表示環境によって上下左右が少し見切れる可能性があります。",
    ],
  },
];
