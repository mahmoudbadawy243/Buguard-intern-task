'use client';
import { getSpecificPost } from "@/lib/postsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function PostDetails({ params }: { params: { id: string } }) {
  
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { specificPost, isLoading } = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch(getSpecificPost(params.id));
  }, [dispatch, params.id]);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to posts
        </button>
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
            <div className="h-7 bg-purple-200 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-purple-200 rounded"></div>
              <div className="h-4 bg-purple-200 rounded w-5/6"></div>
              <div className="h-4 bg-purple-200 rounded w-4/6"></div>
            </div>
          </div>
        ) : specificPost ? (
          <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6 text-gray-800 ">
                {specificPost.title}
              </h1>
              <div className="prose prose-indigo max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {specificPost.body}
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {specificPost.id}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                      Post ID: {specificPost.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      From JSONPlaceholder API
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 ">Post not found</h2>
            <p className="mt-2 text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
          </div>
        )}
      </div>
    </main>
  );
}
