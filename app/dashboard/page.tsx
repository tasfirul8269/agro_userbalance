'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Bookmark, MessageCircle, Settings, LogOut, Heart } from 'lucide-react';

const savedBlogs = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    author: 'Sarah Johnson',
    date: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    author: 'Mike Davis',
    date: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const commentHistory = [
  {
    id: '1',
    blogTitle: 'Sustainable farming practices for better yields',
    comment: 'Great article! I\'ve been implementing some of these practices on my farm.',
    date: '2 days ago',
  },
  {
    id: '2',
    blogTitle: 'Smart irrigation systems revolutionizing agriculture',
    comment: 'The water conservation techniques mentioned here are very practical.',
    date: '3 days ago',
  },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'saved' | 'comments'>('saved');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">Reader</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md bg-primary-50 text-primary-600 font-medium"
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Settings size={20} />
                  <span>My Account</span>
                </Link>
                <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bookmark size={16} className="text-primary-400" />
                    <span className="text-gray-600">Saved Articles</span>
                  </div>
                  <span className="font-semibold text-gray-900">{savedBlogs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={16} className="text-primary-400" />
                    <span className="text-gray-600">Comments</span>
                  </div>
                  <span className="font-semibold text-gray-900">{commentHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart size={16} className="text-primary-400" />
                    <span className="text-gray-600">Liked Articles</span>
                  </div>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'saved'
                        ? 'border-primary-400 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Saved Articles
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'comments'
                        ? 'border-primary-400 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Comment History
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'saved' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Saved Articles</h3>
                    {savedBlogs.length > 0 ? (
                      <div className="space-y-4">
                        {savedBlogs.map((blog) => (
                          <div key={blog.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              width={80}
                              height={80}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                <Link href={`/blog/${blog.id}`} className="hover:text-primary-400 transition-colors">
                                  {blog.title}
                                </Link>
                              </h4>
                              <p className="text-sm text-gray-600">
                                By {blog.author} • {blog.date}
                              </p>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <Bookmark size={20} fill="currentColor" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No saved articles yet</h4>
                        <p className="text-gray-600 mb-4">Start saving articles you want to read later</p>
                        <Link href="/blogs" className="btn-primary">
                          Browse Articles
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Comment History</h3>
                    {commentHistory.length > 0 ? (
                      <div className="space-y-4">
                        {commentHistory.map((item) => (
                          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">
                              <Link href={`/blog/${item.id}`} className="hover:text-primary-400 transition-colors">
                                {item.blogTitle}
                              </Link>
                            </h4>
                            <p className="text-gray-700 mb-2">&quot;{item.comment}&quot;</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
                        <p className="text-gray-600 mb-4">Join the conversation by commenting on articles</p>
                        <Link href="/blogs" className="btn-primary">
                          Browse Articles
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}