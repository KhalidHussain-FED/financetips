import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import BlogLayout from '@/components/blog/BlogLayout';
import Home from '@/pages/Home';
import Blog from '@/pages/Blog';
import BlogPostDetail from '@/pages/BlogPostDetail';
import AdminPosts from '@/pages/admin/AdminPosts';
import PostEditor from '@/pages/admin/PostEditor';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import Disclaimer from '@/pages/Disclaimer';
import AboutUs from '@/pages/AboutUs';
import CategoryPage from '@/pages/CategoryPage';
import TaxCalculators from '@/pages/TaxCalculators';
import ContactUs from '@/pages/ContactUs';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<BlogLayout />}>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Blog Routes - SEO Optimized */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/:slug" element={<BlogPostDetail />} />
        
        {/* Category Pages - SEO Friendly */}
        <Route path="/accounting" element={<CategoryPage />} />
        <Route path="/payroll" element={<CategoryPage />} />
        <Route path="/taxes" element={<CategoryPage />} />
        <Route path="/bookkeeping" element={<CategoryPage />} />
        <Route path="/financial-planning" element={<CategoryPage />} />
        
        {/* Tools */}
        <Route path="/tax-calculators" element={<TaxCalculators />} />
        
        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPosts />} />
        <Route path="/admin/new" element={<PostEditor />} />
        <Route path="/admin/edit/:id" element={<PostEditor />} />
      </Route>
      
      {/* 404 Page */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App