import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Bookmark, Heart } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category?: string;
  featured?: boolean;
}

export default function BlogCard({ 
  id, 
  title, 
  excerpt, 
  author, 
  date, 
  image, 
  category,
  featured = false 
}: BlogCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/blog/${id}`}>
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer h-full flex flex-col group">
        <div className="relative">
          <Image 
            src={image} 
            alt={title}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
          />
          {category && (
            <span className="absolute top-4 left-4 bg-primary-400 text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full transition-all ${
                isSaved 
                  ? 'bg-primary-400 text-white' 
                  : 'bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-primary-400'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-red-500'
              }`}
              title={isLiked ? 'Unlike' : 'Like article'}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 flex-shrink-0">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {excerpt}
          </p>
          
          <div className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-500 font-medium transition-colors group-hover:translate-x-1 mt-auto">
            <span>Learn more</span>
            <ArrowRight size={16} className="transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}