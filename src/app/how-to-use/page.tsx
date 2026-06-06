import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "使い方 | 見切れチェッカー",
  description:
    "見切れチェッカーの使い方を説明します。画像のアップロードからPNG書き出しまでの手順を確認できます。",
};

const STEPS = [
  {
    step: 1,
    title: "画像をアップロード",
    description:
      "「画像を選択」ボタンから確認したい画像ファイルを選択します。PNG / JPG / WebP 形式に対応しています。",
  },
  {
    step: 2,
    title: "対象サービスを選択",
    description:
      "カテゴリ別のプルダウンから確認したいサービスを選択します。YouTube、X（旧Twitter）、Steam、pixiv など18サービスに対応しています。",
  },
  {
    step: 3,
    title: "用途プリセットを選択",
    description:
      "サムネイル、ヘッダー、アイコンなど、用途に合わせたプリセットを選択します。プリセットに合わせた画像サイズが自動で設定されます。",
  },
  {
    step: 4,
    title: "ドラッグで位置調整",
    description:
      "プレビュー上で画像をドラッグして、表示したい位置に調整します。スマホではタッチ操作で動かせます。",
  },
  {
    step: 5,
    title: "ズームを調整",
    description:
      "ズームスライダーまたはマウスホイールで拡大縮小できます。スマホではピンチイン・ピンチアウト操作にも対応しています。",
  },
  {
    step: 6,
    title: "安全領域ガイドを確認",
    description:
      "「安全領域ガイドを表示」をオンにすると、重要な要素を配置すべき範囲が青いガイドで表示されます。顔・ロゴ・テキストがガイド内に収まっているか確認できます。",
  },
  {
    step: 7,
    title: "PNG書き出し",
    description:
      "「PNG書き出し」ボタンでプレビューの状態をPNGファイルとして保存できます。「ガイド付きPNG書き出し」では安全領域ガイドを含めた確認用画像を書き出せます。",
  },
];

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:text-zinc-300"
          >
            見切れチェッカー
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-2 text-2xl font-bold">使い方</h1>
        <p className="mb-10 text-zinc-400">
          画像のアップロードからPNG書き出しまでの手順
        </p>

        <ol className="space-y-8">
          {STEPS.map(({ step, title, description }) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-300">
                {step}
              </span>
              <div>
                <p className="mb-1 font-semibold text-zinc-200">{title}</p>
                <p className="leading-relaxed text-zinc-400">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="mb-1 text-sm font-semibold text-zinc-300">補足</p>
          <ul className="mt-2 space-y-2 text-sm text-zinc-500">
            <li>・ 画像はサーバーに送信されず、ブラウザ内だけで処理されます</li>
            <li>・ 書き出したPNGはプレビューと同じ内容で保存されます</li>
            <li>・ ガイド付きPNGは最終確認・共有用の用途を想定しています</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
          >
            ツールを使ってみる
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-4 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <Link href="/" className="hover:text-zinc-300">
            ツールに戻る
          </Link>
          <span>/</span>
          <Link href="/about" className="hover:text-zinc-300">
            About
          </Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-zinc-300">
            プライバシーポリシー
          </Link>
          <span>/</span>
          <a
            href="https://github.com/ReineYumiria/mikire-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
