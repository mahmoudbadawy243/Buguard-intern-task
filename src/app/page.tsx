"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "@/lib/postsSlice";
import type { AppDispatch, RootState } from "@/lib/store";
import { PostType } from "./_interfaces/home.type";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { allPosts, isLoading } = useSelector((state: RootState) => state.posts);
  
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const router = useRouter();
  function postInfo(id: string) {
    router.push(`/post/${id}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
          Explore Posts
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-purple-300 dark:bg-purple-700 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-purple-300 dark:bg-purple-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-purple-300 dark:bg-purple-700 rounded"></div>
                  <div className="h-4 bg-purple-300 dark:bg-purple-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts?.map((post: PostType) => (
              <div 
                key={post.id} 
                onClick={() => postInfo(post.id)} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-purple-100 dark:border-purple-900"
              >
                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.body}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                      Read more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
