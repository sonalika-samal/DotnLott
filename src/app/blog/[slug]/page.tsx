import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '../postsData';
import PostClient from './PostClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) {
    return {
      title: 'Article Not Found | DotnLott',
    };
  }
  return {
    title: `${post.title} | DotnLott Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': post.title,
    'description': post.metaDescription,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': 'Sonalika Samal',
      'jobTitle': 'Lead Systems Architect',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'DotnLott',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://dotnlott.com/logo-v2.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://dotnlott.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PostClient post={post} />
    </>
  );
}
