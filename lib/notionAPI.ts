import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
// console.log(process.env.NOTION_TOKEN);
// console.log(process.env.NOTION_cDATABASE_ID);
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    page_size: 100,
  });
  const allPosts = posts.results;
  return allPosts;
};
