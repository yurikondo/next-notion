import SinglePost from "@/components/Post/SinglePost";
import { getPostsForTopPage } from "@/lib/notionAPI";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

// SSG:ビルド時にあらかじめデータを取得しておく
export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  return {
    props: {
      fourPosts,
    },
    // ISR:60秒ごとにデータを更新する
    revalidate: 60,
  };
};

export default function Home({ fourPosts }) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          NotionBlog 🚀
        </h1>
        {fourPosts.map((post, index: number) => {
          return (
            <div className="mx-4" key={index}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={false}
              />
            </div>
          );
        })}
      </main>
      <Link
        href="/"
        className="mb-6  block mt-3 px-5 lg:w-1/2 text-sky-900 cursor-pointer text-right mx-auto"
      >
        ←ホームに戻る
      </Link>
    </div>
  );
}
