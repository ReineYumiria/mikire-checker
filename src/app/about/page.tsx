import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | 見切れチェッカー",
  description:
    "見切れチェッカーは、画像をアップロードして各サービスの表示範囲・安全領域をブラウザ内で確認できるWebツールです。",
};

const SERVICE_LIST = [
  { category: "SNS", services: ["X（旧Twitter）", "Instagram", "TikTok", "Bluesky", "Misskey"] },
  { category: "動画 / 配信", services: ["YouTube", "Twitch"] },
  { category: "創作 / 投稿", services: ["pixiv", "FANBOX", "BOOTH", "Ci-en", "Skeb", "note"] },
  { category: "音楽", services: ["SoundCloud"] },
  { category: "ゲーム / ストア", services: ["Steam", "itch.io"] },
  { category: "開発 / その他", services: ["GitHub", "Discord"] },
];

export default function AboutPage() {
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
        <h1 className="mb-2 text-2xl font-bold">About</h1>
        <p className="mb-8 text-zinc-400">見切れチェッカーについて</p>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            このツールについて
          </h2>
          <p className="leading-relaxed text-zinc-400">
            見切れチェッカーは、画像をアップロードして各サービスの表示範囲・安全領域をブラウザ内で確認できるWebツールです。
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            YouTube サムネイル、X（旧Twitter）ヘッダー、Steam カプセル画像、pixiv カバーなど、創作・配信・ゲーム制作・SNS・音楽活動向けのさまざまな用途に対応しています。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">特徴</h2>
          <ul className="space-y-2 text-zinc-400">
            <li>・ 画像はサーバーに送信されず、ブラウザ内だけで処理されます</li>
            <li>・ 各サービス向けの画像サイズをプリセットから選択できます</li>
            <li>・ 安全領域ガイドを表示して見切れを確認できます</li>
            <li>・ ドラッグ・ズームで画像の位置調整ができます</li>
            <li>・ スマホのピンチズームにも対応しています</li>
            <li>・ PNG書き出し・ガイド付きPNG書き出しができます</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            対応サービス
          </h2>
          <div className="space-y-4">
            {SERVICE_LIST.map(({ category, services }) => (
              <div key={category}>
                <p className="mb-1 text-sm font-medium text-zinc-300">
                  {category}
                </p>
                <p className="text-sm text-zinc-500">{services.join("、")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            プライバシー
          </h2>
          <p className="leading-relaxed text-zinc-400">
            アップロードした画像はサーバーに送信されません。すべての処理はブラウザ内で完結します。詳しくは
            <Link
              href="/privacy"
              className="ml-1 text-sky-400 hover:underline"
            >
              プライバシーポリシー
            </Link>
            をご確認ください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            作者 / ライセンス
          </h2>
          <p className="leading-relaxed text-zinc-400">
            作者：Reine Yumiria
          </p>
          <p className="mt-2 leading-relaxed text-zinc-400">
            ライセンス：MIT License
          </p>
          <p className="mt-2">
            <a
              href="https://github.com/ReineYumiria/mikire-checker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              GitHub リポジトリ
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-4 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <Link href="/" className="hover:text-zinc-300">
            ツールに戻る
          </Link>
          <span>/</span>
          <Link href="/how-to-use" className="hover:text-zinc-300">
            使い方
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
