import { MessageCircle, Reply } from 'lucide-react';
import Image from 'next/image';

interface CommentCardProps {
  author: string;
  avatar: string;
  date: string;
  content: string;
  replies?: CommentCardProps[];
  onReply?: () => void;
}

export default function CommentCard({ 
  author, 
  avatar, 
  date, 
  content, 
  replies = [], 
  onReply 
}: CommentCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <div className="flex items-start space-x-4">
        <Image 
          src={avatar} 
          alt={author}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900">{author}</h4>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <p className="text-gray-700 mb-3">{content}</p>
          <button 
            onClick={onReply}
            className="inline-flex items-center space-x-1 text-primary-400 hover:text-primary-500 text-sm font-medium transition-colors"
          >
            <Reply size={14} />
            <span>Reply</span>
          </button>
        </div>
      </div>
      
      {replies.length > 0 && (
        <div className="ml-14 mt-4 space-y-4">
          {replies.map((reply, index) => (
            <CommentCard key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
}