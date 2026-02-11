import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-deep-brown mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="font-heading text-4xl font-bold text-espresso mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-warm-gray mb-6">
            <strong>Last Updated:</strong> February 11, 2026
          </p>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              1. Introduction
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              Welcome to Enact AI. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              2. Information We Collect
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you:
            </p>
            <ul className="list-disc list-inside text-warm-gray space-y-2 mb-4">
              <li><strong>Identity Data:</strong> First name, last name, username or similar identifier</li>
              <li><strong>Contact Data:</strong> Email address</li>
              <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform</li>
              <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
              <li><strong>Marketing Data:</strong> Your preferences in receiving marketing from us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your 
              personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-warm-gray space-y-2 mb-4">
              <li>To register you as a new user</li>
              <li>To process and deliver our services</li>
              <li>To manage our relationship with you</li>
              <li>To improve our website, products/services, marketing or customer relationships</li>
              <li>To send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              4. Data Security
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              We have put in place appropriate security measures to prevent your personal data from being 
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, 
              we limit access to your personal data to those employees, agents, contractors and other third 
              parties who have a business need to know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              5. Data Retention
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              We will only retain your personal data for as long as necessary to fulfill the purposes we 
              collected it for, including for the purposes of satisfying any legal, accounting, or reporting 
              requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              6. Your Legal Rights
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your 
              personal data, including the right to:
            </p>
            <ul className="list-disc list-inside text-warm-gray space-y-2 mb-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              7. Third-Party Links
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              This website may include links to third-party websites, plug-ins and applications. Clicking on 
              those links or enabling those connections may allow third parties to collect or share data about 
              you. We do not control these third-party websites and are not responsible for their privacy 
              statements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              8. Contact Us
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="text-warm-gray leading-relaxed">
              <strong>Email:</strong>{" "}
              <a 
                href="mailto:jatin02kr@gmail.com" 
                className="text-coral hover:text-coral/80 transition-colors"
              >
                jatin02kr@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new privacy policy on this page and updating the "Last Updated" date at the top 
              of this privacy policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
