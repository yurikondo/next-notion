import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import React from "react";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

// SSG:ビルド時にあらかじめデータを取得しておく
export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    // ISR:60秒ごとにデータを更新する
    revalidate: 60,
  };
};

const Post = () => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">詳細記事ページ</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">2023/07/10</span>
      <br />
      <p className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block">
        Next.js
      </p>
      <div className="mt-10 font-medium">sぢ音kさんvlkdさんvかsんvsg</div>
    </section>
  );
};

export default Post;
