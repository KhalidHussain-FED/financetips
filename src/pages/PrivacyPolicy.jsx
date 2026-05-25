import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
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
        <p>Finance Ledger Tips ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle your personal information when you visit and use <strong>financeledgertips.com</strong> (the "Website"). By using the Website, you agree to the collection and use of information in accordance with this policy.</p>

        <h2>1. Who We Are</h2>
        <p>Finance Ledger Tips is a financial education platform providing accounting insights, bookkeeping guidance, and financial management resources. Our Website is accessible at <strong>financeledgertips.com</strong>.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect information to provide better services to all our users:</p>
        <ul>
          <li><strong>Information You Voluntarily Provide:</strong> When you contact us via email, subscribe to a newsletter, submit a contact form, or comment on our content, we collect the personal information you provide, such as your name, email address, and message content.</li>
          <li><strong>Automatically Collected Information:</strong> When you visit our Website, our servers automatically record information your browser sends. This may include your IP address, browser type and version, pages visited, time and date of visit, time spent on pages, and other diagnostic data.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for various purposes:</p>
        <ul>
          <li>To provide, maintain, and improve our Website and its content.</li>
          <li>To respond to your comments, questions, and requests.</li>
          <li>To send you newsletters, updates, and promotional materials if you have opted in to receive them. You can unsubscribe at any time.</li>
          <li>To monitor the usage of our Website and detect technical issues.</li>
          <li>To protect the security and integrity of our Website.</li>
        </ul>

        <h2>4. Legal Basis for Processing (GDPR)</h2>
        <p>If you are from the European Economic Area (EEA), our legal basis for collecting and using your personal information depends on the specific context in which we collect it:</p>
        <ul>
          <li>You have given us permission to do so.</li>
          <li>Processing is in our legitimate interests and is not overridden by your rights.</li>
          <li>To comply with the law.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
        <p>If you leave a comment, the comment and its metadata are retained indefinitely to recognize and approve follow-up comments automatically.</p>

        <h2>6. Data Sharing and Disclosure</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following situations:</p>
        <ul>
          <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Website, provide the service on our behalf, or assist us in analyzing how our Website is used.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
          <li><strong>Business Transfer:</strong> If we are involved in a merger, acquisition, or asset sale, your personal information may be transferred.</li>
        </ul>

        <h2>7. Security of Data</h2>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

        <h2>8. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
          <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization.</li>
          <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal data.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a>.</p>

        <h2>9. Third-Party Links</h2>
        <p>Our Website may contain links to external sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit, as we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

        <h2>10. Children's Privacy</h2>
        <p>Our Website does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take necessary action.</p>

        <h2>11. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2>12. Contact Information</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: <a href="mailto:info@financeledgertips.com">info@financeledgertips.com</a></li>
          <li>By visiting the contact page on our website: <a href="/contact">financeledgertips.com/contact</a></li>
        </ul>
      </div>
    </div>
  );
}