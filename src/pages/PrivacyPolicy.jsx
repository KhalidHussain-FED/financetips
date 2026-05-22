import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Last updated: May 2026</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary">
        <p>Finance Ledger Tips ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you visit <strong>financeledgertips.com</strong>.</p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device information, and IP address — collected automatically via cookies and analytics tools.</li>
          <li><strong>Search Queries:</strong> Search terms entered on our site to improve content relevance.</li>
          <li><strong>Contact Information:</strong> If you contact us via email, we collect your email address and message content.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To operate and improve our website and content.</li>
          <li>To analyze traffic patterns and user behavior using tools like Google Analytics.</li>
          <li>To serve relevant advertisements via Google AdSense.</li>
          <li>To respond to inquiries or support requests.</li>
        </ul>

        <h2>3. Google AdSense & Advertising</h2>
        <p>We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>

        <h2>4. Cookies</h2>
        <p>We use cookies for analytics and advertising purposes. You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>

        <h2>5. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.</p>

        <h2>6. Data Retention</h2>
        <p>We retain usage data for as long as necessary to fulfill the purposes outlined in this policy, typically no longer than 26 months for analytics data.</p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have rights to access, correct, or delete your personal data. Contact us at <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a> to make a request.</p>

        <h2>8. Children's Privacy</h2>
        <p>Our website is not directed to children under 13. We do not knowingly collect personal data from children.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with a revised date.</p>

        <h2>10. Contact Us</h2>
        <p>For questions about this Privacy Policy, contact us at: <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a></p>
      </div>
    </div>
  );
}