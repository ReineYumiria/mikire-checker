import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "使い方 | 見切れチェッカー",
  description:
    "見切れチェッカーで画像をアップロードし、対象サービスを選び、安全領域を確認してPNGを書き出すまでの手順を説明します。",
};

const STEPS = [
  {
    title: "画像をアップロードする",
    description:
      "トップページの操作パネルから、確認したい画像ファイルを選択します。PNG、JPG、WebPなどの一般的な画像形式を利用できます。画像はサーバーへ送信されず、ブラウザ内で読み込まれます。",
  },
  {
    title: "対象サービス・用途を選ぶ",
    description:
      "カテゴリ、サービス、プリセットの順に選びます。YouTubeサムネイル、Twitterヘッダー、Discordアイコンのように、用途によって比率や見切れやすい位置が異なります。",
  },
  {
    title: "位置・ズーム・回転を調整する",
    description:
      "プレビュー上で画像をドラッグして位置を動かし、ズームや回転で構図を整えます。スマホではタッチ操作やピンチ操作にも対応しています。",
  },
  {
    title: "安全領域を確認する",
    description:
      "安全領域ガイドを表示し、顔、文字、ロゴ、商品名など重要な要素が端に寄りすぎていないか確認します。丸型アイコンでは四隅や外周が見えなくなる点に注意してください。",
  },
  {
    title: "PNGとして書き出す",
    description:
      "問題がなければPNG書き出しを行います。確認用として安全領域ガイドを含めたPNGを書き出すこともできます。投稿用には通常のPNG、共有用にはガイド付きPNGを使い分けると便利です。",
  },
];

export default function HowToUsePage() {
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
        <h1 className="mb-2 text-2xl font-bold">見切れチェッカーの使い方</h1>
        <p className="mb-10 text-zinc-400">
          画像のアップロードからPNG書き出しまでの基本手順です。
        </p>

        <ol className="space-y-8">
          {STEPS.map(({ title, description }, index) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-300">
                {index + 1}
              </span>
              <div>
                <p className="mb-1 font-semibold text-zinc-200">{title}</p>
                <p className="leading-relaxed text-zinc-400">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">
            うまく表示されない場合の確認ポイント
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <li>・ 画像ファイルが壊れていないか、別の画像で読み込みを試してください。</li>
            <li>・ ファイルサイズが大きい場合、ブラウザや端末のメモリ不足で表示が重くなることがあります。</li>
            <li>・ 古いブラウザでは保存先選択に対応していない場合があります。その場合は通常のダウンロードとして保存されます。</li>
            <li>・ 書き出し結果が想定と違う場合は、選択中のサービスとプリセットが目的に合っているか確認してください。</li>
            <li>・ 安全領域は見切れ確認の目安です。投稿前には、可能であれば実際のサービス上のプレビューも確認してください。</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">用途別のヒント</h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              YouTubeサムネイルは一覧表示で小さく見られることが多いため、文字を大きくし、顔や重要な被写体を中央寄りに置くと確認しやすくなります。
            </p>
            <p>
              TwitterヘッダーやDiscordバナーのような横長画像は、PCとスマホで表示範囲が変わりやすい画像です。左右端やアイコン周辺には重要な文字を置きすぎないようにしてください。
            </p>
            <p>
              プロフィール画像やサーバーアイコンは丸型に表示されることが多いため、四隅に情報を置かず、顔やロゴを中央に大きく配置するのがおすすめです。
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-sky-400 hover:underline">ツールを使う →</Link>
          <Link href="/guides/youtube-thumbnail-safe-area" className="text-sky-400 hover:underline">YouTubeガイド →</Link>
          <Link href="/guides/twitter-header-safe-area" className="text-sky-400 hover:underline">Twitterヘッダーガイド →</Link>
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-4 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <Link href="/" className="hover:text-zinc-300">ツールに戻る</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-zinc-300">About</Link>
          <span>/</span>
          <Link href="/contact" className="hover:text-zinc-300">お問い合わせ</Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-zinc-300">プライバシーポリシー</Link>
        </div>
      </footer>
    </div>
  );
}