import { GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { getPostsPrimic } from 'services/prismic';
import styles from './styles.module.scss';
import Link from 'next/link';

export interface IPost {
  slug: string,
  title: string,
  updatedAt: string,
  excerpt?: string,
  content?: string
  linkMedium?: string
}
export interface IPostsProps {
  posts?: IPost[],
  post?: IPost
}


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
              <Link key={post.slug} href={`/posts/preview/${post.slug}`}>
                <a>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>

              </Link>
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
