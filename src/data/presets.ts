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
      "スマホ表示では小さく見えるため、文字は大きめに配置するのがおすすめです。",
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
    guideShape: "rect",
    description:
      "端末によって表示範囲が大きく変わるため、安全領域の確認が重要な画像です。",
    notes: [
      "ロゴ・文字・顔などの重要要素は安全領域内に収めるのがおすすめです。",
      "テレビ表示では広く、スマホやPCでは中央付近が主に表示されます。",
    ],
  },
  {
    id: "youtube-profile-icon",
    service: "YouTube",
    name: "プロフィール画像",
    outputWidth: 800,
    outputHeight: 800,
    safeArea: {
      x: 0,
      y: 0,
      width: 800,
      height: 800,
    },
    guideShape: "circle",
    description:
      "YouTubeチャンネルのプロフィール画像向けプリセットです。円形表示で見切れやすい外周を確認します。",
    notes: [
      "実際の表示は小さくなるため、顔・ロゴ・文字は中央に大きめに配置するのがおすすめです。",
      "丸アイコン表示を想定して、四隅や外周には重要な情報を置かない方が安全です。",
    ],
  },
  {
    id: "x-header",
    service: "X（旧Twitter）",
    name: "ヘッダー",
    outputWidth: 1500,
    outputHeight: 500,
    safeArea: {
      x: 150,
      y: 70,
      width: 1200,
      height: 340,
    },
    guideShape: "rect",
    description:
      "X（旧Twitter）プロフィール上部に表示されるヘッダー画像です。端や左下付近の見切れに注意します。",
    notes: [
      "アイコンと重なる左下付近には、重要な文字や顔を置かない方が安全です。",
      "端末や表示環境によって上下左右が少し見切れる可能性があります。",
      "安全領域はMVP用の目安です。実機確認しながら後で調整します。",
    ],
  },
  {
    id: "x-profile-icon",
    service: "X（旧Twitter）",
    name: "プロフィール画像",
    outputWidth: 400,
    outputHeight: 400,
    safeArea: {
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    },
    guideShape: "circle",
    description:
      "X（旧Twitter）のプロフィール画像向けプリセットです。円形表示で外周が見切れやすいため、中央配置を確認します。",
    notes: [
      "X公式ではプロフィール画像は400×400pxが推奨されています。",
      "実際の表示は円形になるため、四隅には重要な情報を置かない方が安全です。",
      "顔・ロゴ・文字などの重要要素は中央寄りに収めるのがおすすめです。",
  ],
  },
  {
    id: "x-post-16-9",
    service: "X（旧Twitter）",
    name: "投稿画像 16:9",
    outputWidth: 1200,
    outputHeight: 675,
    description:
      "X（旧Twitter）の横長投稿画像向けプリセットです。リンクカードや横長画像の確認に使います。",
    notes: [
      "重要な文字や顔は端に寄せすぎないようにしてください。",
      "タイムライン上では表示サイズが小さくなるため、細かい文字は読みにくくなります。",
    ],
  },
  {
    id: "x-post-square",
    service: "X（旧Twitter）",
    name: "投稿画像 正方形",
    outputWidth: 1200,
    outputHeight: 1200,
    description:
      "X（旧Twitter）の正方形投稿画像向けプリセットです。告知画像やイラスト投稿の確認に使います。",
    notes: [
      "一覧やタイムラインでは縮小表示されるため、文字は大きめに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "discord-server-banner",
    service: "Discord",
    name: "サーバーバナー",
    outputWidth: 960,
    outputHeight: 540,
    safeArea: {
      x: 96,
      y: 72,
      width: 768,
      height: 396,
    },
    guideShape: "rect",
    description:
      "Discordサーバーのバナー画像向けプリセットです。16:9画像として表示確認します。",
    notes: [
      "中央付近に重要な要素を置くと、端末差の影響を受けにくくなります。",
      "安全領域はMVP用の目安です。Discord側の表示差を見ながら後で調整します。",
    ],
  },
  {
    id: "discord-server-icon",
    service: "Discord",
    name: "サーバーアイコン",
    outputWidth: 512,
    outputHeight: 512,
    safeArea: {
      x: 0,
      y: 0,
      width: 512,
      height: 512,
    },
    guideShape: "circle",
    description:
      "Discordサーバーアイコン向けプリセットです。円形表示を想定して、四隅や外周の見切れを確認します。",
    notes: [
      "サーバー名の頭文字やロゴは中央に大きく配置すると見やすくなります。",
      "円形表示では四隅が見えなくなるため、外周に重要要素を置かない方が安全です。",
    ],
  },
  {
    id: "steam-header-capsule",
    service: "Steam",
    name: "ヘッダーカプセル",
    outputWidth: 920,
    outputHeight: 430,
    safeArea: {
      x: 74,
      y: 43,
      width: 772,
      height: 344,
    },
    guideShape: "rect",
    description:
      "Steamストアページなどで使われるヘッダーカプセル画像向けプリセットです。",
    notes: [
      "ロゴやタイトルは縮小表示でも読めるように、中央寄りかつ大きめに配置するのがおすすめです。",
      "安全領域はMVP用の目安です。Steam公式サイズを基準に、端を避ける確認用として設定しています。",
    ],
  },
  {
    id: "steam-small-capsule",
    service: "Steam",
    name: "スモールカプセル",
    outputWidth: 462,
    outputHeight: 174,
    safeArea: {
      x: 37,
      y: 17,
      width: 388,
      height: 140,
    },
    guideShape: "rect",
    description:
      "Steamの小さめ表示に使われるスモールカプセル画像向けプリセットです。",
    notes: [
      "表示サイズが小さいため、ロゴやタイトルの可読性を最優先にしてください。",
      "細かい装飾や小さい文字は潰れやすいです。",
    ],
  },
  {
    id: "steam-main-capsule",
    service: "Steam",
    name: "メインカプセル",
    outputWidth: 1232,
    outputHeight: 706,
    safeArea: {
      x: 98,
      y: 71,
      width: 1036,
      height: 564,
    },
    guideShape: "rect",
    description:
      "Steamストア上で大きく表示されるメインカプセル画像向けプリセットです。",
    notes: [
      "ゲームの印象を決める画像なので、ロゴと主要ビジュアルの見切れ確認に向いています。",
      "安全領域はMVP用の目安です。端に重要要素を置きすぎない確認用として使います。",
    ],
  },
  {
    id: "steam-vertical-capsule",
    service: "Steam",
    name: "縦型カプセル",
    outputWidth: 748,
    outputHeight: 896,
    safeArea: {
      x: 60,
      y: 90,
      width: 628,
      height: 716,
    },
    guideShape: "rect",
    description:
      "Steamの縦長表示で使われる縦型カプセル画像向けプリセットです。",
    notes: [
      "縦長のため、キャラクターやロゴの上下見切れに注意してください。",
      "上端・下端にタイトルや顔を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "steam-profile-avatar",
    service: "Steam",
    name: "プロフィールアバター",
    outputWidth: 184,
    outputHeight: 184,
    safeArea: {
      x: 0,
      y: 0,
      width: 184,
      height: 184,
    },
    guideShape: "circle",
    description:
      "Steamプロフィールのアバター向けプリセットです。小さく表示されるため、可読性と中央配置を確認します。",
    notes: [
      "小さいサイズに縮小されるため、細かい文字や細い線は潰れやすいです。",
      "顔・ロゴ・シンボルは中央に大きく置くのがおすすめです。",
    ],
  },
  {
    id: "note-article-eyecatch",
    service: "note",
    name: "記事見出し画像",
    outputWidth: 1280,
    outputHeight: 670,
    safeArea: {
      x: 128,
      y: 67,
      width: 1024,
      height: 536,
    },
    guideShape: "rect",
    description:
      "noteの記事見出し画像向けプリセットです。横長のアイキャッチ画像として確認します。",
    notes: [
      "PCとmobileで表示のされ方が変わるため、重要な要素は中央寄りに置くのがおすすめです。",
      "安全領域はMVP用の目安です。note公式の推奨比率を基準にしています。",
    ],
  },
  {
    id: "note-creator-magazine-header",
    service: "note",
    name: "クリエイター/マガジンヘッダー",
    outputWidth: 1920,
    outputHeight: 1006,
    safeArea: {
      x: 192,
      y: 341,
      width: 1536,
      height: 324,
    },
    guideShape: "rect",
    description:
      "noteのクリエイターページやマガジンヘッダー向けプリセットです。中央部分の見切れ確認に使います。",
    notes: [
      "クリエイターページやマガジンでは中央部分が主に表示されます。",
      "上下に重要な文字や顔を置くと見切れやすくなります。",
      "安全領域はMVP用の目安です。実際の表示に合わせて後で調整します。",
    ],
  },
  {
    id: "note-profile-icon",
    service: "note",
    name: "プロフィールアイコン",
    outputWidth: 500,
    outputHeight: 500,
    safeArea: {
      x: 0,
      y: 0,
      width: 500,
      height: 500,
    },
    guideShape: "circle",
    description:
      "noteプロフィールアイコン向けプリセットです。円形表示を想定して、中央配置と外周の見切れを確認します。",
    notes: [
      "note公式では推奨サイズは明示されていませんが、正方形画像がおすすめされています。",
      "丸い枠に合わせて表示されるため、顔・ロゴ・文字は中央寄りに配置するのがおすすめです。",
    ],
  },
];
