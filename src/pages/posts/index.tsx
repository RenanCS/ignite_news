import { GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { getPostsPrimic } from 'services/prismic';
import { IPostsProps } from './interface';
import styles from './styles.module.scss';

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.map(post => (

              <a key={post.slug} href="#">
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>

            ))
          }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<IPostsProps>> => {
 const posts = await getPostsPrimic();

  return {
    props: {
      posts
    }
  }
}
