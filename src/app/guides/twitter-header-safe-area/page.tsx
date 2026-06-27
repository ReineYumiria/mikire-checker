import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twitterヘッダーの安全領域ガイド | 見切れチェッカー",
  description:
    "Twitterヘッダーで見切れが起きやすい理由、PC・スマホの表示差、アイコン周辺や左右端を避ける考え方を説明します。",
};

export default function TwitterHeaderGuidePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-zinc-300">見切れチェッカー</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-3 text-sm text-zinc-500">ガイド</p>
        <h1 className="mb-4 text-2xl font-bold">Twitterヘッダーの安全領域ガイド</h1>
        <p className="mb-10 leading-relaxed text-zinc-400">
          X（旧Twitter）のプロフィールヘッダーは横長で、プロフィールページの印象を大きく左右します。一方で、PCとスマホ、表示幅、プロフィールアイコンの重なりによって、重要な要素が見切れたり隠れたりしやすい画像でもあります。
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">見切れが起きやすい理由</h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              Twitterヘッダーは横に長い画像ですが、表示される画面の幅や端末によって上下左右の見え方が変わります。作成画面では問題なく見えても、スマホで見ると上下が詰まって見えたり、PCで見ると左右端の印象が変わったりすることがあります。
            </p>
            <p>
              さらにプロフィールアイコンがヘッダー左下付近に重なるため、その周辺に文字や顔、ロゴを置くと隠れてしまう可能性があります。重要な情報は、端やアイコン周辺を避けて配置するのが安全です。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">PC・スマホで表示差が出やすいポイント</h2>
          <ul className="space-y-3 leading-relaxed text-zinc-400">
            <li>・ スマホでは画面幅が狭いため、中央付近の印象が強くなります。</li>
            <li>・ PCでは横幅が広く見える一方、ヘッダー下部や左下のアイコン重なりに注意が必要です。</li>
            <li>・ 左右端に置いた文字やロゴは、表示環境によって端に寄りすぎて見えることがあります。</li>
            <li>・ 上下端に余白がない画像は、端末差で窮屈に見えやすくなります。</li>
          </ul>
        </section>

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">見切れチェッカーで確認する手順</h2>
          <ol className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <li>1. ヘッダーに使いたい画像をアップロードします。</li>
            <li>2. カテゴリで「SNS」、サービスで「X（旧Twitter）」を選びます。</li>
            <li>3. プリセットで「ヘッダー」を選択します。</li>
            <li>4. 安全領域ガイドを表示し、文字や顔が中央寄りに収まっているか確認します。</li>
            <li>5. 左下のアイコン周辺、左右端、上下端に重要要素を置きすぎていないか見直します。</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">配置の考え方</h2>
          <p className="leading-relaxed text-zinc-400">
            ヘッダー全体に背景や世界観を広げ、名前、キャッチコピー、ロゴ、顔などの重要要素は中央からやや右寄りに置くと、アイコン重なりの影響を受けにくくなります。左右端は装飾や余白として使い、読ませたい文字を置く場合は十分な余白を残してください。
          </p>
        </section>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-sky-400 hover:underline">ツールで確認する →</Link>
          <Link href="/how-to-use" className="text-sky-400 hover:underline">使い方を見る →</Link>
          <Link href="/guides/discord-profile-image" className="text-sky-400 hover:underline">Discordガイド →</Link>
        </div>
      </main>
    </div>
  );
}