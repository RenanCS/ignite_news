import Prismic from '@prismicio/client'
import { FormatDatePost } from 'helper/formater';
import { IPost, IPostsProps } from 'pages/posts/interface';
import { RichText } from 'prismic-dom';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_API_ENDPOINT,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  );

  return prismic;
}

export async function getPostsPrimic(): Promise<IPost[]> {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: FormatDatePost(post.last_publication_date)
    } as IPost
  });

  return posts;
}
