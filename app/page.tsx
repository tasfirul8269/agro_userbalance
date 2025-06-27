'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import { ArrowRight, TrendingUp, Users, BookOpen, Award, Star, Quote } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Sustainable Future Insights',
    subtitle: 'Discover innovative farming techniques that protect our environment while maximizing yield',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Smart Agriculture Solutions',
    subtitle: 'Explore cutting-edge technology transforming modern farming practices',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Organic Farming Excellence',
    subtitle: 'Learn about organic methods that ensure healthy crops and soil preservation',
  },
];

const trendingArticles = [
  {
    id: '1',
    title: 'Delivery is reschedule for the next available time slot.',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'John Smith',
    date: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Agriculture',
  },
  {
    id: '2',
    title: 'Sustainable farming practices for better yields',
    excerpt: 'Discover how modern sustainable farming techniques can improve crop yields while protecting the environment.',
    author: 'Sarah Johnson',
    date: 'Dec 14, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sustainability',
  },
  {
    id: '3',
    title: 'Smart irrigation systems revolutionizing agriculture',
    excerpt: 'Learn about the latest smart irrigation technologies that are helping farmers optimize water usage.',
    author: 'Mike Davis',
    date: 'Dec 13, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
  },
  {
    id: '4',
    title: 'Organic pest control methods that actually work',
    excerpt: 'Explore natural and organic pest control solutions that protect crops without harmful chemicals.',
    author: 'Emily Chen',
    date: 'Dec 12, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Organic',
  },
  {
    id: '5',
    title: 'Climate-resilient crops for changing weather patterns',
    excerpt: 'Understanding how to select and grow crops that can withstand climate change challenges.',
    author: 'David Wilson',
    date: 'Dec 11, 2024',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Climate',
  },
  {
    id: '6',
    title: 'The future of vertical farming in urban areas',
    excerpt: 'How vertical farming is bringing agriculture to cities and revolutionizing food production.',
    author: 'Lisa Brown',
    date: 'Dec 10, 2024',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Innovation',
  },
];

const featuredAuthors = [
  {
    name: 'Dr. Sarah Johnson',
    expertise: 'Sustainable Agriculture',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    articles: 24,
    followers: '12.5K'
  },
  {
    name: 'Mike Davis',
    expertise: 'Smart Farming Tech',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    articles: 18,
    followers: '8.2K'
  },
  {
    name: 'Emily Chen',
    expertise: 'Organic Methods',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    articles: 31,
    followers: '15.7K'
  },
];

const testimonials = [
  {
    name: 'John Martinez',
    role: 'Farm Owner',
    content: 'The insights from Agrob have transformed my farming practices. My yields have increased by 30% while reducing environmental impact.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Lisa Thompson',
    role: 'Agricultural Consultant',
    content: 'Agrob is my go-to resource for staying updated with the latest sustainable farming trends and technologies.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0">
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link href="/blogs" className="btn-primary inline-flex items-center space-x-2 animate-slide-up">
                <span>Learn More</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary-400' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Articles Published</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600">Active Readers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Expert Authors</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Reader Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Articles Section - Fixed Grid Alignment */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Trending Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common trends. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* Fixed Grid Layout - Consistent 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingArticles.map((article) => (
              <BlogCard key={article.id} {...article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blogs" className="btn-secondary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Authors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Authors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our expert contributors who share their knowledge and insights in sustainable agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAuthors.map((author, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <Image
                  src={author.image}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h3>
                <p className="text-primary-400 font-medium mb-4">{author.expertise}</p>
                <div className="flex justify-center space-x-6 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-gray-900">{author.articles}</span>
                    <p>Articles</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{author.followers}</span>
                    <p>Followers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated with Latest Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and get the latest articles, tips, and trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Readers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from farmers and agricultural professionals who have benefited from our insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <Quote className="w-8 h-8 text-primary-400 mb-4" />
                <p className="text-gray-700 mb-6 text-lg italic">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using sustainable practices to improve their yields and protect the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-primary-400 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-colors">
              Get Started Today
            </Link>
            <Link href="/about" className="border-2 border-white text-white hover:bg-white hover:text-primary-400 px-8 py-3 rounded-full font-medium transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}