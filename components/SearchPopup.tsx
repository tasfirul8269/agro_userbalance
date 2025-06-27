'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
}

// Mock search data
const mockBlogs: SearchResult[] = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    excerpt: 'Discover how modern sustainable farming techniques can improve crop yields while protecting the environment.',
    author: 'Sarah Johnson',
    category: 'Sustainability',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    excerpt: 'Learn about the latest smart irrigation technologies that are helping farmers optimize water usage.',
    author: 'Mike Davis',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    title: 'Organic pest control methods that actually work',
    excerpt: 'Explore natural and organic pest control solutions that protect crops without harmful chemicals.',
    author: 'Emily Chen',
    category: 'Organic',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const titleMatches = mockBlogs.filter(blog => 
        blog.title.toLowerCase().includes(query)
      );
      
      const excerptMatches = mockBlogs.filter(blog => 
        !blog.title.toLowerCase().includes(query) && 
        blog.excerpt.toLowerCase().includes(query)
      );
      
      const searchResults = [...titleMatches, ...excerptMatches];
      setResults(searchResults);
      setIsLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  const handleResultClick = () => {
    onClose();
    setQuery('');
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Search Articles</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for articles, topics, or authors..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : query && results.length > 0 ? (
            <div className="py-4">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/blog/${result.id}`}
                  onClick={handleResultClick}
                  className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <Image
                    src={result.image}
                    alt={result.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-400 transition-colors line-clamp-1">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {result.excerpt}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                      <span>By {result.author}</span>
                      <span>•</span>
                      <span>{result.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query && results.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start typing to search</h3>
              <p className="text-gray-600">Find articles, topics, and authors</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        {!query && (
          <div className="p-6 bg-gray-50 rounded-b-2xl">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Popular searches</h4>
            <div className="flex flex-wrap gap-2">
              {['sustainable farming', 'organic methods', 'smart irrigation', 'climate change'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    performSearch(term);
                  }}
                  className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}