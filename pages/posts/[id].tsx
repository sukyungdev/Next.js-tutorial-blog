import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';

const Post = ({ postData }: { title: string; date: string; contentHtml: string }) => {
  return (
    <div>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);

  return {
    props: {
      postData,
    },
  };
};
