'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { Grid, List, Filter } from 'lucide-react';

const categories = ['All', 'Agriculture', 'Sustainability', 'Technology', 'Organic', 'Climate', 'Innovation'];
const tags = ['farming', 'sustainable', 'organic', 'technology', 'climate', 'irrigation', 'crops', 'soil'];

const allBlogs = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    excerpt: 'Discover how modern sustainable farming techniques can improve crop yields while protecting the environment for future generations.',
    author: 'Sarah Johnson',
    date: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sustainability',
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    excerpt: 'Learn about the latest smart irrigation technologies that are helping farmers optimize water usage and reduce costs.',
    author: 'Mike Davis',
    date: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Organic pest control methods that actually work',
    excerpt: 'Explore natural and organic pest control solutions that protect crops without harmful chemicals or environmental damage.',
    author: 'Emily Chen',
    date: 'Dec 13, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Organic',
  },
  {
    id: '4',
    title: 'Climate-resilient crops for changing weather patterns',
    excerpt: 'Understanding how to select and grow crops that can withstand climate change challenges and extreme weather events.',
    author: 'David Wilson',
    date: 'Dec 12, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Climate',
  },
  {
    id: '5',
    title: 'The future of vertical farming in urban areas',
    excerpt: 'How vertical farming is bringing agriculture to cities and revolutionizing food production in limited spaces.',
    author: 'Lisa Brown',
    date: 'Dec 11, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Innovation',
  },
  {
    id: '6',
    title: 'Soil health: The foundation of sustainable agriculture',
    excerpt: 'Learn why soil health is crucial for sustainable farming and discover practical methods to improve soil quality.',
    author: 'Robert Green',
    date: 'Dec 10, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Agriculture',
  },
];

export default function BlogsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const blogsPerPage = 6;
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h1>
          <p className="text-lg text-gray-600">
            Discover insights, tips, and innovations in sustainable agriculture
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-50 hover:text-primary-600 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {currentBlogs.length} of {filteredBlogs.length} articles
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Blog Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'space-y-6'
            } mb-8`}>
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}