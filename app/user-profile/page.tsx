'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Globe, 
  Edit, 
  Save, 
  X,
  Camera,
  Bookmark,
  MessageCircle,
  Heart,
  Settings,
  LogOut,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Menu,
  ChevronRight
} from 'lucide-react';

// Demo user credentials for login
const demoUser = {
  name: 'John Martinez',
  email: 'user@agrob.com',
  phone: '+1 (555) 123-4567',
  location: 'California, USA',
  bio: 'Passionate about sustainable farming and organic agriculture. I run a small organic farm and love sharing knowledge with the community.',
  website: 'https://johnfarm.com',
  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
  joinDate: '2024-01-15',
  socialMedia: {
    twitter: 'https://twitter.com/johnmartinez',
    linkedin: 'https://linkedin.com/in/johnmartinez',
    facebook: 'https://facebook.com/johnmartinez',
    instagram: 'https://instagram.com/johnmartinez',
    youtube: 'https://youtube.com/@johnmartinez',
    github: 'https://github.com/johnmartinez'
  },
  stats: {
    savedArticles: 12,
    comments: 45,
    likes: 128
  }
};

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [userInfo, setUserInfo] = useState(demoUser);
  const [activeTab, setActiveTab] = useState('profile');

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
    setIsEditing(false);
    showToastMessage('Profile updated successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo({...userInfo, avatar: imageUrl});
    }
  };

  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    github: Github
  };

  const menuItems = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'saved', name: 'Saved Articles', icon: Bookmark },
    { id: 'comments', name: 'Comments', icon: MessageCircle },
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
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src={userInfo.avatar}
              alt={userInfo.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">{userInfo.name}</h1>
              <p className="text-sm text-gray-600">{userInfo.email}</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Edit size={20} />
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
                <button
                  onClick={handleSave}
                  className="p-2 text-primary-400 hover:text-primary-600 transition-colors"
                >
                  <Save size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Image
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    width={120}
                    height={120}
                    className="w-30 h-30 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary-400 text-white p-2 rounded-full cursor-pointer hover:bg-primary-500 transition-colors">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">{userInfo.name}</h2>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bookmark size={16} className="text-primary-400" />
                    <span className="text-gray-600">Saved Articles</span>
                  </div>
                  <span className="font-semibold text-gray-900">{userInfo.stats.savedArticles}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={16} className="text-primary-400" />
                    <span className="text-gray-600">Comments</span>
                  </div>
                  <span className="font-semibold text-gray-900">{userInfo.stats.comments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart size={16} className="text-primary-400" />
                    <span className="text-gray-600">Likes</span>
                  </div>
                  <span className="font-semibold text-gray-900">{userInfo.stats.likes}</span>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu</h3>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={16} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}
                <button className="w-full flex items-center justify-between px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon size={16} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              {activeTab === 'profile' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                    <div className="lg:hidden">
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="btn-secondary flex items-center space-x-2"
                          >
                            <X size={16} />
                            <span>Cancel</span>
                          </button>
                          <button
                            onClick={handleSave}
                            className="btn-primary flex items-center space-x-2"
                          >
                            <Save size={16} />
                            <span>Save</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Mobile Profile Picture */}
                  <div className="lg:hidden text-center mb-6">
                    <div className="relative inline-block">
                      <Image
                        src={userInfo.avatar}
                        alt={userInfo.name}
                        width={100}
                        height={100}
                        className="w-25 h-25 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                      />
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-primary-400 text-white p-2 rounded-full cursor-pointer hover:bg-primary-500 transition-colors">
                          <Camera size={14} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <User size={16} className="text-gray-400" />
                            <span className="text-gray-900">{userInfo.name}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Mail size={16} className="text-gray-400" />
                            <span className="text-gray-900">{userInfo.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Phone size={16} className="text-gray-400" />
                            <span className="text-gray-900">{userInfo.phone}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userInfo.location}
                            onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} className="text-gray-400" />
                            <span className="text-gray-900">{userInfo.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      {isEditing ? (
                        <textarea
                          rows={4}
                          value={userInfo.bio}
                          onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className="text-gray-700">{userInfo.bio}</p>
                      )}
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={userInfo.website}
                          onChange={(e) => setUserInfo({...userInfo, website: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                          placeholder="https://example.com"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Globe size={16} className="text-gray-400" />
                          <a href={userInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-500">
                            {userInfo.website}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Social Media */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Social Media</label>
                      {isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Object.entries(userInfo.socialMedia).map(([platform, url]) => (
                            <div key={platform}>
                              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{platform}</label>
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => setUserInfo({
                                  ...userInfo, 
                                  socialMedia: {...userInfo.socialMedia, [platform]: e.target.value}
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                                placeholder={`${platform} URL`}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {Object.entries(userInfo.socialMedia).map(([platform, url]) => {
                            if (!url) return null;
                            const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                            return (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <IconComponent size={20} className="text-gray-600 group-hover:text-primary-400" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 capitalize">
                                  {platform}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Account Info */}
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Account Information</h4>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-700">Member since {userInfo.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'saved' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Saved Articles</h3>
                  <div className="text-center py-12">
                    <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No saved articles yet</h4>
                    <p className="text-gray-600 mb-4">Start saving articles you want to read later</p>
                    <Link href="/blogs" className="btn-primary">
                      Browse Articles
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Comments</h3>
                  <div className="text-center py-12">
                    <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
                    <p className="text-gray-600 mb-4">Join the conversation by commenting on articles</p>
                    <Link href="/blogs" className="btn-primary">
                      Browse Articles
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">New articles from followed authors</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Weekly newsletter</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" />
                          <span className="ml-2 text-sm text-gray-700">Comment replies</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Settings</label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Make profile public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-400 focus:ring-primary-400" />
                          <span className="ml-2 text-sm text-gray-700">Show activity status</span>
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
  );
}