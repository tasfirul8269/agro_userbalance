'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CommentCard from '@/components/CommentCard';
import BlogCard from '@/components/BlogCard';
import { Calendar, User, Tag, Share2, Bookmark, ThumbsUp, MessageCircle, Heart } from 'lucide-react';

// Mock data - in real app, this would come from API
const blogPost = {
  id: '1',
  title: 'Sustainable farming practices for better yields',
  content: `
    <p>Sustainable farming has become more than just a buzzword in modern agriculture. It represents a fundamental shift towards practices that not only maintain productivity but also preserve our environment for future generations.</p>
    
    <h2>The Foundation of Sustainable Agriculture</h2>
    <p>At its core, sustainable farming focuses on three main pillars: environmental health, economic profitability, and social equity. These principles work together to create farming systems that are productive, environmentally sound, and economically viable.</p>
    
    <h3>Soil Health Management</h3>
    <p>Healthy soil is the foundation of any sustainable farming operation. Practices such as cover cropping, crop rotation, and reduced tillage help maintain soil structure, increase organic matter, and promote beneficial microbial activity.</p>
    
    <h3>Water Conservation Techniques</h3>
    <p>Efficient water use is crucial for sustainable agriculture. Drip irrigation, rainwater harvesting, and drought-resistant crop varieties are just a few methods farmers can employ to reduce water consumption while maintaining yields.</p>
    
    <h2>Integrated Pest Management</h2>
    <p>Rather than relying solely on chemical pesticides, sustainable farming employs integrated pest management (IPM) strategies. This approach combines biological, cultural, and chemical controls to manage pests effectively while minimizing environmental impact.</p>
    
    <p>The transition to sustainable farming practices may require initial investment and learning, but the long-term benefits for both farmers and the environment make it a worthwhile endeavor.</p>
  `,
  author: 'Sarah Johnson',
  authorBio: 'Sarah is an agricultural scientist with over 15 years of experience in sustainable farming practices. She holds a PhD in Soil Science and has published numerous research papers on regenerative agriculture.',
  authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  date: 'December 15, 2024',
  readTime: '8 min read',
  image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200',
  tags: ['sustainable', 'farming', 'agriculture', 'environment'],
  category: 'Sustainability',
};

const comments = [
  {
    author: 'John Smith',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: '2 days ago',
    content: 'Great article! I\'ve been implementing some of these practices on my farm and have seen significant improvements in soil health.',
    replies: [
      {
        author: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: '1 day ago',
        content: 'That\'s wonderful to hear, John! Which practices have you found most effective?',
      }
    ]
  },
  {
    author: 'Maria Garcia',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: '3 days ago',
    content: 'The section on water conservation is particularly helpful. We\'re dealing with drought conditions and need to optimize our irrigation.',
  }
];

const relatedPosts = [
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    excerpt: 'Learn about the latest smart irrigation technologies that are helping farmers optimize water usage.',
    author: 'Mike Davis',
    date: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Organic pest control methods that actually work',
    excerpt: 'Explore natural and organic pest control solutions that protect crops without harmful chemicals.',
    author: 'Emily Chen',
    date: 'Dec 13, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Organic',
  },
];

export default function BlogPost({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [isLoggedIn] = useState(false); // Mock login state
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    console.log('New comment:', newComment);
    setNewComment('');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/blogs" className="hover:text-primary-400 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-primary-400">{blogPost.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Image
                src={blogPost.authorAvatar}
                alt={blogPost.author}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{blogPost.date}</span>
            </div>
            <span>{blogPost.readTime}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                isLiked 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                isSaved 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-400 transition-colors px-4 py-2 rounded-full hover:bg-primary-50"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>

        {/* Tags */}
        <div className="flex items-center space-x-2 mb-8 pb-8 border-b border-gray-200">
          <Tag size={16} className="text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full hover:bg-primary-100 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-4">
            <Image
              src={blogPost.authorAvatar}
              alt={blogPost.author}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About {blogPost.author}
              </h3>
              <p className="text-gray-600 mb-4">{blogPost.authorBio}</p>
              <Link
                href={`/author/${blogPost.author.toLowerCase().replace(' ', '-')}`}
                className="text-primary-400 hover:text-primary-500 font-medium transition-colors"
              >
                View all posts by {blogPost.author}
              </Link>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageCircle size={24} />
              <span>Comments ({comments.length})</span>
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="oldest">Sort by: Oldest</option>
            </select>
          </div>

          {/* Comment Form */}
          {isLoggedIn ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-3">
                <button type="submit" className="btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
              <p className="text-gray-600 mb-4">
                Please log in to join the conversation
              </p>
              <Link href="/login" className="btn-primary">
                Sign In
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <CommentCard key={index} {...comment} />
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}