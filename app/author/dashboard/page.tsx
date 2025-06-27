'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PenTool, 
  FileText, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const authorPosts = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    status: 'published',
    views: 1250,
    comments: 8,
    date: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    status: 'draft',
    views: 0,
    comments: 0,
    date: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const recentComments = [
  {
    id: '1',
    postTitle: 'Sustainable farming practices for better yields',
    author: 'John Smith',
    comment: 'Great article! Very informative.',
    date: '2 hours ago',
  },
  {
    id: '2',
    postTitle: 'Sustainable farming practices for better yields',
    author: 'Maria Garcia',
    comment: 'Thanks for sharing these insights.',
    date: '1 day ago',
  },
];

export default function AuthorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'comments'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Author Avatar"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Sarah Johnson</h2>
                  <p className="text-gray-600">Author</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link
                  href="/author/dashboard"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md bg-primary-50 text-primary-600 font-medium"
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/author/write"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <PenTool size={20} />
                  <span>Write New Post</span>
                </Link>
                <Link
                  href="/author/posts"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <FileText size={20} />
                  <span>My Posts</span>
                </Link>
                <Link
                  href="/author/comments"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>Comments</span>
                </Link>
                <Link
                  href="/author/settings"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
                <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/author/write" className="btn-primary w-full flex items-center justify-center space-x-2">
                  <Plus size={16} />
                  <span>New Post</span>
                </Link>
                <Link href="/author/posts" className="btn-secondary w-full">
                  View All Posts
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">{authorPosts.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">1,250</p>
                  </div>
                  <Eye className="h-8 w-8 text-primary-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Comments</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-primary-400" />
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'overview'
                        ? 'border-primary-400 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'posts'
                        ? 'border-primary-400 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Recent Posts
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'comments'
                        ? 'border-primary-400 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Recent Comments
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Welcome back, Sarah&apos;!</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-600">Published &quot;Sustainable farming practices&quot;</span>
                            <span className="text-gray-400">2 days ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-600">Received 3 new comments</span>
                            <span className="text-gray-400">1 day ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-gray-600">Draft saved: &quot;Smart irrigation systems&quot;</span>
                            <span className="text-gray-400">3 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Performance</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">This month&apos;s views</span>
                            <span className="font-semibold text-gray-900">1,250</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Engagement rate</span>
                            <span className="font-semibold text-gray-900">12.5%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Average read time</span>
                            <span className="font-semibold text-gray-900">4.2 min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'posts' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Your Posts</h3>
                      <Link href="/author/write" className="btn-primary flex items-center space-x-2">
                        <Plus size={16} />
                        <span>New Post</span>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {authorPosts.map((post) => (
                        <div key={post.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {post.status}
                              </span>
                              <span>{post.views} views</span>
                              <span>{post.comments} comments</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-primary-400 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary-400 transition-colors">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Comments</h3>
                    <div className="space-y-4">
                      {recentComments.map((comment) => (
                        <div key={comment.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{comment.postTitle}</h4>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-700 mb-2">&quot;{comment.comment}&quot;</p>
                          <p className="text-sm text-gray-600">by {comment.author}</p>
                        </div>
                      ))}
                    </div>
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