'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Search, Filter, Calendar, User, ArrowRight, Trash2, Eye } from 'lucide-react';

const savedArticles = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    excerpt: 'Discover how modern sustainable farming techniques can improve crop yields while protecting the environment.',
    author: 'Sarah Johnson',
    date: 'Dec 15, 2024',
    savedDate: 'Dec 16, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sustainability',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    excerpt: 'Learn about the latest smart irrigation technologies that are helping farmers optimize water usage.',
    author: 'Mike Davis',
    date: 'Dec 14, 2024',
    savedDate: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Organic pest control methods that actually work',
    excerpt: 'Explore natural and organic pest control solutions that protect crops without harmful chemicals.',
    author: 'Emily Chen',
    date: 'Dec 13, 2024',
    savedDate: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Organic',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: 'Climate-resilient crops for changing weather patterns',
    excerpt: 'Understanding how to select and grow crops that can withstand climate change challenges.',
    author: 'David Wilson',
    date: 'Dec 12, 2024',
    savedDate: 'Dec 13, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Climate',
    readTime: '7 min read'
  },
];

export default function SavedArticles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [articles, setArticles] = useState(savedArticles);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || article.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveArticle = (articleId: string) => {
    setArticles(articles.filter(article => article.id !== articleId));
  };

  const categories = ['All', 'Sustainability', 'Technology', 'Organic', 'Climate'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bookmark className="w-8 h-8 text-primary-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Saved Articles
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Your collection of saved articles for later reading
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search saved articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredArticles.length} saved article{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-primary-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <button
                    onClick={() => handleRemoveArticle(article.id)}
                    className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-red-500 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    title="Remove from saved"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Saved on {article.savedDate}
                    </span>
                    <Link 
                      href={`/blog/${article.id}`}
                      className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-500 font-medium transition-colors group"
                    >
                      <span>Read</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved articles found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start saving articles you want to read later'
              }
            </p>
            <Link href="/blogs" className="btn-primary">
              Browse Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}