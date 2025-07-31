import React, { useRef, useState } from 'react'; // Import useRef and useState
import {
  FileText,
  PlusCircle,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Star,
  Users,
  Zap,
  Award,
  Crown,
  ChevronLeft, // Added for carousel navigation
  ChevronRight, // Added for carousel navigation
  MessageCircle // Added for LinkedIn message generator
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
  isAuthenticated: boolean;
  onShowAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onPageChange,
  isAuthenticated,
  onShowAuth
}) => {
  const [currentSlide, setCurrentSlide] = useState(0); // State to track active slide
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for the carousel container

  const handleFeatureClick = (feature: string) => {
    if (!isAuthenticated && (feature === 'guided-builder' || feature === 'score-checker')) {
      onShowAuth();
      return;
    }
    onPageChange(feature);
  };

  const features = [
    {
      id: 'score-checker',
      title: 'Resume Score Check',
      subtitle: 'Get instant feedback',
      description: 'Upload your existing resume and get an instant ATS score with detailed analysis and improvement suggestions.',
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      hoverShadow: 'hover:shadow-blue-200/50',
      features: ['ATS Score Analysis', 'Improvement Tips', 'Keyword Check', 'Instant Results'],
      buttonText: 'Check My Resume',
      requiresAuth: true
    },
    {
      id: 'guided-builder',
      title: 'Build New Resume',
      subtitle: 'From scratch to perfect',
      description: 'Create a professional resume from scratch with our step-by-step guided builder. Perfect for freshers and students.',
      icon: <PlusCircle className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      hoverShadow: 'hover:shadow-green-200/50',
      features: ['Step-by-Step Guide', 'Multiple Templates', 'AI Enhancement', 'Download Ready'],
      buttonText: 'Start Building',
      requiresAuth: true
    },
    {
      id: 'optimizer',
      title: 'JD-Based Optimizer',
      subtitle: 'Job-specific optimization',
      description: 'Upload your resume and job description to get a perfectly tailored resume that matches the role requirements.',
      icon: <Target className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      hoverShadow: 'hover:shadow-purple-200/50',
      features: ['Job Matching', 'Keyword Optimization', 'ATS Compatible', 'Role Specific'],
      buttonText: 'Optimize Now',
      requiresAuth: false
    },
    {
      id: 'linkedin-generator',
      title: 'LinkedIn Message Generator',
      subtitle: 'AI-powered networking',
      description: 'Generate personalized LinkedIn connection requests, cold outreach messages, and follow-ups that get responses.',
      icon: <MessageCircle className="w-8 h-8" />,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      hoverShadow: 'hover:shadow-blue-200/50',
      features: ['Connection Requests', 'Cold Outreach', 'Follow-up Messages', 'Personalized Content'],
      buttonText: 'Generate Messages',
      requiresAuth: true
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Resumes Created', icon: <FileText className="w-5 h-5" /> },
    { number: '95%', label: 'Success Rate', icon: <TrendingUp className="w-5 h-5" /> },
    { number: '4.9/5', label: 'User Rating', icon: <Star className="w-5 h-5" /> },
    { number: '24/7', label: 'AI Support', icon: <Sparkles className="w-5 h-5" /> }
  ];

  // Carousel Navigation Functions
  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[0].clientWidth; // Get width of first card
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % features.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + features.length) % features.length;
    scrollToSlide(prevIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative container-responsive py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xl mr-4">
                <img
                  src="https://res.cloudinary.com/dlkovvlud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1751536902/a-modern-logo-design-featuring-primoboos_XhhkS8E_Q5iOwxbAXB4CqQ_HnpCsJn4S1yrhb826jmMDw_nmycqj.jpg"
                  alt="PrimoBoost AI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  PrimoBoost AI
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Resume Intelligence</p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Dream Job Starts with a
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Resume
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Choose your path to success. Whether you're building from scratch, optimizing for specific jobs, or just want to check your current resume score - we've got you covered.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 sm:p-3 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="container-responsive py-12 sm:py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Choose Your Resume Journey
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three powerful ways to create the perfect resume that gets you hired
          </p>
        </div>

        {/* Feature Cards Carousel Wrapper */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows (Mobile Only) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 md:hidden"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 md:hidden"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Feature Cards Container - Now a horizontally scrollable flex container on mobile */}
          <div
            ref={carouselRef} // Attach ref to the carousel container
            className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth pb-4 md:grid md:grid-cols-3 md:gap-6 lg:gap-8"
            // hide scrollbar for aesthetic, but keep functionality
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-6 sm:p-8 border-2 ${feature.borderColor} shadow-xl hover:shadow-2xl ${feature.hoverShadow} transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden
                         flex-shrink-0 w-full snap-center md:w-auto`} // Added mobile carousel classes
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>

                {/* Popular Badge for Middle Card */}
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full"> {/* Added flex-col h-full for consistent card height */}
                  {/* Icon */}
                  <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div className="mb-6 flex-grow"> {/* flex-grow to push button to bottom */}
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      {feature.subtitle}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleFeatureClick(feature.id)}
                    className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-xl text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105 transform shadow-lg mt-auto`} // mt-auto pushes button to bottom
                  >
                    <span>{feature.buttonText}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  {/* Auth Warning */}
                  {feature.requiresAuth && !isAuthenticated && (
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Sign in required to access this feature
                    </p>
                  )}
                </div>

                {/* Animated Background Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          {/* Pagination Dots (Mobile Only) */}
          <div className="flex justify-center items-center mt-6 space-x-2 md:hidden">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Features Teaser */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="container-responsive text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Powered by Advanced AI Technology
            </h3>
            <p className="text-lg text-blue-100 mb-8">
              Our intelligent system understands ATS requirements, job market trends, and recruiter preferences to give you the competitive edge.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="font-semibold mb-2">AI-Powered Analysis</h4>
                <p className="text-sm text-blue-200">Advanced algorithms analyze and optimize your resume</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-semibold mb-2">ATS Optimization</h4>
                <p className="text-sm text-blue-200">Ensure your resume passes all screening systems</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2">Expert Approved</h4>
                <p className="text-sm text-blue-200">Formats trusted by recruiters worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="container-responsive text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Land Your Dream Job?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of professionals who have already transformed their careers with PrimoBoost AI.
            </p>
            
            {!isAuthenticated ? (
              <button
                onClick={onShowAuth}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleFeatureClick('guided-builder')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Build New Resume
                </button>
                <button
                  onClick={() => handleFeatureClick('optimizer')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Optimize Existing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};