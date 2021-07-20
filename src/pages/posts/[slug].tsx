import Head from 'next/head';
import Link from 'next/link';
import jwt from 'next-auth/jwt';
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getSession, useSession } from "next-auth/client";
import { getPostPrimic } from "services/prismic";
import { IPostsProps } from '.';
import styles from './post.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Post({ post }: IPostsProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(`Post useEffect: ${session?.activeSubscription}`)
    if (session?.activeSubscription === undefined) {
      router.push(`/posts/preview/${post.slug}`);
      return;
    }

  }, [post.slug, router, session])

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
  const { slug } = params;

   const post = await getPostPrimic(String(slug));

  return {
    props: {
      post
    }
  }
}
