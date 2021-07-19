import Prismic from '@prismicio/client'
import { FormatDatePost } from 'helper/formater';
import { IPost } from 'pages/posts';
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
    console.dir(post);

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: FormatDatePost(post.last_publication_date)
    } as IPost
  });

  return posts;
}

export async function getPostPreview(slug: string): Promise<IPost>{
  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publication', slug, {});

  const post: IPost =
    {
      slug: slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content.splice(0,3)  ),
      updatedAt: FormatDatePost(response.last_publication_date)
    };


  return post;
}

export async function getPostPrimic(slug: string): Promise<IPost> {
  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publication', slug, {});

  console.dir(response);

  const post: IPost =
    {
      slug: slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: FormatDatePost(response.last_publication_date),
      linkMedium: response.data.link_medium?.url ?? ''
    };


  return post;
}
