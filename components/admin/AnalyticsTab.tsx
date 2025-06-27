'use client';

import { useState } from 'react';
import { TrendingUp, Users, Eye, MessageCircle, Calendar, Download } from 'lucide-react';

const mockAnalytics = {
  overview: {
    totalViews: 245000,
    uniqueVisitors: 45000,
    totalComments: 8932,
    avgReadTime: '4.2 min',
  },
  topPosts: [
    {
      title: 'Sustainable farming practices for better yields',
      views: 12500,
      comments: 89,
      shares: 234,
    },
    {
      title: 'Smart irrigation systems revolutionizing agriculture',
      views: 9800,
      comments: 67,
      shares: 189,
    },
    {
      title: 'Organic pest control methods that actually work',
      views: 8900,
      comments: 54,
      shares: 156,
    },
  ],
  trafficSources: [
    { source: 'Direct', percentage: 65, visitors: 29250 },
    { source: 'Search Engines', percentage: 25, visitors: 11250 },
    { source: 'Social Media', percentage: 10, visitors: 4500 },
  ],
  demographics: {
    countries: [
      { name: 'United States', percentage: 35, visitors: 15750 },
      { name: 'Canada', percentage: 20, visitors: 9000 },
      { name: 'United Kingdom', percentage: 15, visitors: 6750 },
      { name: 'Australia', percentage: 12, visitors: 5400 },
      { name: 'Germany', percentage: 8, visitors: 3600 },
      { name: 'Others', percentage: 10, visitors: 4500 },
    ],
    devices: [
      { type: 'Desktop', percentage: 60, visitors: 27000 },
      { type: 'Mobile', percentage: 35, visitors: 15750 },
      { type: 'Tablet', percentage: 5, visitors: 2250 },
    ],
  },
};

export default function AnalyticsTab() {
  const [dateRange, setDateRange] = useState('30days');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Track your blog performance and audience insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalViews.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+15% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.uniqueVisitors.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalComments.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+23% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <MessageCircle className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Read Time</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.avgReadTime}</p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Overview</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-400" />
              </div>
              <p className="text-gray-500 font-medium">Traffic Chart</p>
              <p className="text-sm text-gray-400">Interactive chart visualization</p>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {mockAnalytics.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{source.source}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12">{source.percentage}%</span>
                  <span className="text-sm text-gray-500 w-16">{source.visitors.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Posts and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
          <div className="space-y-4">
            {mockAnalytics.topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary-400">#{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Audience Demographics</h3>
          
          {/* Countries */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Top Countries</h4>
            <div className="space-y-2">
              {mockAnalytics.demographics.countries.slice(0, 5).map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{country.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Device Types</h4>
            <div className="space-y-2">
              {mockAnalytics.demographics.devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{device.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}