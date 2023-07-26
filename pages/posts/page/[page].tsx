import Pagination from "@/components/Pagination/Pagination";
import SinglePost from "@/components/Post/SinglePost";
import { getNumberOfPages, getPostsByPage } from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }
  return {
    paths: params,
    fallback: "blocking",
  };
};

// SSG:ビルド時にあらかじめデータを取得しておく
export const getStaticProps: GetStaticProps = async (context) => {
  // ?オプショナルチェーン：オプショナルチェーン ?. を使うと、左側がnullishの場合にもエラーにならず、undefinedが返るため、短い書き方でプロパティにアクセスすることができます。
  const currentPage = context.params?.page;
  // parseIntでStringをInt(10進数)に変換
  const postsByPage = await getPostsByPage(
    parseInt(currentPage.toString(), 10)
  );

  const numberOfPage = await getNumberOfPages();

  return {
    props: {
      postsByPage,
      numberOfPage,
    },
    // ISR:60秒ごとにデータを更新する
    revalidate: 60,
  };
};

const BlogPageList = ({ postsByPage, numberOfPage }) => {
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
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postsByPage.map((post) => {
            return (
              <div key={post.id}>
                <SinglePost
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                  isPaginationPage={true}
                />
              </div>
            );
          })}
        </section>
        <Pagination numberOfPage={numberOfPage} />
      </main>
    </div>
  );
};

export default BlogPageList;
