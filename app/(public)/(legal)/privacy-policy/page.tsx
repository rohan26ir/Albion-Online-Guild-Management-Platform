// app/privacy-policy/page.tsx

import PageCover from "@/components/pagesComp/PageCover";
import coverImage from '@/public/assets/background/place.webp';
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <section>
      <PageCover 
        title="Privacy Policy"
        description="How we collect, use, and protect your data"
        backgroundImage={coverImage}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 ">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lead mb-8">
            Last Updated: <span className="font-semibold">January 2026</span>
          </p>

          <div className="space-y-8">
            {/* Section 1: Introduction */}
            <section>
              <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to the Albion Online Guild Management Platform. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
              <p className="mt-3">
                By using our platform, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our platform.
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section>
              <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-2xl font-semibold mt-6 mb-3">2.1 Personal Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Username, email address, password</li>
                <li><strong>Profile Information:</strong> Display name, avatar, character names, guild affiliation</li>
                <li><strong>Game Data:</strong> Albion Online character information, guild membership, game statistics</li>
                <li><strong>Communication:</strong> Messages, forum posts, comments, and feedback</li>
                <li><strong>Application Data:</strong> Guild applications, recruitment forms, event registrations</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-6 mb-3">2.2 Information Collected Automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                <li><strong>Cookies:</strong> Session data, preferences, analytics</li>
              </ul>
            </section>

            {/* Section 3: How We Use Your Information */}
            <section>
              <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Management:</strong> Create and manage your account, authenticate your identity</li>
                <li><strong>Platform Features:</strong> Enable guild management, marketplace, build sharing, and other core features</li>
                <li><strong>Communication:</strong> Send notifications, updates, and important announcements</li>
                <li><strong>Improvement:</strong> Analyze usage patterns to improve platform performance and user experience</li>
                <li><strong>Security:</strong> Detect and prevent fraud, abuse, and unauthorized access</li>
                <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
              </ul>
            </section>

            {/* Section 4: Data Sharing and Disclosure */}
            <section>
              <h2 className="text-3xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <h3 className="text-2xl font-semibold mt-6 mb-3">4.1 With Your Consent</h3>
              <p>We may share your information with third parties when you have given us explicit consent to do so.</p>

              <h3 className="text-2xl font-semibold mt-6 mb-3">4.2 Service Providers</h3>
              <p className="mb-3">We may share your information with trusted third-party service providers who assist us in operating our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hosting and cloud storage providers</li>
                <li>Analytics and performance monitoring services</li>
                <li>Communication and notification services</li>
                <li>Payment processing services (if applicable)</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-6 mb-3">4.3 Legal Requirements</h3>
              <p>We may disclose your information if required by law or in response to valid legal processes, such as a court order or government request.</p>

              <h3 className="text-2xl font-semibold mt-6 mb-3">4.4 Business Transfers</h3>
              <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</p>
            </section>

            {/* Section 5: Data Security */}
            <section>
              <h2 className="text-3xl font-bold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and authorization mechanisms</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and monitoring</li>
                <li>Staff training on data protection and privacy</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 6: Your Rights */}
            <section>
              <h2 className="text-3xl font-bold mb-4">6. Your Rights and Choices</h2>
              <p className="mb-3">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Restriction:</strong> Limit how we use your data</li>
                <li><strong>Objection:</strong> Object to certain data processing activities</li>
                <li><strong>Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Withdraw Consent:</strong> Withdraw previously given consent</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at <a href="mailto:privacy@albionguildplatform.com" className="text-primary hover:underline">privacy@albionguildplatform.com</a>.
              </p>
            </section>

            {/* Section 7: Data Retention */}
            <section>
              <h2 className="text-3xl font-bold mb-4">7. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="mt-3">
                When we no longer need your data, we will securely delete or anonymize it. If you close your account, we will retain certain data for legal compliance and legitimate business purposes.
              </p>
            </section>

            {/* Section 8: Cookies */}
            <section>
              <h2 className="text-3xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Essential Cookies:</strong> Necessary for platform functionality</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Authentication Cookies:</strong> Keep you logged in</li>
              </ul>
              <p className="mt-3">
                You can control cookies through your browser settings. However, disabling cookies may affect certain features and functionality.
              </p>
            </section>

            {/* Section 9: Third-Party Links */}
            <section>
              <h2 className="text-3xl font-bold mb-4">9. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites, including Albion Online official sites, social media platforms, and other external resources. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Section 10: Children's Privacy */}
            <section>
              <h2 className="text-3xl font-bold mb-4">{"10. Children's Privacy"}</h2>
              <p>
                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            {/* Section 11: International Data Transfers */}
            <section>
              <h2 className="text-3xl font-bold mb-4">11. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data when it is transferred internationally, in compliance with applicable data protection laws.
              </p>
            </section>

            {/* Section 12: Changes to This Policy */}
            <section>
              <h2 className="text-3xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                {`We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`}
              </p>
              <p className="mt-3">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            {/* Section 13: Contact Us */}
            <section className="bg-muted/20 p-6 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> <a href="mailto:privacy@albionguildplatform.com" className="text-primary hover:underline">privacy@albionguildplatform.com</a></p>
                <p><strong>Discord:</strong> <a href="#" className="text-primary hover:underline">Join our Discord</a></p>
                <p><strong>Contact Form:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Us</Link></p>
              </div>
            </section>
          </div>

          {/* Footer note */}
          <div className="mt-16 pt-8 text-center text-small text-muted-foreground">
            <p>By using our platform, you acknowledge that you have read and understand this Privacy Policy.</p>
          </div>


        </div>
      </div>
    </section>
  );
}