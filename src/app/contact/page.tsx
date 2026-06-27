import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせ | 見切れチェッカー",
  description:
    "見切れチェッカーへの問い合わせ、不具合報告、機能要望についての案内ページです。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-zinc-300">
            見切れチェッカー
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 text-2xl font-bold">お問い合わせ</h1>
        <p className="mb-10 text-zinc-400">
          不具合報告、表示仕様の相談、追加してほしいプリセットの要望を受け付けるための案内ページです。
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">現在の受付方法</h2>
          <p className="leading-relaxed text-zinc-400">
            現時点ではサイト内フォームは準備中です。問い合わせフォームを設置するまでは、GitHubリポジトリのIssueや関連する連絡手段から、不具合報告・改善要望をお送りください。フォーム設置後は、このページから直接連絡できる導線を追加する予定です。
          </p>
          <p className="mt-4">
            <a href="https://github.com/ReineYumiria/mikire-checker" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
              GitHubリポジトリを開く →
            </a>
          </p>
        </section>

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">連絡時にあると助かる情報</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <li>・ 利用していた端末とブラウザ名</li>
            <li>・ 選択していたサービス名とプリセット名</li>
            <li>・ 画像が読み込めない、書き出せない、表示が崩れるなどの具体的な状況</li>
            <li>・ 追加してほしいサービスや画像用途がある場合、その用途と参考になる公式案内</li>
            <li>・ 安全領域が実際の表示とずれている場合、確認した画面や端末の情報</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">サイト改善について</h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              見切れチェッカーは、投稿前に画像の見え方を確認しやすくすることを目的にしています。サービス側の表示仕様は変わることがあるため、プリセットの安全領域や説明文は継続的に見直します。
            </p>
            <p>
              特にYouTube、Twitter、Discordなど利用者が多いサービスについては、実際の見え方に近づけるための情報を優先して整備していきます。追加してほしいガイドや、わかりにくい操作があれば改善候補として扱います。
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-sky-400 hover:underline">ツールに戻る →</Link>
          <Link href="/about" className="text-sky-400 hover:underline">このサイトについて →</Link>
          <Link href="/privacy" className="text-sky-400 hover:underline">プライバシーポリシー →</Link>
        </div>
      </main>
    </div>
  );
}