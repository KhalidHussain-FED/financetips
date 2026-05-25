import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle, AlertCircle, Globe, BookOpen } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Simulate form submission (replace with actual API call)
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Us',
      details: 'info@financeledgertips.com',
      description: 'We respond within 24 hours',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Website',
      details: 'financeledgertips.com',
      description: 'Available 24/7 worldwide',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Knowledge Base',
      details: 'Browse our blog & guides',
      description: 'Free educational resources',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFDF4' }}>
      {/* Hero Section */}
      <div className="relative text-white py-14 sm:py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
          alt="Contact us"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,20,40,0.75)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="text-3xl mb-3">📧</div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have a question about accounting, payroll, taxes, or bookkeeping? We'd love to hear from you. 
            Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border-2 p-6 sm:p-8 shadow-lg" style={{ borderColor: '#FFD300' }}>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-green-800">Message Sent Successfully!</div>
                    <p className="text-xs text-green-700 mt-1">
                      Thank you for reaching out. We'll respond to your inquiry shortly.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-red-800">Failed to Send Message</div>
                    <p className="text-xs text-red-700 mt-1">
                      Please try again or email us directly at info@financeledgertips.com
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                    <MessageSquare className="w-4 h-4" />
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 transition-colors bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Accounting Question">Accounting Question</option>
                    <option value="Payroll Help">Payroll Help</option>
                    <option value="Tax Question">Tax Question</option>
                    <option value="Bookkeeping Support">Bookkeeping Support</option>
                    <option value="Financial Planning">Financial Planning</option>
                    <option value="Content Suggestion">Content Suggestion</option>
                    <option value="Feedback">Feedback / Suggestion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                    <MessageSquare className="w-4 h-4" />
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#FFD300', color: '#1a1a1a' }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-4">
            {/* Contact Cards */}
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border-2 p-5 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: '#e5e7eb' }}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-xs font-medium text-slate-700">{item.details}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Response Promise */}
            <div className="rounded-xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-heading text-lg font-bold mb-2" style={{ color: '#FFD300' }}>
                  Quick Response
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-slate-400">Response Time</div>
                  <div className="text-sm font-semibold text-white mt-1">
                    Within 24 Hours
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Monday - Friday
                  </div>
                </div>
              </div>
            </div>

            {/* About Our Content */}
            <div className="bg-white rounded-xl border-2 p-5 shadow-sm" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                Our Content
              </h3>
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>Finance Ledger Tips provides free educational resources on:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-1">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Accounting & Bookkeeping</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Payroll Processing</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Tax Filing & Planning</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Financial Management</span>
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <a 
                    href="/blog" 
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Browse our guides →
                  </a>
                </div>
              </div>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-yellow-50 rounded-xl border-2 p-4" style={{ borderColor: '#FFD300' }}>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Important Note</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We provide educational content only. For specific financial advice, 
                    please consult with a qualified professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl border-2 p-6 sm:p-8 shadow-sm" style={{ borderColor: '#e5e7eb' }}>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mb-8 text-center">
              Quick answers to common questions
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  q: 'What topics do you cover?',
                  a: 'We cover accounting, payroll, taxes, bookkeeping, and financial planning for small businesses and individuals.'
                },
                {
                  q: 'Is your content free?',
                  a: 'Yes! All our educational articles, guides, and resources are completely free to access.'
                },
                {
                  q: 'How often do you publish?',
                  a: 'We publish new articles weekly covering the latest in finance, tax laws, and business tips.'
                },
                {
                  q: 'Can I suggest a topic?',
                  a: 'Absolutely! Use our contact form to suggest topics you\'d like us to cover.'
                },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">{faq.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}