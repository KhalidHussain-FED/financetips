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
        <p>Welcome to Finance Ledger Tips. By accessing or using <strong>financeledgertips.com</strong>, you agree to be bound by these Terms and Conditions. Please read them carefully before using the Website.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing, browsing, or using this Website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not access or use the Website.</p>
        <p>You represent that you are at least 18 years of age or accessing the Website under the supervision of a parent or legal guardian. The Website is not intended for use by children under 13 years of age.</p>

        <h2>2. Definitions</h2>
        <p>Throughout these Terms and Conditions, the following definitions apply:</p>
        <ul>
          <li><strong>"Website"</strong> refers to financeledgertips.com and all its subdomains, pages, and content.</li>
          <li><strong>"We," "us," "our"</strong> refers to Finance Ledger Tips, its owners, operators, and authorized representatives.</li>
          <li><strong>"User," "you," "your"</strong> refers to any individual or entity accessing or using the Website.</li>
          <li><strong>"Content"</strong> includes all text, articles, graphics, images, videos, tools, calculators, and other materials available on the Website.</li>
        </ul>

        <h2>3. Use of the Website</h2>
        <p>You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the Website in any way that violates applicable federal, state, local, or international laws or regulations.</li>
          <li>Attempt to interfere with, disrupt, or compromise the security or functionality of the Website.</li>
          <li>Use any automated means, including robots, crawlers, or data mining tools, to access or collect data from the Website without our express written permission.</li>
          <li>Transmit any viruses, malware, or harmful code through or to the Website.</li>
          <li>Impersonate or misrepresent your affiliation with any person or entity.</li>
          <li>Engage in any conduct that restricts or inhibits any other user from using or enjoying the Website.</li>
        </ul>

        <h2>4. Intellectual Property Rights</h2>
        <p>All content published on this Website, including but not limited to articles, blog posts, guides, graphics, logos, images, illustrations, and software, is the exclusive intellectual property of Finance Ledger Tips or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.</p>
        <p>You are granted a limited, non-exclusive, non-transferable, revocable license to access and view the Content for personal, non-commercial purposes only. You may:</p>
        <ul>
          <li>Read, view, and share links to our Content on social media platforms with proper attribution.</li>
          <li>Print or download Content for personal reference only.</li>
        </ul>
        <p>You may NOT, without our prior written consent:</p>
        <ul>
          <li>Reproduce, republish, distribute, or redistribute any Content.</li>
          <li>Sell, rent, sublicense, or otherwise commercialize any Content.</li>
          <li>Create derivative works based on our Content.</li>
          <li>Remove any copyright, trademark, or proprietary notices from the Content.</li>
        </ul>

        <h2>5. User-Generated Content</h2>
        <p>If you post comments, submit feedback, or contribute any content to the Website:</p>
        <ul>
          <li>You grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, publish, and display such content.</li>
          <li>You represent that your content does not violate any third-party rights or applicable laws.</li>
          <li>We reserve the right to remove, edit, or decline to publish any user-generated content at our sole discretion.</li>
        </ul>

        <h2>6. No Professional Advice</h2>
        <p>The Content on this Website is provided for general informational and educational purposes only. Nothing on this Website constitutes professional financial, tax, accounting, legal, or investment advice. You should not rely solely on the information provided on this Website when making financial or business decisions.</p>
        <p>Always seek the advice of a qualified professional who is familiar with your individual circumstances. Your reliance on any information on this Website is at your own risk. Please refer to our <Link to="/disclaimer">Disclaimer</Link> for more detailed information.</p>

        <h2>7. Third-Party Links</h2>
        <p>This Website may contain links to third-party websites, resources, or services that are not owned or controlled by us. These links are provided solely for your convenience and reference. We have no control over and assume no responsibility for the content, privacy policies, terms of use, or practices of any third-party websites.</p>
        <p>We do not endorse, warrant, or guarantee any products, services, or information offered by third parties. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused or alleged to be caused by or in connection with your use of any third-party content or websites.</p>

        <h2>8. Accuracy and Updates</h2>
        <p>While we make reasonable efforts to ensure that the Content on this Website is accurate, complete, and current, we do not warrant or guarantee the accuracy, reliability, or timeliness of any information. Financial regulations, tax laws, and accounting standards change frequently and may vary by jurisdiction.</p>
        <p>We reserve the right to modify, update, or remove Content at any time without prior notice. We are under no obligation to update any Content after publication.</p>

        <h2>9. Limitation of Liability</h2>
        <p>To the fullest extent permitted by applicable law, Finance Ledger Tips, its owners, authors, contributors, employees, and affiliates shall not be liable for:</p>
        <ul>
          <li>Any direct, indirect, incidental, special, consequential, or punitive damages.</li>
          <li>Any loss of profits, revenue, data, goodwill, or business opportunities.</li>
          <li>Any personal injury, property damage, or financial loss.</li>
          <li>Any errors, omissions, or inaccuracies in the Content.</li>
          <li>Any decisions made or actions taken based on the Content.</li>
        </ul>
        <p>This limitation applies regardless of whether the alleged liability is based on contract, tort, negligence, strict liability, or any other legal theory, even if we have been advised of the possibility of such damages.</p>

        <h2>10. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless Finance Ledger Tips, its owners, authors, contributors, employees, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:</p>
        <ul>
          <li>Your violation of these Terms and Conditions.</li>
          <li>Your use or misuse of the Website or its Content.</li>
          <li>Your violation of any third-party rights, including intellectual property rights.</li>
        </ul>

        <h2>11. Disclaimer of Warranties</h2>
        <p>The Website and its Content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties, including:</p>
        <ul>
          <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
          <li>Warranties that the Website will be uninterrupted, timely, secure, or error-free.</li>
          <li>Warranties regarding the accuracy, reliability, or completeness of any Content.</li>
        </ul>

        <h2>12. Privacy</h2>
        <p>Your use of the Website is also governed by our <Link to="/privacy-policy">Privacy Policy</Link>, which explains how we collect, use, and protect your personal information. By using this Website, you consent to the practices described in the Privacy Policy, which is incorporated into these Terms by reference.</p>

        <h2>13. Termination</h2>
        <p>We reserve the right to suspend, restrict, or terminate your access to the Website at any time, without notice, for any reason, including but not limited to violation of these Terms and Conditions. Upon termination, all provisions of these Terms that by their nature should survive termination shall continue in effect.</p>

        <h2>14. Modifications to Terms</h2>
        <p>We reserve the right to modify, amend, or replace these Terms and Conditions at any time at our sole discretion. Changes will be effective immediately upon posting to this page. Your continued use of the Website following the posting of revised Terms constitutes your acceptance of the changes. We encourage you to review this page periodically to stay informed of any updates.</p>

        <h2>15. Governing Law and Dispute Resolution</h2>
        <p>These Terms and Conditions shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Website shall be resolved through good-faith negotiation between the parties. If resolution cannot be reached, the dispute shall be resolved exclusively in the courts of competent jurisdiction.</p>

        <h2>16. Severability</h2>
        <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to achieve the intended purpose to the maximum extent permitted by law, and the remaining provisions shall continue in full force and effect.</p>

        <h2>17. Waiver</h2>
        <p>Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. No waiver of any breach of these Terms shall be deemed a waiver of any subsequent breach.</p>

        <h2>18. Entire Agreement</h2>
        <p>These Terms and Conditions, together with our Privacy Policy and Disclaimer, constitute the entire agreement between you and Finance Ledger Tips regarding your use of the Website and supersede all prior agreements and understandings.</p>

        <h2>19. Contact Information</h2>
        <p>If you have any questions, concerns, or comments about these Terms and Conditions, please contact us:</p>
        <ul>
          <li>By email: <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a></li>
          <li>Through our contact page: <a href="/contact">financeledgertips.com/contact</a></li>
        </ul>
        <p>We will make reasonable efforts to respond to your inquiry within a reasonable timeframe.</p>
      </div>
    </div>
  );
}