import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

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

const Post = ({ post }) => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">{post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
          key={index}
        >
          {tag}
        </p>
      ))}

      <div className="mt-10 font-medium">
        <ReactMarkdown
          children={post.markdown.parent}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        ></ReactMarkdown>
        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900 cursor-pointer">
            ←ホームに戻る
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
