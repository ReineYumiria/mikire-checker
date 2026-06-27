import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discordアイコン・バナーの見切れ確認ガイド | 見切れチェッカー",
  description:
    "Discordアイコンやバナーで見切れ確認が重要な理由、丸型トリミング、中央配置、文字や顔の置き方を説明します。",
};

export default function DiscordProfileImageGuidePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-zinc-300">見切れチェッカー</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-3 text-sm text-zinc-500">ガイド</p>
        <h1 className="mb-4 text-2xl font-bold">Discordアイコン・バナーの見切れ確認ガイド</h1>
        <p className="mb-10 leading-relaxed text-zinc-400">
          Discordでは、サーバーアイコンやプロフィール画像、バナーが小さな表示から大きな表示までさまざまな場所で使われます。特にアイコンは丸く表示される場面が多いため、四隅や外周に置いた情報が見えなくなることがあります。
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">見切れ確認が重要な理由</h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              Discordのアイコンは、サーバー一覧やプロフィール、通知、メンバー一覧などで小さく表示されます。細かい文字や外周に近いロゴは、縮小時に読み取れなかったり、丸型トリミングで切れたりしやすくなります。
            </p>
            <p>
              バナー画像も横長表示のため、端に重要な文字や顔を置くと画面幅によって印象が変わります。アイコンとバナーのどちらも、中央に見せたい要素を置き、外側には余白を残す考え方が有効です。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">丸型トリミングと中央配置</h2>
          <ul className="space-y-3 leading-relaxed text-zinc-400">
            <li>・ サーバーアイコンやプロフィール画像は、正方形で作っても丸く表示される場面があります。</li>
            <li>・ 四隅は見えない前提で、顔、ロゴ、頭文字などは中央に大きく配置します。</li>
            <li>・ 文字を入れる場合は短くし、外周に沿わせず中央寄りに置くと読みやすくなります。</li>
            <li>・ バナーでは左右端や上下端に重要要素を寄せすぎず、中央付近に主役を置くと安定します。</li>
          </ul>
        </section>

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">見切れチェッカーで確認する手順</h2>
          <ol className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <li>1. Discord用に確認したい画像をアップロードします。</li>
            <li>2. カテゴリで「コミュニケーション」、サービスで「Discord」を選びます。</li>
            <li>3. サーバーアイコン、サーバーバナーなど目的に近いプリセットを選択します。</li>
            <li>4. アイコンの場合は丸型ガイドで、外周や四隅に重要要素が残っていないか確認します。</li>
            <li>5. バナーの場合は安全領域を見ながら、左右端に文字や顔を寄せすぎていないか確認します。</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">文字や顔を端に寄せすぎない注意点</h2>
          <p className="leading-relaxed text-zinc-400">
            Discordのアイコンは小さく表示されることが多いため、細かい文字を詰め込むより、ロゴや頭文字を大きく見せる方が判別しやすくなります。顔写真やキャラクターを使う場合は、目元や表情が中央に残るように配置し、髪や装飾が外周で切れても印象が崩れない構図にしてください。
          </p>
        </section>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-sky-400 hover:underline">ツールで確認する →</Link>
          <Link href="/how-to-use" className="text-sky-400 hover:underline">使い方を見る →</Link>
          <Link href="/guides/youtube-thumbnail-safe-area" className="text-sky-400 hover:underline">YouTubeガイド →</Link>
        </div>
      </main>
    </div>
  );
}