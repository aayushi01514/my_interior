import CommonHeader from "@/app/components/CommonHeader";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <CommonHeader
        title="Start Your Interior Design Journey With 8R Studio Today!"
        imgsrc="/01.jpg"
      />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold mb-16 text-center text-black">
          Insights & Inspiration
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg transition-transform hover:-translate-y-2 hover:shadow-xl group"
            >
              {post.frontimage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-3xl">
                  <Image
                    src={post.frontimage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>
              )}
              <div className="px-6 py-6 flex flex-col justify-between h-full bg-gray-800">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-sm text-gray-400 line-clamp-3">
                    {/* Optional: add a summary or preview snippet here */}
                    Discover what’s possible when innovative interior design meets cutting-edge web development at 8R Studio.
                  </p>
                  <p className="mt-4 text-sm text-gray-400">{post.date}</p>
                </div>


              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
