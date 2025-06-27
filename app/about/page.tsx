import Link from 'next/link';
import Image from 'next/image';
import { Users, Target, Award, Globe, ArrowRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Agricultural scientist with 15+ years of experience in sustainable farming practices.',
  },
  {
    name: 'Mike Davis',
    role: 'Head of Technology',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Expert in smart farming technologies and IoT solutions for agriculture.',
  },
  {
    name: 'Emily Chen',
    role: 'Content Director',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Specialist in organic farming methods and environmental sustainability.',
  },
  {
    name: 'David Wilson',
    role: 'Research Lead',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Climate change researcher focused on resilient crop development.',
  },
];

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Innovation',
    description: 'We constantly seek new ways to improve farming practices through technology and research.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Sustainability',
    description: 'Our commitment to environmental protection drives everything we do.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community',
    description: 'We believe in building a strong community of farmers and agricultural professionals.',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Excellence',
    description: 'We strive for the highest quality in our content and recommendations.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-400 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Agrob
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering farmers worldwide with sustainable agriculture insights and innovative farming solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Agrob, we&apos;re dedicated to transforming agriculture through sustainable practices and cutting-edge technology. 
                Our mission is to provide farmers, researchers, and agricultural professionals with the knowledge and tools they need 
                to create a more sustainable and productive future.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that sustainable farming is not just about protecting the environment—it&apos;s about creating resilient 
                agricultural systems that can feed the world while preserving our planet for future generations.
              </p>
              <Link href="/blogs" className="btn-primary inline-flex items-center space-x-2">
                <span>Explore Our Articles</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div>
              <Image
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sustainable farming"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide our work and shape our commitment to sustainable agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 text-primary-400">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience in agriculture, technology, and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-green-100">Articles Published</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-green-100">Active Readers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">25+</h3>
              <p className="text-green-100">Expert Authors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">15+</h3>
              <p className="text-green-100">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Be part of the sustainable agriculture movement. Connect with like-minded farmers and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary">
              Get Started Today
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}