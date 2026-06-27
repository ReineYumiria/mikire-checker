import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | 見切れチェッカー",
  description:
    "見切れチェッカーの目的、想定ユーザー、対応機能、画像をブラウザ内で処理する設計について説明します。",
};

const SERVICE_LIST = [
  { category: "SNS", services: ["X（旧Twitter）", "Instagram", "TikTok", "Threads", "Bluesky", "Misskey", "Mastodon", "Facebook"] },
  { category: "コミュニケーション", services: ["Discord", "Slack"] },
  { category: "動画 / 配信", services: ["YouTube", "Twitch", "ニコニコ動画"] },
  { category: "創作 / 投稿", services: ["pixiv", "FANBOX", "BOOTH", "Ci-en", "Skeb", "note"] },
  { category: "音楽", services: ["SoundCloud", "Spotify"] },
  { category: "ゲーム / ストア", services: ["Steam", "itch.io", "VRChat"] },
  { category: "開発 / その他", services: ["GitHub"] },
];

export default function AboutPage() {
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
        <h1 className="mb-2 text-2xl font-bold">見切れチェッカーについて</h1>
        <p className="mb-10 text-zinc-400">
          投稿前の画像確認を、登録不要で手早く行うためのWebツールです。
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">目的</h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              見切れチェッカーは、SNS、動画サイト、配信サービス、創作投稿サービスなどで使う画像が、表示枠の端で切れてしまわないかを事前に確認するために作られました。
            </p>
            <p>
              YouTubeのサムネイル、Twitterヘッダー、Discordのアイコンやバナーのように、同じ画像でもPC・スマホ・一覧表示・プロフィール表示で見え方が変わることがあります。公開後に文字や顔、ロゴが切れていることに気づくと修正に手間がかかるため、投稿前の確認を軽く済ませられる場所を目指しています。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">想定ユーザー</h2>
          <ul className="space-y-2 leading-relaxed text-zinc-400">
            <li>・ YouTubeやTwitchでサムネイル、チャンネル画像、配信用画像を作る人</li>
            <li>・ X（旧Twitter）、Instagram、Discordなどのプロフィール画像やヘッダーを整えたい人</li>
            <li>・ pixiv、note、BOOTH、Steamなどで作品・商品・ゲームの見せ方を確認したい人</li>
            <li>・ デザイナーへ依頼する前に、仮画像の配置や安全領域を確認したい人</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">できること</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="mb-2 font-semibold text-zinc-200">画像の表示確認</p>
              <p className="text-sm leading-relaxed text-zinc-400">
                選択したプリセットの比率やサイズに合わせて、画像がどのように収まるかを確認できます。
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="mb-2 font-semibold text-zinc-200">安全領域確認</p>
              <p className="text-sm leading-relaxed text-zinc-400">
                ヘッダーや丸型アイコンなど、見切れやすい用途では重要要素を置く目安をガイドで確認できます。
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="mb-2 font-semibold text-zinc-200">位置・ズーム・回転調整</p>
              <p className="text-sm leading-relaxed text-zinc-400">
                ドラッグ、ズーム、回転、反転を使って、投稿先に合う構図へ整えられます。
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="mb-2 font-semibold text-zinc-200">PNG書き出し</p>
              <p className="text-sm leading-relaxed text-zinc-400">
                調整後の画像をPNGとして保存できます。確認用にガイド付きPNGを書き出すこともできます。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">登録不要・ブラウザ内処理</h2>
          <p className="leading-relaxed text-zinc-400">
            見切れチェッカーは登録不要で利用できます。選択した画像はサーバーへ送信されず、画像の読み込み、Canvas上の表示、PNG書き出しはブラウザ内で完結します。詳しい考え方は
            <Link href="/privacy" className="mx-1 text-sky-400 hover:underline">プライバシーポリシー</Link>
            でも確認できます。
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">対応サービスの例</h2>
          <div className="space-y-4">
            {SERVICE_LIST.map(({ category, services }) => (
              <div key={category}>
                <p className="mb-1 text-sm font-medium text-zinc-300">{category}</p>
                <p className="text-sm text-zinc-500">{services.join("、")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-3 text-lg font-semibold text-zinc-200">補足情報</h2>
          <dl className="space-y-2 text-sm text-zinc-400">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-medium text-zinc-300">現在のバージョン：</dt>
              <dd>v1.20.2</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-medium text-zinc-300">最終更新：</dt>
              <dd>2026-06-27</dd>
            </div>
          </dl>
        </section>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-sky-400 hover:underline">ツールを使う →</Link>
          <Link href="/how-to-use" className="text-sky-400 hover:underline">使い方を見る →</Link>
          <Link href="/contact" className="text-sky-400 hover:underline">お問い合わせ →</Link>
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-4 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <Link href="/" className="hover:text-zinc-300">ツールに戻る</Link>
          <span>/</span>
          <Link href="/how-to-use" className="hover:text-zinc-300">使い方</Link>
          <span>/</span>
          <Link href="/contact" className="hover:text-zinc-300">お問い合わせ</Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-zinc-300">プライバシーポリシー</Link>
        </div>
      </footer>
    </div>
  );
}