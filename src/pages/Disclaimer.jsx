import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
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
        <strong>Important Notice:</strong> The information provided on Finance Ledger Tips is for general informational and educational purposes only. It does not constitute professional financial, tax, legal, or accounting advice. Always seek the advice of a qualified professional regarding your specific situation.
      </div>

      <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary">
        <h2>1. General Information Purpose Only</h2>
        <p>
          The content published on <strong>financeledgertips.com</strong> ("the Website") is intended solely for general informational and educational purposes. Finance Ledger Tips is not a licensed financial institution, accounting firm, tax preparation service, or law firm. The articles, guides, tutorials, and other materials provided on this Website do not, and are not intended to, constitute professional advice of any kind.
        </p>
        <p>
          Readers should not act or refrain from acting based on any information found on this Website without first seeking appropriate professional advice from a qualified expert who is familiar with your particular circumstances and applicable laws in your jurisdiction.
        </p>

        <h2>2. No Professional-Client Relationship</h2>
        <p>
          Your use of this Website, including reading content, submitting inquiries, leaving comments, or subscribing to newsletters, does not create a professional-client relationship between you and Finance Ledger Tips or any of its authors, contributors, or operators. No fiduciary duty or obligation of confidentiality arises from your access to or use of this Website.
        </p>

        <h2>3. Financial and Investment Disclaimer</h2>
        <p>
          Any financial, investment, or trading information provided on this Website is for educational purposes only and should not be considered as investment advice, recommendation, or solicitation to buy or sell any financial instruments. Past performance is not indicative of future results. All investments carry risk, including the potential loss of principal. You should conduct your own research and consult with a licensed financial advisor before making any investment decisions.
        </p>

        <h2>4. Tax and Accounting Disclaimer</h2>
        <p>
          Tax laws, accounting standards, payroll regulations, and financial reporting requirements vary by jurisdiction and change frequently. While we strive to provide accurate and current information, we make no representations or warranties regarding the accuracy, completeness, or timeliness of any tax or accounting content. You should consult with a Certified Public Accountant (CPA), enrolled agent, or qualified tax professional for advice specific to your tax situation. Always verify current regulations with official government sources such as the Internal Revenue Service (IRS) at <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer">IRS.gov</a> or your local tax authority.
        </p>

        <h2>5. No Guarantee of Results</h2>
        <p>
          Any case studies, examples, testimonials, or hypothetical scenarios presented on this Website are for illustrative purposes only. Results achieved by others applying techniques or strategies discussed on this Website do not guarantee that you will achieve similar results. Financial outcomes depend on numerous factors including individual effort, market conditions, economic factors, and specific circumstances beyond our control.
        </p>

        <h2>6. Accuracy and Completeness</h2>
        <p>
          We make reasonable efforts to ensure that the information on this Website is accurate and up to date. However, we do not warrant or guarantee the accuracy, reliability, completeness, or currency of any information. The content may contain errors, omissions, or inaccuracies. We expressly disclaim any duty or obligation to update any content after publication.
        </p>

        <h2>7. Third-Party Content and Links</h2>
        <p>
          This Website may contain links to external websites, third-party resources, advertisements, or sponsored content. Finance Ledger Tips does not control, endorse, sponsor, or approve any third-party content, products, services, or websites accessible through links on this Website. We are not responsible for the content, accuracy, privacy practices, or opinions expressed on any third-party websites. Accessing third-party links is at your own risk.
        </p>

        <h2>8. Affiliate Links and Advertising Disclosure</h2>
        <p>
          Finance Ledger Tips may participate in affiliate marketing programs and may display advertisements through third-party ad networks. This means we may earn commissions or fees when you click on certain links or make purchases through affiliate links, at no additional cost to you. We only recommend products or services that we believe may provide value to our readers. However, our editorial content is independent and not influenced by advertising or affiliate partnerships. Any compensation received does not affect the topics, content, or opinions expressed on this Website.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Finance Ledger Tips, its owners, authors, contributors, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to financial loss, lost profits, lost data, business interruption, or personal injury arising out of or in connection with:
        </p>
        <ul>
          <li>Your use of or reliance on any information provided on this Website.</li>
          <li>Any errors, omissions, or inaccuracies in the content.</li>
          <li>Any decisions or actions taken based on the content of this Website.</li>
          <li>Any technical issues, interruptions, or unavailability of the Website.</li>
        </ul>

        <h2>10. No Warranties</h2>
        <p>
          This Website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Finance Ledger Tips expressly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p>
          We do not warrant that the Website will be uninterrupted, secure, error-free, or free of viruses or other harmful components. You are responsible for implementing sufficient procedures and safeguards to satisfy your particular requirements for data backup and security.
        </p>

        <h2>11. Forward-Looking Statements</h2>
        <p>
          Content on this Website may contain forward-looking statements, projections, forecasts, or estimates regarding future events, financial trends, or economic conditions. These statements are based on current expectations and assumptions and are subject to risks, uncertainties, and other factors that could cause actual results to differ materially. We undertake no obligation to update any forward-looking statements.
        </p>

        <h2>12. User Responsibility</h2>
        <p>
          By accessing and using this Website, you acknowledge and agree that:
        </p>
        <ul>
          <li>You are solely responsible for evaluating the accuracy, completeness, and usefulness of all content.</li>
          <li>Your use of any information or materials on this Website is entirely at your own risk.</li>
          <li>You should independently verify any information before relying on it.</li>
          <li>You will seek professional advice tailored to your specific circumstances before making financial, tax, legal, or business decisions.</li>
        </ul>

        <h2>13. Intellectual Property</h2>
        <p>
          All content, including articles, graphics, logos, and other materials on this Website, is the property of Finance Ledger Tips unless otherwise stated. Unauthorized reproduction, distribution, or republication of any content without prior written consent is prohibited. Fair use quotations are permitted with appropriate attribution and a link back to the original source.
        </p>

        <h2>14. Changes to This Disclaimer</h2>
        <p>
          We reserve the right to modify, update, or change this Disclaimer at any time without prior notice. Changes will be effective immediately upon posting to this page. Your continued use of the Website after any modifications constitutes your acceptance of the revised Disclaimer. We encourage you to review this page periodically.
        </p>

        <h2>15. Governing Law</h2>
        <p>
          This Disclaimer shall be governed by and construed in accordance with the laws of the jurisdiction in which Finance Ledger Tips operates, without regard to its conflict of law provisions. Any disputes arising from or relating to this Disclaimer or your use of the Website shall be resolved exclusively in the courts of that jurisdiction.
        </p>

        <h2>16. Severability</h2>
        <p>
          If any provision of this Disclaimer is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
        </p>

        <h2>17. Contact Information</h2>
        <p>
          If you have any questions, concerns, or comments about this Disclaimer, or if you need to report any errors or inaccuracies in our content, please contact us:
        </p>
        <ul>
          <li>By email: <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a></li>
          <li>Through our contact page: <a href="/contact">financeledgertips.com/contact</a></li>
        </ul>
        <p>
          We will make reasonable efforts to address your concerns in a timely manner.
        </p>
      </div>
    </div>
  );
}