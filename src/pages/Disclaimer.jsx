import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold">Disclaimer</h1>
          <p className="text-xs text-muted-foreground">Last updated: May 2026</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg px-5 py-4 mb-8 text-sm text-orange-800 leading-relaxed">
        <strong>Important Notice:</strong> The information provided on Finance Ledger Tips is for general informational and educational purposes only. It does not constitute professional financial, tax, legal, or accounting advice.
      </div>

      <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary">
        <h2>1. Not Professional Advice</h2>
        <p>Nothing on <strong>financeledgertips.com</strong> should be construed as professional financial, tax, accounting, or legal advice. The articles and guides published here are general in nature and may not apply to your individual circumstances.</p>
        <p>Always consult with a qualified professional — such as a Certified Public Accountant (CPA), licensed financial advisor, or attorney — before making financial decisions.</p>

        <h2>2. No Liability</h2>
        <p>Finance Ledger Tips and its authors, contributors, and operators shall not be held liable for any losses, damages, or negative outcomes resulting from actions taken based on the content published on this website.</p>

        <h2>3. Accuracy & Timeliness</h2>
        <p>Tax laws, payroll regulations, and accounting standards change frequently. While we strive to publish accurate, up-to-date information, we cannot guarantee that all content reflects the most current legal or regulatory changes. Always verify with official government sources (e.g., IRS.gov) or a licensed professional.</p>

        <h2>4. Affiliate & Advertising Disclosure</h2>
        <p>This website may display advertisements through Google AdSense and may contain affiliate links. We may earn a commission if you click on a link and make a purchase, at no additional cost to you. Our editorial content is not influenced by advertisers or affiliate partnerships.</p>

        <h2>5. External Links</h2>
        <p>Our website may link to external third-party websites for reference. We do not control, endorse, or take responsibility for the content or privacy practices of those websites.</p>

        <h2>6. Forward-Looking Statements</h2>
        <p>Any projections, estimates, or forward-looking statements in our content are not guarantees of future results. Financial outcomes vary by individual situation.</p>

        <h2>7. Use at Your Own Risk</h2>
        <p>By using this website, you acknowledge and agree that your use of the information provided is entirely at your own risk.</p>

        <h2>Contact</h2>
        <p>If you have questions about this Disclaimer, contact us at <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a>.</p>
      </div>
    </div>
  );
}