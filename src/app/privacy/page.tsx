import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 見切れチェッカー",
  description: "見切れチェッカーのプライバシーポリシーです。",
};

export default function PrivacyPage() {
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
        <h1 className="mb-8 text-2xl font-bold">プライバシーポリシー</h1>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            画像データの取り扱い
          </h2>
          <p className="leading-relaxed text-zinc-400">
            本ツールで選択した画像は、サーバーには送信されません。画像の読み込み、プレビュー表示、位置調整、ズーム調整、PNG書き出しは、利用者のブラウザ内で処理されます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            アクセス解析・トラッキング
          </h2>
          <p className="leading-relaxed text-zinc-400">
            現時点では、本ツール独自のアクセス解析、ユーザー登録、Cookieを利用したトラッキングは導入していません。
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            ただし、本ツールはVercel上でホスティングされているため、サービス提供やセキュリティ維持のために、Vercel側でアクセスログ等が処理される場合があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            広告について
          </h2>
          <p className="leading-relaxed text-zinc-400">
            現時点では、広告の掲載は行っていません。
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            将来的にGoogle AdSense等の広告サービスを導入する可能性があります。広告を掲載する場合、広告配信事業者がCookieや類似技術を使用して、利用者の興味に基づく広告を表示することがあります。
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            広告サービスを導入した際は、このポリシーを更新して通知します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            外部サービス
          </h2>
          <p className="leading-relaxed text-zinc-400">
            本ツールは、ホスティング基盤としてVercelを利用しています。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            免責事項
          </h2>
          <p className="leading-relaxed text-zinc-400">
            本ツールの利用により発生した損害について、開発者は責任を負いません。本ツールの仕様や内容は、予告なく変更される場合があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            お問い合わせ
          </h2>
          <p className="leading-relaxed text-zinc-400">
            不具合報告や問い合わせは、
            <a
              href="https://github.com/ReineYumiria/mikire-checker/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-sky-400 hover:underline"
            >
              GitHubリポジトリのIssue
            </a>
            からお願いします。
          </p>
        </section>

        <p className="text-sm text-zinc-600">改定日：2026年6月6日</p>
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
          <Link href="/how-to-use" className="hover:text-zinc-300">
            使い方
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
