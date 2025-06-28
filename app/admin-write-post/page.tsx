'use client';

import { useState } from 'react';
import { Save, Eye, Send, Upload, Tag, X, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AdminWritePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('Sustainability');
  const [status, setStatus] = useState('Draft');
  const [author, setAuthor] = useState('Admin User');
  const [isPreview, setIsPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveDraft = () => {
    showToastMessage('Draft saved successfully!');
  };

  const handlePublish = () => {
    showToastMessage('Post published successfully!');
    setTimeout(() => {
      router.push('/admin-dashboard');
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-white">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white bg-green-500 animate-slide-up">
            {toastMessage}
          </div>
        )}

        {/* Preview Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Preview Mode</h1>
            <button
              onClick={() => setIsPreview(false)}
              className="btn-secondary"
            >
              Back to Editor
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {coverImage && (
            <Image
              src={coverImage}
              alt="Cover"
              width={1200}
              height={400}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-6 sm:mb-8"
            />
          )}
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title || 'Untitled Post'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span>By {author}</span>
            <span>•</span>
            <span>{status}</span>
          </div>
          {excerpt && (
            <p className="text-lg text-gray-600 mb-6">{excerpt}</p>
          )}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {tags.length > 0 && (
            <div className="flex items-center space-x-2 mt-8">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white bg-green-500 animate-slide-up">
          {toastMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Link 
              href="/admin-dashboard"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Post</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setIsPreview(true)}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePublish}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Publish</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base sm:text-lg"
            />
          </div>

          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
                <Upload size={16} />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {coverImage && (
                <div className="relative w-full sm:w-auto">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    width={80}
                    height={80}
                    className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setCoverImage('')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your post..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>

          {/* Category, Status, and Author */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="Draft">Draft</option>
                <option value="Review">Review</option>
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                >
                  <span>#{tag}</span>
                  <button
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="Start writing your post..."
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
            <Link
              href="/admin-dashboard"
              className="w-full sm:w-auto px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              onClick={() => setIsPreview(true)}
              className="w-full sm:w-auto btn-secondary flex items-center justify-center space-x-2"
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className="w-full sm:w-auto btn-secondary flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePublish}
              className="w-full sm:w-auto btn-primary flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}