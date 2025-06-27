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
  Trash2,
  Info,
  User,
  Calendar,
  TrendingUp,
  DollarSign,
  CreditCard,
  Wallet,
  Menu,
  X
} from 'lucide-react';

// Demo author credentials
const demoAuthor = {
  name: 'Sarah Johnson',
  email: 'author@agrob.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  bio: 'Agricultural scientist with 15+ years of experience in sustainable farming practices.',
  joinDate: '2024-01-01',
  stats: {
    totalPosts: 15,
    totalViews: 12500,
    totalComments: 89,
    followers: 1250,
    earnings: 245.50,
    pendingEarnings: 89.25
  }
};

const authorPosts = [
  {
    id: '1',
    title: 'Sustainable farming practices for better yields',
    status: 'published',
    views: 1250,
    comments: 8,
    date: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
    earnings: 12.50
  },
  {
    id: '2',
    title: 'Smart irrigation systems revolutionizing agriculture',
    status: 'draft',
    views: 0,
    comments: 0,
    date: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
    earnings: 0
  },
  {
    id: '3',
    title: 'Organic pest control methods that actually work',
    status: 'review',
    views: 0,
    comments: 0,
    date: 'Dec 13, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
    earnings: 0
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

export default function AuthorPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'comments' | 'balance' | 'settings'>('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    paypal: '',
    bankAccount: '',
    upi: ''
  });

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeletePost = (postId: string) => {
    showToastMessage('Post deleted successfully!');
  };

  const handleEditPost = (postId: string) => {
    showToastMessage('Opening post editor...');
  };

  const handleViewPost = (postId: string) => {
    showToastMessage('Opening post...');
  };

  const handleWithdraw = () => {
    if (!paymentMethod) {
      showToastMessage('Please set up a payment method first!');
      return;
    }
    showToastMessage('Withdrawal request submitted!');
  };

  const handleSavePaymentDetails = () => {
    showToastMessage('Payment details saved successfully!');
  };

  const sidebarItems = [
    { id: 'overview', name: 'Dashboard', icon: BarChart3 },
    { id: 'posts', name: 'My Posts', icon: FileText },
    { id: 'comments', name: 'Comments', icon: MessageCircle },
    { id: 'balance', name: 'Balance', icon: Wallet },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white bg-green-500 animate-slide-up">
          {toastMessage}
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={demoAuthor.avatar}
              alt={demoAuthor.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{demoAuthor.name}</h2>
              <p className="text-sm text-gray-600">Author Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:shadow-none lg:border-r lg:border-gray-200`}>
          {/* Desktop Sidebar Header */}
          <div className="hidden lg:block p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <Image
                src={demoAuthor.avatar}
                alt={demoAuthor.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{demoAuthor.name}</h2>
                <p className="text-gray-600">Author</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            ))}
            <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8">
            {/* Stats Cards - Hidden on mobile except for overview tab */}
            <div className={`${activeTab === 'overview' ? 'block' : 'hidden lg:grid'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{demoAuthor.stats.totalPosts}</p>
                  </div>
                  <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-primary-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{demoAuthor.stats.totalViews.toLocaleString()}</p>
                  </div>
                  <Eye className="h-6 w-6 lg:h-8 lg:w-8 text-primary-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Comments</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{demoAuthor.stats.totalComments}</p>
                  </div>
                  <MessageCircle className="h-6 w-6 lg:h-8 lg:w-8 text-primary-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Earnings</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">${demoAuthor.stats.earnings}</p>
                  </div>
                  <DollarSign className="h-6 w-6 lg:h-8 lg:w-8 text-primary-400" />
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Tab Navigation - Mobile Dropdown */}
              <div className="lg:hidden border-b border-gray-200 p-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                >
                  <option value="overview">Overview</option>
                  <option value="posts">My Posts</option>
                  <option value="comments">Comments</option>
                  <option value="balance">Balance</option>
                  <option value="settings">Settings</option>
                </select>
              </div>

              {/* Tab Navigation - Desktop */}
              <div className="hidden lg:block border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'posts', name: 'My Posts' },
                    { id: 'comments', name: 'Comments' },
                    { id: 'balance', name: 'Balance' },
                    { id: 'settings', name: 'Settings' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary-400 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-4 lg:p-6">
                {activeTab === 'overview' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Welcome back, {demoAuthor.name}!</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-600">Published "Sustainable farming practices"</span>
                            <span className="text-gray-400">2 days ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-600">Received 3 new comments</span>
                            <span className="text-gray-400">1 day ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-gray-600">Draft saved: "Smart irrigation systems"</span>
                            <span className="text-gray-400">3 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Performance</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">This month's views</span>
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                      <h3 className="text-lg font-semibold text-gray-900">Your Posts</h3>
                      <Link href="/author/write" className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center">
                        <Plus size={16} />
                        <span>New Post</span>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {authorPosts.map((post) => (
                        <div key={post.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 rounded-lg">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={80}
                            height={80}
                            className="w-full sm:w-20 h-48 sm:h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : post.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {post.status}
                              </span>
                              <span>{post.views} views</span>
                              <span>{post.comments} comments</span>
                              <span>{post.date}</span>
                              <span className="text-green-600 font-medium">${post.earnings}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                            <button 
                              onClick={() => handleViewPost(post.id)}
                              className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                              title="View Post"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleEditPost(post.id)}
                              className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                              title="Edit Post"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete Post"
                            >
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
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                            <h4 className="font-medium text-gray-900">{comment.postTitle}</h4>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-700 mb-2">"{comment.comment}"</p>
                          <p className="text-sm text-gray-600">by {comment.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'balance' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings & Balance</h3>
                    
                    {/* Balance Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100">Available Balance</p>
                            <p className="text-2xl lg:text-3xl font-bold">${demoAuthor.stats.earnings}</p>
                          </div>
                          <Wallet className="h-8 w-8 text-green-200" />
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100">Pending Earnings</p>
                            <p className="text-2xl lg:text-3xl font-bold">${demoAuthor.stats.pendingEarnings}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-blue-200" />
                        </div>
                      </div>
                    </div>

                    {/* Earnings Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-blue-800 mb-2">How Earnings Work</h4>
                      <p className="text-sm text-blue-700">You earn $0.01 for every 1000 views on your published articles. Earnings are updated daily and can be withdrawn once you reach a minimum of $50.</p>
                    </div>

                    {/* Payment Method Setup */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                      <h4 className="font-medium text-gray-900 mb-4">Payment Method</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          >
                            <option value="">Choose payment method</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="upi">UPI (India)</option>
                          </select>
                        </div>

                        {paymentMethod === 'paypal' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Email</label>
                            <input
                              type="email"
                              value={paymentDetails.paypal}
                              onChange={(e) => setPaymentDetails({...paymentDetails, paypal: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                              placeholder="your-email@paypal.com"
                            />
                          </div>
                        )}

                        {paymentMethod === 'bank' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Details</label>
                            <textarea
                              value={paymentDetails.bankAccount}
                              onChange={(e) => setPaymentDetails({...paymentDetails, bankAccount: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                              rows={3}
                              placeholder="Account Number, IFSC Code, Bank Name, etc."
                            />
                          </div>
                        )}

                        {paymentMethod === 'upi' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                            <input
                              type="text"
                              value={paymentDetails.upi}
                              onChange={(e) => setPaymentDetails({...paymentDetails, upi: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                              placeholder="yourname@upi"
                            />
                          </div>
                        )}

                        {paymentMethod && (
                          <button
                            onClick={handleSavePaymentDetails}
                            className="btn-primary flex items-center space-x-2"
                          >
                            <CreditCard size={16} />
                            <span>Save Payment Details</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Withdraw Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleWithdraw}
                        disabled={demoAuthor.stats.earnings < 50}
                        className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                          demoAuthor.stats.earnings >= 50
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <DollarSign size={16} />
                        <span>Withdraw Earnings</span>
                      </button>
                      {demoAuthor.stats.earnings < 50 && (
                        <p className="text-sm text-gray-500 flex items-center">
                          Minimum withdrawal amount is $50
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <input
                          type="text"
                          defaultValue={demoAuthor.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          rows={4}
                          defaultValue={demoAuthor.bio}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">New comments on my posts</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Weekly earnings report</span>
                          </label>
                        </div>
                      </div>

                      <button className="btn-primary">
                        Save Settings
                      </button>
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