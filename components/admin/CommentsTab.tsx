'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Trash2, CheckCircle, XCircle, X, Info } from 'lucide-react';
import Image from 'next/image';

const mockComments = [
  {
    id: '1',
    author: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Great article! I\'ve been implementing some of these practices on my farm and have seen significant improvements in soil health.',
    postTitle: 'Sustainable farming practices for better yields',
    status: 'Approved',
    date: '2024-12-15',
    replies: 2,
  },
  {
    id: '2',
    author: 'Maria Garcia',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The section on water conservation is particularly helpful. We\'re dealing with drought conditions and need to optimize our irrigation.',
    postTitle: 'Smart irrigation systems revolutionizing agriculture',
    status: 'Pending',
    date: '2024-12-14',
    replies: 0,
  },
  {
    id: '3',
    author: 'Anonymous User',
    email: 'spam@fake.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'This is spam content with inappropriate links and promotional material.',
    postTitle: 'Organic pest control methods that actually work',
    status: 'Spam',
    date: '2024-12-13',
    replies: 0,
  },
  {
    id: '4',
    author: 'Lisa Brown',
    email: 'lisa@example.com',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Thank you for sharing these insights. I\'m particularly interested in the organic certification process.',
    postTitle: 'Organic pest control methods that actually work',
    status: 'Approved',
    date: '2024-12-12',
    replies: 1,
  },
];

export default function CommentsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<any>(null);
  const [showCommentDetails, setShowCommentDetails] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');

  const filteredComments = mockComments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || comment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const showToastMessage = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleApproveComment = (comment: any) => {
    showToastMessage(`Comment by ${comment.author} approved!`);
  };

  const handleRejectComment = (comment: any) => {
    showToastMessage(`Comment by ${comment.author} rejected!`, 'warning');
  };

  const handleDeleteComment = () => {
    showToastMessage('Comment deleted successfully!');
    setShowDeleteConfirm(false);
    setCommentToDelete(null);
  };

  const handleViewPost = (comment: any) => {
    showToastMessage(`Opening post: ${comment.postTitle}`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white animate-slide-up ${
          toastType === 'success' ? 'bg-green-500' : 
          toastType === 'error' ? 'bg-red-500' : 'bg-yellow-500'
        }`}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Comments Management</h2>
            <p className="text-gray-600 mt-1">Moderate and manage user comments</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors group relative">
            <Info size={16} />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Approve, reject, or delete user comments
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Comments</p>
              <p className="text-2xl font-bold text-gray-900">8,932</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">8,456</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">234</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Spam</p>
              <p className="text-2xl font-bold text-gray-900">242</p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search comments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Spam">Spam</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{comment.author}</div>
                  <div className="text-sm text-gray-500">{comment.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  comment.status === 'Approved' 
                    ? 'bg-green-100 text-green-800'
                    : comment.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {comment.status}
                </span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <div className="text-sm text-gray-500">
                On: <button 
                  onClick={() => {
                    setSelectedComment(comment);
                    setShowCommentDetails(true);
                  }}
                  className="font-medium text-primary-400 hover:text-primary-500 cursor-pointer"
                >
                  {comment.postTitle}
                </button>
                {comment.replies > 0 && (
                  <span className="ml-4">{comment.replies} replies</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleApproveComment(comment)}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                >
                  <CheckCircle size={16} />
                  <span className="text-sm">Approve</span>
                </button>
                <button 
                  onClick={() => handleRejectComment(comment)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                >
                  <XCircle size={16} />
                  <span className="text-sm">Reject</span>
                </button>
                <button 
                  onClick={() => handleViewPost(comment)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Eye size={16} />
                  <span className="text-sm">View Post</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setCommentToDelete(comment);
                    setShowDeleteConfirm(true);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete Comment"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Details Modal */}
      {showCommentDetails && selectedComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCommentDetails(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Comment Details</h3>
              <button
                onClick={() => setShowCommentDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <Image
                  src={selectedComment.avatar}
                  alt={selectedComment.author}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedComment.author}</h4>
                  <p className="text-gray-600">{selectedComment.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedComment.status === 'Approved' 
                      ? 'bg-green-100 text-green-800'
                      : selectedComment.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedComment.status}
                  </span>
                </div>
              </div>

              {/* Comment Content */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Comment</h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedComment.content}</p>
                </div>
              </div>

              {/* Post Info */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Post</h5>
                <p className="text-gray-700">{selectedComment.postTitle}</p>
              </div>

              {/* Meta Info */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Details</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">{selectedComment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Replies:</span>
                    <span className="text-gray-900">{selectedComment.replies}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => handleApproveComment(selectedComment)}
                  className="btn-secondary text-green-600 hover:text-green-700"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleRejectComment(selectedComment)}
                  className="btn-secondary text-red-600 hover:text-red-700"
                >
                  Reject
                </button>
                <button 
                  onClick={() => {
                    setCommentToDelete(selectedComment);
                    setShowDeleteConfirm(true);
                    setShowCommentDetails(false);
                  }}
                  className="btn-secondary text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Comment</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this comment by <strong>{commentToDelete.author}</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}