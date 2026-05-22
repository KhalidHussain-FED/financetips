import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold">Terms and Conditions</h1>
          <p className="text-xs text-muted-foreground">Last updated: May 2026</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary">
        <p>Welcome to Finance Ledger Tips. By accessing or using <strong>financeledgertips.com</strong>, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By using this website, you confirm that you are at least 18 years of age and agree to these Terms. If you do not agree, please do not use our website.</p>

        <h2>2. Use of Content</h2>
        <p>All content published on Finance Ledger Tips — including articles, guides, and resources — is provided for <strong>informational and educational purposes only</strong>. You may:</p>
        <ul>
          <li>Read and share articles for personal, non-commercial use.</li>
          <li>Link to our content with proper attribution.</li>
        </ul>
        <p>You may NOT:</p>
        <ul>
          <li>Reproduce, copy, or republish our content without written permission.</li>
          <li>Use our content for commercial purposes without authorization.</li>
          <li>Modify or create derivative works from our content.</li>
        </ul>

        <h2>3. No Financial Advice</h2>
        <p>The content on this website does not constitute professional financial, tax, legal, or accounting advice. Always consult a qualified professional for your specific situation. See our <Link to="/disclaimer">Disclaimer</Link> for full details.</p>

        <h2>4. Intellectual Property</h2>
        <p>All content, logos, and materials on this site are the intellectual property of Finance Ledger Tips unless otherwise stated. Unauthorized use is prohibited.</p>

        <h2>5. Third-Party Links & Advertising</h2>
        <p>Our site may display third-party advertisements (via Google AdSense) and contain links to external websites. We do not endorse and are not responsible for third-party content, products, or services.</p>

        <h2>6. Limitation of Liability</h2>
        <p>Finance Ledger Tips shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any content published here.</p>

        <h2>7. Accuracy of Information</h2>
        <p>We strive to keep content accurate and up-to-date, but we make no warranties about the completeness, reliability, or accuracy of the information. Tax laws and financial regulations change frequently — always verify with current official sources.</p>

        <h2>8. Privacy</h2>
        <p>Your use of this site is also governed by our <Link to="/privacy-policy">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>

        <h2>9. Modifications</h2>
        <p>We reserve the right to modify these Terms at any time. Continued use of the site after changes constitutes acceptance of the updated Terms.</p>

        <h2>10. Governing Law</h2>
        <p>These Terms are governed by applicable law. Any disputes shall be resolved in the appropriate jurisdiction.</p>

        <h2>11. Contact</h2>
        <p>For questions about these Terms, contact: <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a></p>
      </div>
    </div>
  );
}