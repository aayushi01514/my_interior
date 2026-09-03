import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CommonHeader from "@/app/components/CommonHeader";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Post = {
  slug: string;
  title: any;
  date: any;
  content: string;
  frontimage?: string;
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post: Post | undefined = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <>
      <CommonHeader title={post.title} imgsrc={post.frontimage ?? ""} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-black">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-8">{post.date}</p>
        <MDXRemote source={post.content} />
        {/* <article className="prose prose-invert max-w-none">

        </article>

        <div>
          
        </div> */}

      </main>
    </>
  );
}
