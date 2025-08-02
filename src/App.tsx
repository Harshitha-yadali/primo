import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  FileText, PlusCircle, Target, ArrowRight, Sparkles, TrendingUp, Star, Users, Zap, Award, Crown, MessageCircle, Check, Plus, ChevronDown, ChevronUp, Menu, X, Home, Info, BookOpen, Phone, LogIn, LogOut, User, Wallet
} from 'lucide-react';

// --- MOCKED DEPENDENCIES FOR A SELF-CONTAINED EXAMPLE ---
// In a real app, these would come from separate files and services.
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

const paymentService = {
  getUserSubscription: async (userId) => {
    // Mock subscription data for demonstration
    if (userId === 'user-123') {
      return {
        name: 'Pro',
        status: 'active',
        optimizationsUsed: 5,
        optimizationsTotal: 10,
        scoreChecksUsed: 2,
        scoreChecksTotal: 5,
        guidedBuildsUsed: 1,
        guidedBuildsTotal: 3,
        linkedinMessagesUsed: 0,
        linkedinMessagesTotal: 2,
      };
    }
    return null;
  },
};
// --- END MOCKED DEPENDENCIES ---

// =========================================================
// HOMEPAGE COMPONENT
// =========================================================

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
  userSubscription: any;
}

// Ensure HomePage is a named export for consistency
export const HomePage: React.FC<HomePageProps> = ({
  onPageChange,
  isAuthenticated,
  onShowAuth,
  onShowSubscriptionPlans,
  userSubscription
}) => {
  const [showPlanDetails, setShowPlanDetails] = useState(false);

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
    if (!isAuthenticated || !userSubscription) return false;
    
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

  // The corrected handleFeatureClick function for robust flow control
  const handleFeatureClick = (feature: Feature) => {
    if (!feature.requiresAuth) {
      onPageChange(feature.id);
      return;
    }

    if (!isAuthenticated) {
      onShowAuth();
      return;
    }

    if (userSubscription && isFeatureAvailable(feature.id)) {
      onPageChange(feature.id);
      return;
    }

    onShowSubscriptionPlans();
  };

  const features: Feature[] = [
    {
      id: 'optimizer',
      title: 'JD-Based Optimizer',
      description: 'Upload your resume and a job description to get a perfectly tailored resume.',
      icon: <Target className="w-6 h-6" />,
      requiresAuth: true
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

      {/* Main Features Section */}
      <div className="container-responsive py-12 sm:py-16">
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Choose Your Resume Journey
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              className={`card-hover p-6 flex flex-col items-start sm:flex-row sm:items-center justify-between transition-all duration-300 ${feature.requiresAuth && !isAuthenticated ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 rounded-xl p-3 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
                </div>
                <div>
                  <span className="text-lg font-bold text-secondary-900">{feature.title}</span>
                  <p className="text-sm text-secondary-700">{feature.description}</p>
                </div>
              </div>
              <ArrowRight className={`w-6 h-6 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 ${feature.requiresAuth && !isAuthenticated ? 'opacity-50' : ''}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Minimalist Plans Section */}
      {isAuthenticated && (
        <div className="bg-white py-16">
          <div className="container-responsive">
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative inline-block text-left w-full">
                <button
                  onClick={() => setShowPlanDetails(!showPlanDetails)}
                  className="w-full bg-slate-100 text-slate-800 font-semibold py-3 px-6 rounded-xl flex items-center justify-between shadow-sm hover:bg-slate-200 transition-colors"
                >
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
                    {userSubscription ? (
                      <span>
                        Optimizations Left:{' '}
                        <span className="font-bold">
                          {userSubscription.optimizationsTotal - userSubscription.optimizationsUsed}
                        </span>
                      </span>
                    ) : (
                      <span>No Active Plan. Upgrade to use all features.</span>
                    )}
                  </span>
                  {showPlanDetails ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
                </button>
                {showPlanDetails && (
                  <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {userSubscription ? (
                        <>
                          <div className="block px-4 py-2 text-sm text-gray-700">
                            <p className="font-semibold">{userSubscription.name} Plan</p>
                            <p className="text-xs text-gray-500">Details for your current subscription.</p>
                          </div>
                          <hr className="my-1 border-gray-100" />
                          <div className="px-4 py-2 text-sm text-gray-700 space-y-1">
                            <div className="flex justify-between items-center">
                              <span>Optimizations:</span>
                              <span className="font-medium">{userSubscription.optimizationsTotal - userSubscription.optimizationsUsed} / {userSubscription.optimizationsTotal}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Score Checks:</span>
                              <span className="font-medium">{userSubscription.scoreChecksTotal - userSubscription.scoreChecksUsed} / {userSubscription.scoreChecksTotal}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Guided Builds:</span>
                              <span className="font-medium">{userSubscription.guidedBuildsTotal - userSubscription.guidedBuildsUsed} / {userSubscription.guidedBuildsTotal}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>LinkedIn Messages:</span>
                              <span className="font-medium">{userSubscription.linkedinMessagesTotal - userSubscription.linkedinMessagesUsed} / {userSubscription.linkedinMessagesTotal}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="block px-4 py-2 text-sm text-gray-700">
                          You currently don't have an active subscription.
                        </div>
                      )}
                      <div className="p-4 border-t border-gray-100">
                        <button
                          onClick={onShowSubscriptionPlans}
                          className="w-full btn-primary py-2"
                        >
                          {userSubscription ? 'Upgrade Plan' : 'Choose Your Plan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

// =========================================================
// APP COMPONENT
// =========================================================

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const authValue = { isAuthenticated, user, login: () => {}, logout: () => {} };

  const [currentPage, setCurrentPage] = useState('new-home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileManagement, setShowProfileManagement] = useState(false);
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileViewMode, setProfileViewMode] = useState('profile');
  const [userSubscription, setUserSubscription] = useState(null);

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const logoImage = "https://res.cloudinary.com/dlkovvlud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1751536902/a-modern-logo-design-featuring-primoboos_XhhkS8E_Q5iOwxbAXB4CqQ_HnpCsJn4S1yrhb826jmMDw_nmycqj.jpg";

  const handlePageChange = (page) => {
    if (page === 'menu') {
      handleMobileMenuToggle();
    } else if (page === 'profile') {
      handleShowProfile();
      setShowMobileMenu(false);
    } else {
      setCurrentPage(page);
      setShowMobileMenu(false);
    }
  };

  const handleShowAuth = () => {
    setShowAuthModal(true);
    setShowMobileMenu(false);
  };

  const handleShowProfile = (mode = 'profile') => {
    setProfileViewMode(mode);
    setShowProfileManagement(true);
    setShowMobileMenu(false);
  };

  const handleProfileCompleted = () => {
    setShowProfileManagement(false);
    setCurrentPage('new-home');
    setSuccessMessage('Profile updated successfully!');
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
      setSuccessMessage('');
    }, 3000);
  };

  const handleNavigateHome = () => {
    setCurrentPage('new-home');
  };

  const handleShowSubscriptionPlans = () => {
    setShowSubscriptionPlans(true);
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      // Mocking auth state
      setIsAuthenticated(true);
      setUser({ id: 'user-123', name: 'John Doe', email: 'john.doe@example.com' });

      if (isAuthenticated && user) {
        const sub = await paymentService.getUserSubscription(user.id);
        setUserSubscription(sub);
      } else {
        setUserSubscription(null);
      }
    };
    fetchSubscription();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCurrentPage = (isAuthenticatedProp) => {
    switch (currentPage) {
      case 'new-home':
        return <HomePage onPageChange={setCurrentPage} isAuthenticated={isAuthenticatedProp} onShowAuth={handleShowAuth} onShowSubscriptionPlans={handleShowSubscriptionPlans} userSubscription={userSubscription} />;
      case 'guided-builder':
        return <div>Guided Builder Component</div>;
      case 'score-checker':
        return <div>Score Checker Component</div>;
      case 'optimizer':
        return <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"><div>Optimizer Component</div></main>;
      case 'about':
        return <div>About Us Component</div>;
      case 'contact':
        return <div>Contact Component</div>;
      case 'tutorials':
        return <div>Tutorials Component</div>;
      case 'linkedin-generator':
        return <div>LinkedIn Generator Component</div>;
      default:
        // Correctly pass all props in the default case
        return <HomePage onPageChange={setCurrentPage} isAuthenticated={isAuthenticatedProp} onShowAuth={handleShowAuth} onShowSubscriptionPlans={handleShowSubscriptionPlans} userSubscription={userSubscription} />;
    }
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen pb-safe-bottom safe-area">
        <style>
          {`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
          .container-responsive {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .btn-primary {
            @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105;
          }
          .btn-secondary {
            @apply bg-white text-secondary-800 font-bold py-3 px-6 rounded-xl border border-secondary-300 shadow-md transition-all duration-300 hover:bg-secondary-50;
          }
          .card-hover {
            @apply bg-white p-6 rounded-2xl shadow-lg border border-white/50 transition-all duration-300 hover:shadow-xl hover:border-blue-200 transform hover:scale-[1.01] cursor-pointer;
          }
          `}
        </style>
        
        {showSuccessNotification && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down">
            {successMessage}
          </div>
        )}

        {currentPage === 'new-home' ? (
          <>
            <Header onMobileMenuToggle={handleMobileMenuToggle} showMobileMenu={showMobileMenu} onShowProfile={handleShowProfile} />
            {renderCurrentPage(isAuthenticated)}
          </>
        ) : (
          <>
            <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-secondary-200 sticky top-0 z-40">
              <div className="container-responsive">
                <div className="flex items-center justify-between h-14 sm:h-16">
                  <button
                    onClick={() => setCurrentPage('new-home')}
                    className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={logoImage}
                        alt="PrimoBoost AI Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-secondary-900">PrimoBoost AI</h1>
                    </div>
                  </button>

                  <div className="hidden md:block">
                    {/* Navigation would go here in a full app */}
                  </div>

                  <button
                    onClick={handleMobileMenuToggle}
                    className="min-w-touch min-h-touch p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </header>
            {renderCurrentPage(isAuthenticated)}
          </>
        )}

        {showMobileMenu && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileMenu(false)}
            />
            <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl overflow-y-auto safe-area">
              <div className="flex flex-col space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={logoImage}
                        alt="PrimoBoost AI Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold text-secondary-900">PrimoBoost AI</h1>
                  </div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="min-w-touch min-h-touch p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="border-t border-secondary-200 pt-4">
                  <nav className="flex flex-col space-y-4">
                    {[
                      { id: 'new-home', label: 'Home', icon: <Home className="w-5 h-5" /> },
                      { id: 'about', label: 'About Us', icon: <Info className="w-5 h-5" /> },
                      { id: 'tutorials', label: 'Tutorials', icon: <BookOpen className="w-5 h-5" /> },
                      { id: 'contact', label: 'Contact', icon: <Phone className="w-5 h-5" /> },
                      ...(isAuthenticated ? [{ id: 'referral', label: 'Referral', icon: <Wallet className="w-5 h-5" /> }] : []),
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'referral') {
                            handleShowProfile('wallet');
                            setShowMobileMenu(false);
                          } else {
                            setCurrentPage(item.id);
                            setShowMobileMenu(false);
                          }
                        }}
                        className={`flex items-center space-x-3 min-h-touch px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          currentPage === item.id
                            ? 'bg-primary-100 text-primary-700 shadow-md'
                            : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="border-t border-secondary-200 pt-4">
                  <AuthButtons
                    onPageChange={setCurrentPage}
                    onClose={() => setShowMobileMenu(false)}
                    onShowAuth={handleShowAuth}
                    onShowProfile={handleShowProfile}
                  />
                </div>

                <div className="mt-auto pt-4 border-t border-secondary-200">
                  <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4">
                    <p className="text-sm text-secondary-700 mb-2">
                      Need help with your resume?
                    </p>
                    <button
                      onClick={() => {
                        setCurrentPage('new-home');
                        setShowMobileMenu(false);
                      }}
                      className="w-full btn-primary text-sm flex items-center justify-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Optimize Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
}

const AuthButtons = ({ onPageChange, onClose, onShowAuth, onShowProfile }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onShowAuth();
  };

  const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com'
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-secondary-500 mb-3">Account</h3>
      {isAuthenticated ? (
        <div className="space-y-3">
          <div className="flex items-center space-x-3 px-4 py-3 bg-primary-50 rounded-xl">
            <div className="bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
              {mockUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-secondary-900 truncate">{mockUser.name}</p>
              <p className="text-xs text-secondary-500 truncate">{mockUser.email}</p>
            </div>
          </div>
          <button
            onClick={() => onShowProfile('profile')}
            className="w-full flex items-center space-x-3 min-h-touch px-4 py-3 rounded-xl font-medium transition-all duration-200 text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
          >
            <User className="w-5 h-5" />
            <span>Profile Settings</span>
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center space-x-3 min-h-touch px-4 py-3 rounded-xl font-medium transition-all duration-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="w-full flex items-center space-x-3 min-h-touch px-4 py-3 rounded-xl font-medium transition-all duration-200 btn-primary"
          type="button"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      )}
    </div>
  );
};

// Mocked Header and Navigation for a single-file app
const Header = ({ onMobileMenuToggle, showMobileMenu, onShowProfile }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-secondary-200 sticky top-0 z-40">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dlkovvlud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1751536902/a-modern-logo-design-featuring-primoboos_XhhkS8E_Q5iOwxbAXB4CqQ_HnpCsJn4S1yrhb826jmMDw_nmycqj.jpg"
                alt="PrimoBoost AI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-secondary-900">PrimoBoost AI</h1>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Navigation would go here */}
          </div>
          <button
            onClick={onMobileMenuToggle}
            className="min-w-touch min-h-touch p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default App;
