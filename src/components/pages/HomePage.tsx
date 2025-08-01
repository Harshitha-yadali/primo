import React from 'react';
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
  MessageCircle,
  Check,
  Plus
} from 'lucide-react';
import { paymentService } from '../../services/paymentService';

// Define the type for a feature object for clarity and type-safety
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  requiresAuth: boolean;
}

interface HomePageProps {
  onPageChange: (page: string) => void;
  isAuthenticated: boolean;
  onShowAuth: () => void;
  onShowSubscriptionPlans: () => void;
  userSubscription: any; // New prop for user's subscription status
}

export const HomePage: React.FC<HomePageProps> = ({
  onPageChange,
  isAuthenticated,
  onShowAuth,
  onShowSubscriptionPlans,
  userSubscription // Destructure new prop
}) => {
  // Helper function to get plan icon based on icon string
  const getPlanIcon = (iconType: string) => {
    switch (iconType) {
      case 'crown': return <Crown className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'rocket': return <Award className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  // Helper function to check if a feature is available based on subscription
  const isFeatureAvailable = (featureId: string) => {
    if (!isAuthenticated) return false; // Must be authenticated to check subscription
    if (!userSubscription) return false; // No active subscription

    switch (featureId) {
      case 'optimizer':
        return userSubscription.optimizationsTotal > userSubscription.optimizationsUsed;
      case 'score-checker':
        return userSubscription.scoreChecksTotal > userSubscription.scoreChecksUsed;
      case 'guided-builder':
        return userSubscription.guidedBuildsTotal > userSubscription.guidedBuildsUsed;
      case 'linkedin-generator':
        return userSubscription.linkedinMessagesTotal > userSubscription.linkedinMessagesUsed;
      default:
        return false;
    }
  };

  const handleFeatureClick = (feature: Feature) => {
    console.log('Feature clicked:', feature.id);
    console.log('Feature requiresAuth:', feature.requiresAuth);
    console.log('User isAuthenticated:', isAuthenticated);
    console.log('User Subscription:', userSubscription);

    // If the feature requires an active plan (or credits) and the user doesn't have it
    if (!isFeatureAvailable(feature.id)) {
      // If not authenticated, prompt to sign in first
      if (!isAuthenticated) {
        onShowAuth();
        return;
      } else {
        // If authenticated but no credits/plan, show subscription plans
        onShowSubscriptionPlans(); // Show subscription plans for upgrade
        return; // Stop further execution
      }
    }

    console.log('User is authenticated or feature does not require auth. Navigating to page.');
    onPageChange(feature.id);
  };

  const features: Feature[] = [
    {
      id: 'optimizer',
      title: 'JD-Based Optimizer',
      description: 'Upload your resume and a job description to get a perfectly tailored resume.',
      icon: <Target className="w-6 h-6" />,
      requiresAuth: false
    },
    {
      id: 'score-checker',
      title: 'Resume Score Check',
      description: 'Get an instant ATS score with detailed analysis and improvement suggestions.',
      icon: <TrendingUp className="w-6 h-6" />,
      requiresAuth: true
    },
    {
      id: 'guided-builder',
      title: 'Guided Resume Builder',
      description: 'Create a professional resume from scratch with our step-by-step AI-powered builder.',
      icon: <PlusCircle className="w-6 h-6" />,
      requiresAuth: true
    },
    
    {
      id: 'linkedin-generator',
      title: 'LinkedIn Message Generator',
      description: 'Generate personalized messages for connection requests and cold outreach.',
      icon: <MessageCircle className="w-6 h-6" />,
      requiresAuth: true
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Resumes Created', icon: <FileText className="w-5 h-5" /> },
    { number: '95%', label: 'Success Rate', icon: <TrendingUp className="w-5 h-5" /> },
    { number: '4.9/5', label: 'User Rating', icon: <Star className="w-5 h-5" /> },
    { number: '24/7', label: 'AI Support', icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-inter">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative container-responsive py-12 sm:py-16 lg:py-20">
          <div className="text-left max-w-4xl mx-auto">
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

      {/* Main Features Section - Now with a consolidated frame */}
      <div className="container-responsive py-12 sm:py-16">
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4  text-center">
            Choose Your Resume Journey
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature)} // Pass the full feature object
              className={`card-hover p-6 flex flex-col items-start sm:flex-row sm:items-center justify-between transition-all duration-300 ${
                !isFeatureAvailable(feature.id) && isAuthenticated // If authenticated but no credits
                  ? 'opacity-70 cursor-not-allowed'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 rounded-xl p-3 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
                </div>
                <div>
                  <span className="text-lg font-bold text-secondary-900">{feature.title}</span>
                  <p className="text-sm text-secondary-700">
                    {!isFeatureAvailable(feature.id) && isAuthenticated
                      ? 'Upgrade to unlock' // Text for authenticated but no credits
                      : feature.description}
                  </p>
                </div>
              </div>
              <ArrowRight className={`w-6 h-6 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 ${!isFeatureAvailable(feature.id) && isAuthenticated ? 'opacity-50' : ''}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Minimalist Plans Section */}
      {isAuthenticated && (
        <div className="bg-white py-16">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                🏆 Choose Your Perfect Plan
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Unlock full potential with our flexible and affordable AI-powered resume optimization plans.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentService.getPlans()
                .filter(p => ['career_pro_max', 'career_boost_plus', 'pro_resume_kit'].includes(p.id))
                .map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-100' : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          🏆 Most Popular
                        </span>
                      </div>
                    )}
                    <div className="p-6 text-center">
                      <div className={`bg-gradient-to-r ${plan.gradient} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                        {getPlanIcon(plan.icon)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.tag}</p>
                      <div className="text-3xl font-bold text-gray-900 mb-4">₹{plan.price}</div>
                      <ul className="text-left text-sm text-gray-700 space-y-2 mb-6">
                        {plan.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className="flex items-center text-gray-500">
                            <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{plan.features.length - 3} more features...</span>
                          </li>
                        )}
                      </ul>
                      <button
                        onClick={onShowSubscriptionPlans}
                        className="w-full btn-primary py-3"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={onShowSubscriptionPlans}
                className="btn-secondary px-8 py-3"
              >
                View All Plans & Add-ons
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Features Teaser */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="container-responsive text-left">
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
        <div className="container-responsive text-left">
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
                  onClick={() => onPageChange('guided-builder')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Build New Resume
                </button>
                <button
                  onClick={() => onPageChange('optimizer')}
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
