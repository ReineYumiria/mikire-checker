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
    previewSizes: [
      { label: "600 × 200", width: 600, height: 200, shape: "rect" },
      { label: "300 × 100", width: 300, height: 100, shape: "rect" },
    ],
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
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "48 × 48", width: 48, height: 48, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
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
    previewSizes: [
      { label: "480 × 270", width: 480, height: 270, shape: "rect" },
      { label: "320 × 180", width: 320, height: 180, shape: "rect" },
    ],
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
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "40 × 40", width: 40, height: 40, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Discordサーバーアイコン向けプリセットです。円形表示を想定して、四隅や外周の見切れを確認します。",
    notes: [
      "サーバー名の頭文字やロゴは中央に大きく配置すると見やすくなります。",
      "円形表示では四隅が見えなくなるため、外周に重要要素を置かない方が安全です。",
    ],
  },
  {
    id: "slack-workspace-icon",
    service: "Slack",
    name: "ワークスペースアイコン",
    outputWidth: 512,
    outputHeight: 512,
    safeArea: {
      x: 0,
      y: 0,
      width: 512,
      height: 512,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "40 × 40", width: 40, height: 40, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Slackワークスペースのアイコン向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "ワークスペースアイコンは円形で表示されるため、四隅や外周には重要な情報を置かない方が安全です。",
      "ロゴや文字は中央に大きく配置するのがおすすめです。",
    ],
  },
  {
    id: "slack-profile-image",
    service: "Slack",
    name: "プロフィール画像",
    outputWidth: 512,
    outputHeight: 512,
    safeArea: {
      x: 0,
      y: 0,
      width: 512,
      height: 512,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "40 × 40", width: 40, height: 40, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Slackプロフィール画像向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "プロフィール画像は円形表示を想定して、顔・ロゴ・文字は中央寄りに配置するのがおすすめです。",
      "外周や四隅には重要な情報を置かない方が安全です。",
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
    id: "steam-library-capsule",
    service: "Steam",
    name: "ライブラリカプセル",
    outputWidth: 600,
    outputHeight: 900,
    safeArea: {
      x: 48,
      y: 90,
      width: 504,
      height: 720,
    },
    guideShape: "rect",
    description:
      "Steamライブラリなどで縦長に表示されるライブラリカプセル画像向けプリセットです。",
    notes: [
      "縦長表示のため、タイトルロゴやキャラクターの上下見切れに注意してください。",
      "サムネイルとして縮小されても見やすいように、主要要素は中央寄りに配置するのがおすすめです。",
      "安全領域はMVP用の目安です。端に重要要素を置きすぎない確認用として設定しています。",
    ],
  },
  {
    id: "soundcloud-profile-image",
    service: "SoundCloud",
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
      "SoundCloudプロフィール画像向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "プロフィール画像は正方形で用意し、顔・ロゴ・文字などは中央寄りに配置するのがおすすめです。",
      "実際の表示では円形になるため、四隅や外周には重要な情報を置かない方が安全です。",
    ],
  },
  {
    id: "soundcloud-header",
    service: "SoundCloud",
    name: "ヘッダー画像",
    outputWidth: 2480,
    outputHeight: 520,
    safeArea: {
      x: 248,
      y: 52,
      width: 1984,
      height: 416,
    },
    guideShape: "rect",
    description:
      "SoundCloudプロフィール上部のヘッダー画像向けプリセットです。横長バナーとして見切れを確認します。",
    notes: [
      "横長画像のため、ロゴ・文字・顔などの重要要素は中央寄りに置くのがおすすめです。",
      "端末や表示環境によって端が見切れる可能性があるため、左右端には重要な情報を置かない方が安全です。",
      "安全領域はMVP用の目安です。実機確認しながら後で調整します。",
    ],
  },
  {
    id: "soundcloud-track-artwork",
    service: "SoundCloud",
    name: "トラック / プレイリスト画像",
    outputWidth: 800,
    outputHeight: 800,
    description:
      "SoundCloudのトラックやプレイリストに使う正方形アートワーク向けプリセットです。",
    notes: [
      "サムネイルとして小さく表示されるため、タイトルやロゴは大きめに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "soundcloud-distribution-artwork",
    service: "SoundCloud",
    name: "配信用アートワーク",
    outputWidth: 3000,
    outputHeight: 3000,
    description:
      "SoundCloud経由の配信などで使う高解像度の正方形アートワーク向けプリセットです。",
    notes: [
      "配信用アートワークは各配信先でも使われるため、文字やロゴの可読性を重視してください。",
      "小さなサムネイル表示でも印象が崩れないよう、主要要素は中央寄りに大きく配置するのがおすすめです。",
    ],
  },
  {
    id: "spotify-artist-header",
    service: "Spotify",
    name: "Artist Header",
    outputWidth: 2660,
    outputHeight: 1140,
    safeArea: {
      x: 266,
      y: 114,
      width: 2128,
      height: 912,
    },
    guideShape: "rect",
    description:
      "Spotifyアーティストプロフィールのヘッダー画像向けプリセットです。横長のバナーとして見切れを確認します。",
    notes: [
      "表示環境や端末によって上下左右が一部見切れる可能性があります。重要な文字やロゴは中央寄りに配置するのがおすすめです。",
      "アーティスト名が上下に表示される場合があるため、重要な要素はバナー中央付近に収めると安全です。",
    ],
  },
  {
    id: "spotify-image-gallery",
    service: "Spotify",
    name: "Image Gallery",
    outputWidth: 690,
    outputHeight: 500,
    safeArea: {
      x: 69,
      y: 50,
      width: 552,
      height: 400,
    },
    guideShape: "rect",
    description:
      "Spotifyアーティストの画像ギャラリー向けプリセットです。横長画像として見切れを確認します。",
    notes: [
      "ギャラリー画像は縮小表示されることがあるため、重要な文字やビジュアルは中央寄りに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "spotify-cover-art",
    service: "Spotify",
    name: "Cover Art",
    outputWidth: 3000,
    outputHeight: 3000,
    description:
      "Spotifyのアルバム / シングル等のカバーアート向けプリセットです。正方形画像として見切れを確認します。",
    notes: [
      "Spotifyでは3000×3000pxの正方形JPEGが推奨されています。",
      "サムネイルとして小さく表示されるため、タイトルやロゴは大きめに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "twitch-profile-image",
    service: "Twitch",
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
      "Twitchプロフィール画像向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "プロフィール画像は小さく表示されることが多いため、顔・ロゴ・文字は中央に大きく配置するのがおすすめです。",
      "円形表示を想定して、四隅や外周には重要な情報を置かない方が安全です。",
    ],
  },
  {
    id: "twitch-profile-banner",
    service: "Twitch",
    name: "プロフィールバナー",
    outputWidth: 1200,
    outputHeight: 480,
    safeArea: {
      x: 120,
      y: 48,
      width: 960,
      height: 384,
    },
    guideShape: "rect",
    description:
      "Twitchチャンネルページのプロフィールバナー向けプリセットです。横長バナーとして見切れを確認します。",
    notes: [
      "横長表示のため、ロゴ・文字・顔などの重要要素は中央寄りに配置するのがおすすめです。",
      "端末や表示環境によって端が見切れる可能性があるため、左右端には重要な情報を置かない方が安全です。",
      "安全領域はMVP用の目安です。実機確認しながら後で調整します。",
    ],
  },
  {
    id: "twitch-offline-screen",
    service: "Twitch",
    name: "オフライン画面",
    outputWidth: 1920,
    outputHeight: 1080,
    description:
      "Twitchチャンネルのオフライン画面向けプリセットです。16:9画像として表示確認します。",
    notes: [
      "配信画面と同じ16:9比率のため、ロゴ・告知文・SNS情報の配置確認に向いています。",
      "スマホや小さい表示でも読めるように、文字は大きめに配置するのがおすすめです。",
    ],
  },
  {
    id: "niconico-video-thumbnail",
    service: "ニコニコ動画",
    name: "動画サムネイル",
    outputWidth: 1280,
    outputHeight: 720,
    description:
      "ニコニコ動画の動画サムネイル向けプリセットです。16:9のサムネイルとして見切れを確認します。",
    notes: [
      "サムネイルは小さく表示されることが多いため、文字やロゴは大きめに配置するのがおすすめです。",
      "重要な文字や顔は中央寄りに置くと、縮小表示でも見切れにくくなります。",
    ],
  },
  {
    id: "pixiv-profile-image",
    service: "pixiv",
    name: "プロフィール画像（暫定）",
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
      "pixivのプロフィール画像向けの暫定プリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "pixiv公式ヘルプでは最大ファイルサイズが5MBと案内されていますが、推奨ピクセル数の明確な案内が確認しづらいため、500×500の暫定プリセットとして設定しています。",
      "実際の表示では円形にトリミングされるため、四隅や外周には重要な情報を置かない方が安全です。",
      "顔・ロゴ・文字などの重要要素は中央に大きく配置するのがおすすめです。",
    ],
  },
  {
    id: "pixiv-profile-cover",
    service: "pixiv",
    name: "プロフィールカバー",
    outputWidth: 1200,
    outputHeight: 600,
    safeArea: {
      x: 120,
      y: 60,
      width: 960,
      height: 480,
    },
    guideShape: "rect",
    description:
      "pixivプロフィールページのカバー画像向けプリセットです。横長カバーとして見切れを確認します。",
    notes: [
      "プロフィールカバーは横長表示のため、顔・ロゴ・文字などの重要要素は中央寄りに配置するのがおすすめです。",
      "端末や表示環境によって端が見切れる可能性があるため、外周には重要な情報を置かない方が安全です。",
      "安全領域はMVP用の目安です。実機確認しながら後で調整します。",
    ],
  },
  {
    id: "pixiv-manga-series-cover",
    service: "pixiv",
    name: "マンガシリーズカバー",
    outputWidth: 1200,
    outputHeight: 630,
    safeArea: {
      x: 120,
      y: 63,
      width: 960,
      height: 504,
    },
    guideShape: "rect",
    description:
      "pixivのマンガシリーズ用カバー画像向けプリセットです。横長のカバー画像として確認します。",
    notes: [
      "シリーズ名やメインビジュアルは中央寄りに配置すると、一覧表示でも見やすくなります。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
      "安全領域はMVP用の目安です。端を避ける確認用として設定しています。",
    ],
  },
  {
    id: "pixiv-search-thumbnail-square",
    service: "pixiv",
    name: "検索サムネイル 正方形",
    outputWidth: 1200,
    outputHeight: 1200,
    safeArea: {
      x: 120,
      y: 120,
      width: 960,
      height: 960,
    },
    guideShape: "rect",
    description:
      "pixivの検索結果や一覧表示で正方形サムネイルとして見える場合を想定した確認用プリセットです。",
    notes: [
      "作品画像が一覧で正方形に近いサムネイルとして表示される場合の見切れ確認に使います。",
      "顔・文字・重要な構図は中央寄りに配置すると、一覧表示でも見切れにくくなります。",
      "実際の表示は画面幅や表示場所によって変わる可能性があるため、目安として確認してください。",
    ],
  },
  {
    id: "fanbox-plan-cover",
    service: "FANBOX",
    name: "プランカバー",
    outputWidth: 1200,
    outputHeight: 600,
    safeArea: {
      x: 120,
      y: 60,
      width: 960,
      height: 480,
    },
    guideShape: "rect",
    description:
      "FANBOXのプランカバー画像向けプリセットです。横長カバーとして見切れを確認します。",
    notes: [
      "プラン名や重要な文字は中央寄りに配置すると、表示環境の差による見切れを避けやすくなります。",
      "左右端や上下端には、重要な顔・ロゴ・文字を置かない方が安全です。",
      "安全領域はMVP用の目安です。実機確認しながら後で調整します。",
    ],
  },
  {
    id: "itchio-cover-image",
    service: "itch.io",
    name: "Cover Image",
    outputWidth: 630,
    outputHeight: 500,
    safeArea: {
      x: 63,
      y: 50,
      width: 504,
      height: 400,
    },
    guideShape: "rect",
    description:
      "itch.ioのゲームページなどで使われるカバー画像向けプリセットです。やや横長のサムネイルとして見切れを確認します。",
    notes: [
      "ゲームタイトルや主要ビジュアルは中央寄りに配置すると、一覧表示でも見やすくなります。",
      "小さく表示されることがあるため、細かい文字や装飾は潰れやすいです。",
      "安全領域はMVP用の目安です。端に重要要素を置きすぎない確認用として設定しています。",
    ],
  },
  {
    id: "itchio-embed-image",
    service: "itch.io",
    name: "Embed Image",
    outputWidth: 640,
    outputHeight: 360,
    safeArea: {
      x: 64,
      y: 36,
      width: 512,
      height: 288,
    },
    guideShape: "rect",
    description:
      "itch.ioの埋め込み表示などで使われる16:9画像向けプリセットです。",
    notes: [
      "16:9の横長画像として、ゲーム画面・タイトルロゴ・告知画像の配置確認に向いています。",
      "埋め込みや一覧では縮小表示されるため、文字は大きめに配置するのがおすすめです。",
      "安全領域はMVP用の目安です。実際の表示に合わせて後で調整します。",
    ],
  },
  {
    id: "github-social-preview",
    service: "GitHub",
    name: "ソーシャルプレビュー",
    outputWidth: 1280,
    outputHeight: 640,
    safeArea: {
      x: 128,
      y: 64,
      width: 1024,
      height: 512,
    },
    guideShape: "rect",
    description:
      "GitHubリポジトリのSNS共有時などに表示されるソーシャルプレビュー画像向けプリセットです。",
    notes: [
      "GitHub公式では、最適な表示として1280×640pxが推奨されています。",
      "リポジトリ名・ロゴ・主要テキストは中央寄りに配置すると、小さなカード表示でも読みやすくなります。",
      "ファイルサイズ制限もあるため、最終アップロード時はGitHub側の条件を確認してください。",
    ],
  },
  {
    id: "instagram-profile-image",
    service: "Instagram",
    name: "プロフィール画像",
    outputWidth: 320,
    outputHeight: 320,
    safeArea: {
      x: 0,
      y: 0,
      width: 320,
      height: 320,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "44 × 44", width: 44, height: 44, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Instagramプロフィール画像向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "プロフィール画像は円形で表示されるため、四隅や外周には重要な情報を置かない方が安全です。",
      "顔・ロゴ・文字などの重要要素は中央に大きめに配置するのがおすすめです。",
    ],
  },
  {
    id: "instagram-post-square",
    service: "Instagram",
    name: "投稿画像 正方形",
    outputWidth: 1080,
    outputHeight: 1080,
    safeArea: {
      x: 108,
      y: 108,
      width: 864,
      height: 864,
    },
    guideShape: "rect",
    description:
      "Instagramの正方形投稿向けプリセットです。フィード投稿や告知画像の確認に使います。",
    notes: [
      "フィードやプロフィールグリッドでは縮小表示されるため、文字は大きめに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "instagram-post-portrait",
    service: "Instagram",
    name: "投稿画像 縦長 4:5",
    outputWidth: 1080,
    outputHeight: 1350,
    safeArea: {
      x: 108,
      y: 135,
      width: 864,
      height: 1080,
    },
    guideShape: "rect",
    description:
      "Instagramの縦長フィード投稿向けプリセットです。4:5比率の投稿画像として確認します。",
    notes: [
      "縦長投稿は画面内で大きく見せやすい一方、上下の端に重要要素を置くと見切れやすくなります。",
      "顔・ロゴ・文字などは中央寄りに配置するのがおすすめです。",
    ],
  },
  {
    id: "instagram-story-reels",
    service: "Instagram",
    name: "ストーリーズ / リール",
    outputWidth: 1080,
    outputHeight: 1920,
    safeArea: {
      x: 108,
      y: 240,
      width: 864,
      height: 1440,
    },
    guideShape: "rect",
    description:
      "Instagramのストーリーズやリール向けプリセットです。9:16縦長画像として表示確認します。",
    notes: [
      "上下にはUIが重なる場合があるため、重要な文字や顔は中央寄りに配置するのがおすすめです。",
      "スマホ全画面で見られるため、縦方向の余白と文字サイズに注意してください。",
      "安全領域はMVP用の目安です。実際の表示に合わせて後で調整します。",
    ],
  },
  {
    id: "tiktok-profile-image",
    service: "TikTok",
    name: "プロフィール画像",
    outputWidth: 720,
    outputHeight: 720,
    safeArea: {
      x: 0,
      y: 0,
      width: 720,
      height: 720,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "48 × 48", width: 48, height: 48, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "TikTokプロフィール画像向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "プロフィール画像は円形表示を想定して、顔・ロゴ・文字は中央寄りに配置するのがおすすめです。",
      "TikTok公式ヘルプでは、アップロード可能なプロフィール画像の最小サイズが案内されています。",
    ],
  },
  {
    id: "tiktok-video-cover",
    service: "TikTok",
    name: "動画カバー / サムネイル",
    outputWidth: 1080,
    outputHeight: 1920,
    safeArea: {
      x: 108,
      y: 240,
      width: 864,
      height: 1440,
    },
    guideShape: "rect",
    description:
      "TikTok動画のカバーやサムネイル向けプリセットです。9:16縦長画像として確認します。",
    notes: [
      "プロフィールグリッドや検索結果では、表示位置や切り抜きが変わる可能性があります。",
      "タイトル文字や顔は中央寄りに置くと、スマホ表示でも見切れにくくなります。",
      "安全領域はMVP用の目安です。実機確認しながら後で調整します。",
    ],
  },
  {
    id: "threads-profile-image",
    service: "Threads",
    name: "プロフィール画像",
    outputWidth: 320,
    outputHeight: 320,
    safeArea: {
      x: 0,
      y: 0,
      width: 320,
      height: 320,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "48 × 48", width: 48, height: 48, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Threadsのプロフィール画像向けプリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "プロフィール画像は円形表示を想定して、顔・ロゴ・文字は中央寄りに配置するのがおすすめです。",
      "四隅や外周には重要な情報を置かない方が安全です。",
    ],
  },
  {
    id: "threads-post-square",
    service: "Threads",
    name: "投稿画像 正方形",
    outputWidth: 1080,
    outputHeight: 1080,
    description:
      "Threadsの正方形投稿画像向けプリセットです。フィード投稿や告知画像の確認に使います。",
    notes: [
      "フィードでは縮小表示されるため、文字は大きめに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
    ],
  },
  {
    id: "threads-post-portrait",
    service: "Threads",
    name: "投稿画像 縦長 4:5",
    outputWidth: 1080,
    outputHeight: 1350,
    description:
      "Threadsの縦長投稿画像向けプリセットです。4:5比率の投稿画像として確認します。",
    notes: [
      "縦長投稿は画面内で大きく見せやすい一方、上下の端に重要要素を置くと見切れやすくなります。",
      "顔・ロゴ・文字などは中央寄りに配置するのがおすすめです。",
    ],
  },
  {
    id: "booth-shop-header",
    service: "BOOTH",
    name: "ショップヘッダー 目安",
    outputWidth: 1200,
    outputHeight: 400,
    safeArea: {
      x: 120,
      y: 40,
      width: 960,
      height: 320,
    },
    guideShape: "rect",
    description:
      "BOOTHショップ上部のヘッダー画像を想定した目安プリセットです。",
    notes: [
      "BOOTHの表示仕様やテーマによって見え方が変わる可能性があります。",
      "ショップ名・ロゴ・顔などの重要要素は中央寄りに配置するのがおすすめです。",
      "このプリセットはMVP用の目安です。実際のショップ表示を見ながら後で調整します。",
    ],
  },
  {
    id: "booth-item-thumbnail",
    service: "BOOTH",
    name: "商品サムネイル 正方形 目安",
    outputWidth: 1200,
    outputHeight: 1200,
    safeArea: {
      x: 120,
      y: 120,
      width: 960,
      height: 960,
    },
    guideShape: "rect",
    description:
      "BOOTHの商品一覧や商品画像サムネイルを想定した正方形の目安プリセットです。",
    notes: [
      "商品画像は一覧で小さく表示されるため、商品本体やタイトルは大きめに配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
      "このプリセットはMVP用の目安です。実際のBOOTH表示を見ながら後で調整します。",
    ],
  },
  {
    id: "cien-article-eyecatch",
    service: "Ci-en",
    name: "記事アイキャッチ 目安",
    outputWidth: 1280,
    outputHeight: 720,
    safeArea: {
      x: 128,
      y: 72,
      width: 1024,
      height: 576,
    },
    guideShape: "rect",
    description:
      "Ci-enの記事アイキャッチ画像を想定した16:9の目安プリセットです。",
    notes: [
      "記事一覧やカード表示では縮小されるため、文字や顔は中央寄りに大きく配置するのがおすすめです。",
      "上下左右の端に重要要素を寄せすぎない方が安全です。",
      "このプリセットはMVP用の目安です。実際のCi-en表示を見ながら後で調整します。",
    ],
  },
  {
    id: "cien-plan-cover",
    service: "Ci-en",
    name: "プランカバー 目安",
    outputWidth: 1200,
    outputHeight: 600,
    safeArea: {
      x: 120,
      y: 60,
      width: 960,
      height: 480,
    },
    guideShape: "rect",
    description:
      "Ci-enのプランやクリエイターページ周辺で使うカバー画像を想定した目安プリセットです。",
    notes: [
      "プラン名・説明テキスト・キャラクターの顔などは中央寄りに配置するのがおすすめです。",
      "表示場所によってトリミングが変わる可能性があるため、端には重要要素を置かない方が安全です。",
      "このプリセットはMVP用の目安です。実際の表示を確認しながら後で調整します。",
    ],
  },
  {
    id: "skeb-creator-header",
    service: "Skeb",
    name: "クリエイターヘッダー 目安",
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
      "Skebのクリエイターページ上部に使うヘッダー画像を想定した目安プリセットです。",
    notes: [
      "プロフィールアイコンやUIと重なる可能性があるため、重要要素は中央寄りに配置するのがおすすめです。",
      "端末や表示幅によって見え方が変わる可能性があります。",
      "このプリセットはMVP用の目安です。実際のSkeb表示を見ながら後で調整します。",
    ],
  },
  {
    id: "skeb-profile-icon",
    service: "Skeb",
    name: "プロフィール画像 目安",
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
      "Skebプロフィール画像向けの目安プリセットです。円形表示を想定して、外周の見切れを確認します。",
    notes: [
      "顔・ロゴ・文字などの重要要素は中央に大きく配置するのがおすすめです。",
      "円形表示では四隅が見えなくなるため、外周には重要な情報を置かない方が安全です。",
      "このプリセットはMVP用の目安です。実際の表示を確認しながら後で調整します。",
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
  {
    id: "bluesky-profile-image",
    service: "Bluesky",
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
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "48 × 48", width: 48, height: 48, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Blueskyのプロフィール画像用。表示時は円形にトリミングされるため、中央に重要な要素を置く想定。",
    notes: [
      "表示環境によって見え方が変わる場合があります。",
      "顔やロゴなど重要な要素は中央寄せにしてください。",
    ],
  },
  {
    id: "bluesky-header",
    service: "Bluesky",
    name: "ヘッダー画像",
    outputWidth: 1500,
    outputHeight: 500,
    description:
      "Blueskyのプロフィールヘッダー画像用。横長3:1の目安。",
    notes: [
      "表示環境によって上下左右が一部見切れる場合があります。",
      "重要な文字や顔は中央寄せにしてください。",
    ],
  },
  {
    id: "bluesky-post-16-9",
    service: "Bluesky",
    name: "投稿画像（16:9）",
    outputWidth: 1200,
    outputHeight: 675,
    description:
      "Bluesky投稿画像の16:9目安。タイムライン上での見切れ確認向け。",
    notes: [
      "Blueskyの投稿画像は複数の比率を扱えるため、これは代表的な16:9目安です。",
      "重要な要素は中央寄せにしてください。",
    ],
  },
  {
    id: "misskey-icon",
    service: "Misskey",
    name: "アイコン",
    outputWidth: 1000,
    outputHeight: 1000,
    safeArea: {
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "48 × 48", width: 48, height: 48, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Misskey系サービスのアイコン用目安。円形表示される場面を想定。",
    notes: [
      "Misskeyはインスタンスやテーマによって表示が異なる場合があります。",
      "これはMisskey系サービス向けの目安プリセットです。",
      "顔やロゴなど重要な要素は中央寄せにしてください。",
    ],
  },
  {
    id: "misskey-banner",
    service: "Misskey",
    name: "バナー",
    outputWidth: 1500,
    outputHeight: 500,
    description:
      "Misskey系サービスのプロフィールバナー用目安。",
    notes: [
      "Misskeyはインスタンスやテーマによって表示が異なる場合があります。",
      "これはMisskey系サービス向けの目安プリセットです。",
      "重要な文字や顔は中央寄せにしてください。",
    ],
  },
  {
    id: "mastodon-avatar",
    service: "Mastodon",
    name: "Avatar",
    outputWidth: 400,
    outputHeight: 400,
    safeArea: {
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "48 × 48", width: 48, height: 48, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Mastodonのアバター画像向けプリセットです。公式ドキュメントで400×400pxに縮小されることが案内されています。円形または丸みのある表示を想定して、外周の見切れを確認します。",
    notes: [
      "Mastodonはインスタンスやクライアントによって表示が異なる場合があります。",
      "円形または角丸での表示を想定して、四隅や外周には重要な情報を置かない方が安全です。",
      "顔・ロゴ・文字などの重要要素は中央に大きく配置するのがおすすめです。",
    ],
  },
  {
    id: "mastodon-header",
    service: "Mastodon",
    name: "Header",
    outputWidth: 1500,
    outputHeight: 500,
    description:
      "Mastodonのヘッダー画像向けプリセットです。公式ドキュメントで1500×500pxに縮小されることが案内されています。",
    notes: [
      "Mastodonはインスタンスやクライアントによって表示が異なる場合があります。",
      "横長のヘッダー画像のため、重要な文字や顔は中央寄りに配置するのがおすすめです。",
      "端末や表示環境によって端が見切れる可能性があります。",
    ],
  },
  {
    id: "vrchat-world-thumbnail",
    service: "VRChat",
    name: "World Thumbnail",
    outputWidth: 1200,
    outputHeight: 900,
    description:
      "VRChatのワールドサムネイル向けプリセットです。VRChat Wikiで案内されている1200×900px（4:3）のサイズで見切れを確認します。",
    notes: [
      "ワールド名や主要ビジュアルは中央寄りに配置するのがおすすめです。",
      "サムネイルとして縮小表示されるため、細かい文字や細い線は見えにくくなる場合があります。",
    ],
  },
  {
    id: "vrchat-group-banner",
    service: "VRChat",
    name: "Group Banner（暫定）",
    outputWidth: 1920,
    outputHeight: 1080,
    description:
      "VRChatのグループバナー向けの暫定プリセットです。表示場所によってトリミングが変わる可能性があります。",
    notes: [
      "VRChat公式に明確なバナーサイズの案内が確認しづらいため、16:9の目安として設定しています。",
      "表示場所によって見切れの範囲が変わる可能性があります。重要な要素は中央寄りに配置してください。",
    ],
  },
  {
    id: "facebook-page-cover",
    service: "Facebook",
    name: "ページカバー",
    outputWidth: 851,
    outputHeight: 315,
    description:
      "Facebookページのカバー画像向けプリセットです。横長のカバー画像として見切れを確認します。",
    notes: [
      "PCとスマホで表示範囲が異なる場合があるため、重要な文字やロゴは中央寄りに配置するのがおすすめです。",
      "左下付近にはプロフィール画像が重なる場合があります。",
    ],
  },
  {
    id: "facebook-profile-image",
    service: "Facebook",
    name: "プロフィール画像",
    outputWidth: 320,
    outputHeight: 320,
    safeArea: {
      x: 0,
      y: 0,
      width: 320,
      height: 320,
    },
    guideShape: "circle",
    previewSizes: [
      { label: "128 × 128", width: 128, height: 128, shape: "circle" },
      { label: "64 × 64", width: 64, height: 64, shape: "circle" },
      { label: "40 × 40", width: 40, height: 40, shape: "circle" },
      { label: "32 × 32", width: 32, height: 32, shape: "circle" },
    ],
    description:
      "Facebookプロフィール画像向けプリセットです。丸く表示されることを想定して、中央配置と外周の見切れを確認します。",
    notes: [
      "実際の表示では円形にトリミングされるため、四隅や外周には重要な情報を置かない方が安全です。",
      "顔・ロゴ・文字などの重要要素は中央に大きく配置するのがおすすめです。",
    ],
  },
  {
    id: "fantia-eye-catch",
    service: "Fantia",
    name: "アイキャッチ（暫定）",
    outputWidth: 688,
    outputHeight: 387,
    description:
      "Fantiaのアイキャッチ画像向けの暫定プリセットです。横幅688px・16:9目安のサイズで見切れを確認します。",
    notes: [
      "Fantia公式では横幅688px以上がきれいに表示されやすいとされています。高さ・比率は目安です。",
      "このプリセットは暫定設定です。実際のFantia表示を見ながら後で調整してください。",
      "重要な文字や顔は中央寄りに配置するのがおすすめです。",
    ],
  },
  {
    id: "fansly-header",
    service: "Fansly",
    name: "ヘッダー",
    outputWidth: 3261,
    outputHeight: 1126,
    description:
      "Fanslyのヘッダー画像向けプリセットです。横長のバナーとして見切れを確認します。",
    notes: [
      "横長表示のため、ロゴ・文字・顔などの重要要素は中央寄りに配置するのがおすすめです。",
      "端末や表示環境によって左右端が見切れる可能性があります。",
    ],
  },
  {
    id: "onlyfans-banner",
    service: "OnlyFans",
    name: "バナー（暫定）",
    outputWidth: 1797,
    outputHeight: 540,
    description:
      "OnlyFansのバナー画像向けの暫定プリセットです。複数のサイズ情報があるため目安として設定しています。",
    notes: [
      "OnlyFansのバナーサイズは複数の情報があり確定しづらいため、暫定プリセットとして扱っています。",
      "重要な文字や顔は中央寄りに配置するのがおすすめです。",
      "実際の表示を確認しながら位置調整してください。",
    ],
  },
];

export const serviceCategories: Record<string, string> = {
  "X（旧Twitter）": "SNS",
  Instagram: "SNS",
  TikTok: "SNS",
  Threads: "SNS",
  Bluesky: "SNS",
  Misskey: "SNS",
  Mastodon: "SNS",
  Facebook: "SNS",
  Discord: "コミュニケーション",
  Slack: "コミュニケーション",
  YouTube: "動画 / 配信",
  Twitch: "動画 / 配信",
  ニコニコ動画: "動画 / 配信",
  pixiv: "創作 / 投稿",
  FANBOX: "創作 / 投稿",
  BOOTH: "創作 / 投稿",
  "Ci-en": "創作 / 投稿",
  Skeb: "創作 / 投稿",
  note: "創作 / 投稿",
  Fantia: "クリエイター支援 / ファンコミュニティ",
  Fansly: "クリエイター支援 / ファンコミュニティ",
  OnlyFans: "クリエイター支援 / ファンコミュニティ",
  SoundCloud: "音楽",
  Spotify: "音楽",
  Steam: "ゲーム / ストア",
  "itch.io": "ゲーム / ストア",
  VRChat: "ゲーム / ストア",
  GitHub: "開発 / その他",
};
