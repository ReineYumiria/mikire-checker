import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YouTubeサムネイルの見切れ確認ガイド | 見切れチェッカー",
  description:
    "YouTubeサムネイルで文字や顔を見切れさせないための考え方、見切れチェッカーでの確認手順、書き出し前チェックリストを説明します。",
};

export default function YouTubeThumbnailGuidePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-zinc-300">見切れチェッカー</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-3 text-sm text-zinc-500">ガイド</p>
        <h1 className="mb-4 text-2xl font-bold">YouTubeサムネイルの見切れ確認ガイド</h1>
        <p className="mb-10 leading-relaxed text-zinc-400">
          YouTubeサムネイルは、動画の内容を一瞬で伝えるための重要な画像です。動画ページ、検索結果、関連動画、ホーム画面など複数の場所で表示され、端末や画面幅によって見え方の印象も変わります。
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">見切れ確認が重要な理由</h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              サムネイルの端に文字や顔、商品、ロゴを寄せすぎると、縮小表示されたときに読みにくくなったり、UIの影響で窮屈に見えたりします。特にスマホでは表示サイズが小さいため、細い文字や端ぎりぎりの要素は意図より弱く見えることがあります。
            </p>
            <p>
              YouTubeサムネイル自体は16:9の画像として扱いやすい一方、一覧表示では周囲の情報と並んで見られます。クリック前に内容が伝わるよう、重要な被写体は中央寄りに置き、端には余白を残すのが基本です。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">文字や顔を端に寄せすぎない考え方</h2>
          <ul className="space-y-3 leading-relaxed text-zinc-400">
            <li>・ タイトル文字は上下左右の端から少し離し、縮小表示でも読める太さと大きさにします。</li>
            <li>・ 顔や表情を見せたい場合は、目や口など印象を決める部分が中央寄りに残るようにします。</li>
            <li>・ 商品、ゲーム画面、イラストの主役などは、端で切れる前提ではなく、余白を含めて構図を作ります。</li>
            <li>・ 背景装飾や矢印などは端に置いてもよいですが、意味を伝える要素は安全側へ寄せると安心です。</li>
          </ul>
        </section>

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">見切れチェッカーで確認する手順</h2>
          <ol className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <li>1. トップページでサムネイル画像をアップロードします。</li>
            <li>2. カテゴリで「動画 / 配信」、サービスで「YouTube」を選びます。</li>
            <li>3. プリセットで「サムネイル」を選択し、1280 × 720のプレビューを確認します。</li>
            <li>4. 文字、顔、ロゴが端に寄りすぎていないか確認します。</li>
            <li>5. 必要に応じて位置、ズーム、回転を調整し、PNGとして書き出します。</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">書き出し前のチェックリスト</h2>
          <ul className="space-y-3 leading-relaxed text-zinc-400">
            <li>・ サムネイルの主役が一目でわかる</li>
            <li>・ 文字が小さすぎず、スマホ表示でも読める</li>
            <li>・ 顔、ロゴ、商品名などが端で切れていない</li>
            <li>・ 背景と文字のコントラストが十分にある</li>
            <li>・ 書き出したPNGを開いて、意図した構図になっている</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-sky-400 hover:underline">ツールで確認する →</Link>
          <Link href="/how-to-use" className="text-sky-400 hover:underline">使い方を見る →</Link>
          <Link href="/guides/twitter-header-safe-area" className="text-sky-400 hover:underline">Twitterヘッダーガイド →</Link>
        </div>
      </main>
    </div>
  );
}