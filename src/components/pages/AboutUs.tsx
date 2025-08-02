import React from 'react';
import {
  Users,
  Target,
  Award,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Heart,
  Globe,
  MessageCircle,
  FileText,
  LayoutDashboard
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const stats = [
    {
      number: 'JD-Based',
      label: 'Tailored Resumes + Project Suggestions',
      icon: <Target className="w-6 h-6" />
    },
    {
      number: 'ATS Ready',
      label: 'Instant Score & Fixes',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      number: 'LinkedIn',
      label: 'Personalized Outreach',
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      number: 'India-First',
      label: 'Affordable Career Tooling',
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'JD-Based Resume Optimization',
      description:
        'We analyze the job description and tailor your resume—keywords, phrasing, and suggested project replacements—to maximize perceived fit.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Resume Score Check',
      description:
        'Instant ATS scoring with actionable insights so you know what to fix before submitting.'
    },
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: 'Guided Resume Builder',
      description:
        'Start from scratch with step-by-step AI guidance that ensures professional structure and clarity.'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'LinkedIn Message Generator',
      description:
        'Generate contextual, personalized outreach to recruiters and referrers that complements your application.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'ATS-Friendly Formatting',
      description:
        'Resume formatting tuned to pass modern Applicant Tracking Systems without gimmicks.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Career-Aligned Suggestions',
      description:
        'Receive project and content suggestions based on the role you’re targeting—replace weak items with high-impact ones.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              India’s most affordable <span className="text-yellow-300">JD-driven</span> career accelerator
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-6 leading-relaxed">
              Convert any job description into a tailored resume, outreach, and actionable career moves—without breaking the bank.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-lg font-semibold">JD-Based Optimizations</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-lg font-semibold">ATS Score & Fixes</span>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Optimizing Now
              </button>
              <div className="text-sm bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Founder-led by Rishitha, built for serious job seekers & switchers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story + Mission */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Story</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Too many talented candidates weren’t getting noticed—not because of lack of skill, but because their applications weren’t aligned. PrimoBoost AI was built to change that.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Mission</h3>
                  <p className="text-gray-700">
                    Democratize career success with hyper-personalized, JD-aligned application tools that are affordable and actionable for job seekers across India.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Vision</h3>
                  <p className="text-gray-700">
                    A world where every serious job applicant gets matched to the right opportunity through alignment, not luck—powered by smart AI and real insight.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-2xl shadow-lg border border-blue-100 flex gap-4">
                  <div className="flex-shrink-0">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Founder’s Note</h4>
                    <p className="text-gray-700 italic">
                      “I built PrimoBoost AI because I saw too many talented people losing out with generic resumes and weak outreach. Getting the right job shouldn’t depend on luck—it should depend on alignment and persistence.” — Rishitha, Founder & CEO
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-300" />
                      <span className="text-lg font-medium">India-first pricing & access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-300" />
                      <span className="text-lg font-medium">JD-aligned project replacements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-300" />
                      <span className="text-lg font-medium">Instant resume scoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-300" />
                      <span className="text-lg font-medium">LinkedIn outreach built-in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">What Makes Us Different</h2>
              <p className="text-lg text-gray-600 mx-auto max-w-2xl">
                We don’t do generic. Every application is tailored, scored, and backed by outreach—designed to get you real callbacks. Built for India, priced for reality.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="group">
                  <div className="border rounded-2xl p-8 h-full hover:shadow-xl transition transform hover:scale-102">
                    <div className="mb-4">
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 inline-flex p-3 rounded-full">
                        {f.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Level Up Your Job Search?</h2>
            <p className="text-lg sm:text-xl mb-6">
              Choose a plan that fits your stage—whether you’re a fresher, switcher, or power applicant—and get a JD-aligned resume plus outreach that converts.
            </p>
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Start Your Tailored Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
