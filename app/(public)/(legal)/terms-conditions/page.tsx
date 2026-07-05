// app/terms-and-conditions/page.tsx

import PageCover from "@/components/pagesComp/PageCover";
import coverImage from '@/public/assets/background/place.webp';
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <section>
      <PageCover
        title="Terms & Conditions"
        description="Understand the rules and guidelines for using our platform"
        backgroundImage={coverImage}
      />

      <div className="max-w-7xl w-[95%] mx-auto py-10">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lead mb-8">
            Last Updated: <span className="font-semibold">January 2026</span>
          </p>

          {/* Section 1: Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to the Albion Online Guild Management Platform. These Terms & Conditions govern your use of our platform, including all features, tools, and services provided. By accessing or using our platform, you agree to be bound by these terms.
            </p>
            <p className="mt-3">
              If you do not agree with any part of these terms, you must not use our platform. Please read these terms carefully before using our services.
            </p>
          </section>

          {/* Section 2: Account Registration */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Account Registration</h2>
            <h3 className="text-2xl font-semibold mt-6 mb-3">2.1 Eligibility</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 years old to create an account</li>
              <li>You must provide accurate and complete information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">2.2 Account Security</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are solely responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          {/* Section 3: User Responsibilities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">3. User Responsibilities</h2>
            <p className="mb-3">By using our platform, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the rights and privacy of other users</li>
              <li>Not engage in harassment, abuse, or malicious behavior</li>
              <li>Not share or distribute inappropriate or offensive content</li>
              <li>Not use the platform for illegal or unauthorized purposes</li>
              <li>Not attempt to gain unauthorized access to other accounts or systems</li>
            </ul>
          </section>

          {/* Section 4: Guild Management */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. Guild Management</h2>
            <h3 className="text-2xl font-semibold mt-6 mb-3">4.1 Guild Creation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Only registered members can create guild profiles</li>
              <li>Guild names must be appropriate and not infringe on trademarks</li>
              <li>{"Guild leaders are responsible for managing their guild's information"}</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">4.2 Guild Members</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Members must have permission from the guild leader to join</li>
              <li>Guild leaders can remove members at their discretion</li>
              <li>All guild activities must follow platform guidelines</li>
            </ul>
          </section>

          {/* Section 5: Marketplace */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">5. Marketplace</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All trades and transactions are the responsibility of the users</li>
              <li>We do not guarantee the accuracy or validity of listings</li>
              <li>Users must not engage in fraudulent or deceptive trade practices</li>
              <li>We reserve the right to remove suspicious or inappropriate listings</li>
              <li>Disputes between users must be resolved directly between the parties</li>
            </ul>
          </section>

          {/* Section 6: Content Ownership */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Content Ownership</h2>
            <h3 className="text-2xl font-semibold mt-6 mb-3">6.1 User-Generated Content</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain ownership of content you create and share on our platform</li>
              <li>By posting content, you grant us a non-exclusive license to display and distribute it</li>
              <li>You are responsible for ensuring you have the rights to any content you share</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">6.2 Platform Content</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All platform design, logos, and intellectual property are owned by us</li>
              <li>You may not copy, modify, or distribute our content without permission</li>
              <li>Albion Online is a trademark of Sandbox Interactive GmbH</li>
            </ul>
          </section>

          {/* Section 7: Character Builds */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">7. Character Builds</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Builds are shared for educational and entertainment purposes</li>
              <li>We do not guarantee the effectiveness of any builds</li>
              <li>{"Users must not claim others' builds as their own"}</li>
              <li>Inappropriate or misleading builds may be removed</li>
            </ul>
          </section>

          {/* Section 8: Events & Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">8. Events & Activities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Event organizers are responsible for managing their events</li>
              <li>Participants must follow event rules and guidelines</li>
              <li>We are not responsible for events or activities organized by users</li>
              <li>All events must comply with platform guidelines and policies</li>
            </ul>
          </section>

          {/* Section 9: Termination */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at our discretion, without notice, for violations of these Terms & Conditions or any other policies. Reasons for termination include but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Violation of platform rules and guidelines</li>
              <li>Fraudulent or illegal activities</li>
              <li>Harassment or abuse of other users</li>
              <li>Inactivity for an extended period</li>
            </ul>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">10. Limitation of Liability</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{`The platform is provided "as is" without any warranties`}</li>
              <li>We are not liable for any damages arising from your use of the platform</li>
              <li>We do not guarantee the platform will be error-free or uninterrupted</li>
              <li>Your use of the platform is at your own risk</li>
            </ul>
          </section>

          {/* Section 11: Modifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
            <p className="mt-3">
              We will notify users of significant changes via email or platform notifications.
            </p>
          </section>

          {/* Section 12: Governing Law */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">12. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of the jurisdiction in which our platform is operated, without regard to conflict of law principles.
            </p>
          </section>

          {/* Section 13: Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">13. Contact Information</h2>
            <div className="bg-muted/20 p-6 rounded-xl space-y-2">
              <p className="mb-2">
                If you have any questions or concerns about these Terms & Conditions, please contact us:
              </p>
              <p><strong>Email:</strong> <a href="mailto:legal@albionguildplatform.com" className="text-primary hover:underline">legal@albionguildplatform.com</a></p>
              <p><strong>Discord:</strong> <a href="#" className="text-primary hover:underline">Join our Discord</a></p>
              <p><strong>Contact Form:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Us</Link></p>
            </div>
          </section>

          {/* Footer note */}
          <div className="mt-16 pt-8 text-center text-small text-muted-foreground">
            <p>By using our platform, you acknowledge that you have read, understood, and agree to these Terms & Conditions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}