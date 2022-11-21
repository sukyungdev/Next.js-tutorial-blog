import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import PostStyles from '../../styles/Post.module.css';

const Post = ({ postData }: { title: string; date: string; contentHtml: string }) => {
  return (
    <div className={`${PostStyles.container}`}>
      <article>
        <h1>{postData.title}</h1>
        <p>{postData.date}</p>
        <p
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          className={`${PostStyles.text}`}
        />
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
