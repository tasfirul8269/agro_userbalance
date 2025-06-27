'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, Eye, Plus, X, Upload, Tag, Save, Send, Info } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const mockPosts = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    author: 'Sarah Johnson',
    status: 'Published',
    category: 'Sustainability',
    publishDate: '2024-12-15',
    views: 1250,
    comments: 23,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Discover how modern sustainable farming techniques can improve crop yields while protecting the environment.',
    content: '<p>This is the full content of the sustainable farming article...</p>',
    tags: ['sustainable', 'farming', 'environment']
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    author: 'Mike Davis',
    status: 'Published',
    category: 'Technology',
    publishDate: '2024-12-14',
    views: 980,
    comments: 15,
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Learn about the latest smart irrigation technologies that are helping farmers optimize water usage.',
    content: '<p>This is the full content of the smart irrigation article...</p>',
    tags: ['technology', 'irrigation', 'smart-farming']
  },
  {
    id: '3',
    title: 'Organic pest control methods that actually work',
    author: 'Emily Chen',
    status: 'Draft',
    category: 'Organic',
    publishDate: '2024-12-13',
    views: 0,
    comments: 0,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Explore natural and organic pest control solutions that protect crops without harmful chemicals.',
    content: '<p>This is the full content of the organic pest control article...</p>',
    tags: ['organic', 'pest-control', 'natural']
  },
  {
    id: '4',
    title: 'Climate-resilient crops for changing weather patterns',
    author: 'David Wilson',
    status: 'Review',
    category: 'Climate',
    publishDate: '2024-12-12',
    views: 0,
    comments: 0,
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Understanding how to select and grow crops that can withstand climate change challenges.',
    content: '<p>This is the full content of the climate-resilient crops article...</p>',
    tags: ['climate', 'resilient', 'crops']
  },
];

export default function PostsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<any>(null);
  const [postToEdit, setPostToEdit] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');
  const [isPreview, setIsPreview] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Sustainability',
    tags: [] as string[],
    coverImage: '',
    status: 'Draft'
  });

  const [newTag, setNewTag] = useState('');

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || post.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const showToastMessage = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    showToastMessage('Post created successfully!');
    setShowAddModal(false);
    setIsPreview(false);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'Sustainability',
      tags: [],
      coverImage: '',
      status: 'Draft'
    });
  };

  const handleDeletePost = () => {
    showToastMessage('Post deleted successfully!');
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const handleEditPost = (e: React.FormEvent) => {
    e.preventDefault();
    showToastMessage('Post updated successfully!');
    setShowEditModal(false);
    setPostToEdit(null);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim() && !newPost.tags.includes(newTag.trim())) {
      setNewPost({...newPost, tags: [...newPost.tags, newTag.trim()]});
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPost({...newPost, tags: newPost.tags.filter(tag => tag !== tagToRemove)});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewPost({...newPost, coverImage: imageUrl});
    }
  };

  const handleSaveDraft = () => {
    setNewPost({...newPost, status: 'Draft'});
    showToastMessage('Draft saved successfully!');
  };

  const handlePublish = () => {
    setNewPost({...newPost, status: 'Published'});
    showToastMessage('Post published successfully!');
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
            <h2 className="text-2xl font-bold text-gray-900">Posts Management</h2>
            <p className="text-gray-600 mt-1">Manage blog posts and articles</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors group relative">
            <Info size={16} />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Create, edit, and manage all blog posts
            </div>
          </button>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>New Post</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">1,156</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Review</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <div className="w-6 h-6 bg-purple-500 rounded"></div>
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
                placeholder="Search posts..."
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
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Review">In Review</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="All">All Categories</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Technology">Technology</option>
            <option value="Organic">Organic</option>
            <option value="Climate">Climate</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Post</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Author</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Stats</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{post.author}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'Draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{post.views} views</div>
                    <div className="text-sm text-gray-500">{post.comments} comments</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{post.publishDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => showToastMessage('Viewing post...', 'success')}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View Post"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setPostToEdit(post);
                          setShowEditModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                        title="Edit Post"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setPostToDelete(post);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => {setShowAddModal(false); setIsPreview(false);}}></div>
            
            <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {!isPreview ? (
                <div className="px-6 py-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">Create New Post</h3>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsPreview(true)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Eye size={16} />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => {setShowAddModal(false); setIsPreview(false);}}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <form onSubmit={handleAddPost} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
                      <input
                        type="text"
                        required
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-lg"
                        placeholder="Enter your post title..."
                      />
                    </div>

                    {/* Cover Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <Upload size={16} />
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        {newPost.coverImage && (
                          <div className="relative">
                            <Image
                              src={newPost.coverImage}
                              alt="Cover preview"
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setNewPost({...newPost, coverImage: ''})}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                      <textarea
                        required
                        rows={3}
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        placeholder="Brief description of your post..."
                      />
                    </div>

                    {/* Category and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        >
                          <option value="Sustainability">Sustainability</option>
                          <option value="Technology">Technology</option>
                          <option value="Organic">Organic</option>
                          <option value="Climate">Climate</option>
                          <option value="Innovation">Innovation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={newPost.status}
                          onChange={(e) => setNewPost({...newPost, status: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        >
                          <option value="Draft">Draft</option>
                          <option value="Review">Review</option>
                          <option value="Published">Published</option>
                        </select>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {newPost.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                          >
                            <span>#{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-primary-400 hover:text-primary-600"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags (press Enter to add)..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                      />
                    </div>

                    {/* Content Editor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <ReactQuill
                          theme="snow"
                          value={newPost.content}
                          onChange={(content) => setNewPost({...newPost, content})}
                          modules={quillModules}
                          placeholder="Start writing your post..."
                          style={{ height: '400px' }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-3 pt-16 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {setShowAddModal(false); setIsPreview(false);}}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPreview(true)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Eye size={16} />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Save size={16} />
                        <span>Save Draft</span>
                      </button>
                      <button
                        type="button"
                        onClick={handlePublish}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Send size={16} />
                        <span>Publish</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Preview Mode */
                <div>
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Preview Mode</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsPreview(false)}
                          className="btn-secondary"
                        >
                          Back to Editor
                        </button>
                        <button
                          onClick={() => {setShowAddModal(false); setIsPreview(false);}}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {newPost.coverImage && (
                      <Image
                        src={newPost.coverImage}
                        alt="Cover"
                        width={1200}
                        height={400}
                        className="w-full h-64 object-cover rounded-lg mb-8"
                      />
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {newPost.title || 'Untitled Post'}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">{newPost.excerpt}</p>
                    <div className="prose prose-lg max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: newPost.content }} />
                    </div>
                    {newPost.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mt-8">
                        <Tag size={16} className="text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {newPost.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Post</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{postToDelete.title}</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEditModal && postToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowEditModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit Post</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  defaultValue={postToEdit.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  rows={3}
                  defaultValue={postToEdit.excerpt}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    defaultValue={postToEdit.category}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="Sustainability">Sustainability</option>
                    <option value="Technology">Technology</option>
                    <option value="Organic">Organic</option>
                    <option value="Climate">Climate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    defaultValue={postToEdit.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Review">Review</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}