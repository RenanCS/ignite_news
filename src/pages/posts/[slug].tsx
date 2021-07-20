import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getSession, useSession } from "next-auth/client";
import { getPostPrimic } from "services/prismic";
import { IPostsProps } from '.';
import styles from './post.module.scss';

export default function Post({ post }: IPostsProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          {post.linkMedium &&
            <Link href="">
              <a className={styles.postLink} href={post.linkMedium}>Link: {post.linkMedium}</a>
            </Link>
          }
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }): Promise<GetServerSidePropsResult<IPostsProps>> => {
  const session = await getSession({ req });
  const { slug } = params;


  if (session?.activeSubscription === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const post = await getPostPrimic(String(slug));

  return {
    props: {
      post
    }
  }
}

