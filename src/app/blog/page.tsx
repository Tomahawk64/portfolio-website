"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      title: "How I built RG Consultancy website",
      slug: "how-i-built-rg-consultancy",
      date: "2025-08-15",
      excerpt: "A deep dive into the architecture and decisions behind the Reddington Global Consultancy website using Next.js and Tailwind CSS."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Thoughts, tutorials, and insights on full-stack development.
        </p>

        <div className="space-y-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 text-primary-600 dark:text-primary-400">
                {post.title}
              </h2>
              <div className="text-sm text-gray-500 mb-4">{post.date}</div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <span className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center">
                Read more (Coming soon) &rarr;
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
