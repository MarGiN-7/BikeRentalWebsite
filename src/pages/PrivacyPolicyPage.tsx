import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - Dehradun Bike Rentals';
  }, []);

  return (
    <div className="pt-20">
      <div className="bg-primary-600 py-16">
        <div className="container-custom">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Shield size={48} className="text-white mx-auto mb-6" />
            <h1 className="heading-xl text-white mb-6">Privacy Policy</h1>
            <p className="text-lg text-primary-100">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Government-issued identification (driving license, Aadhar card, etc.)</li>
              <li>Billing and payment information</li>
              <li>Rental history and preferences</li>
              <li>Location data during bike rentals (for safety and tracking)</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Processing your rental bookings</li>
              <li>Verifying your identity and eligibility to rent</li>
              <li>Communicating about your rentals and our services</li>
              <li>Improving our services and user experience</li>
              <li>Ensuring the safety of our vehicles</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Payment processors for transaction processing</li>
              <li>Insurance providers for coverage verification</li>
              <li>Law enforcement when required by law</li>
              <li>Service providers who assist in our operations</li>
            </ul>

            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information, including:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure storage systems</li>
              <li>Regular security audits</li>
              <li>Limited access to personal information</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve our services</li>
              <li>Provide personalized experiences</li>
            </ul>

            <h2>Contact Us</h2>
            <p>For privacy-related inquiries, contact us at:</p>
            <p>Email: privacy@dehradunbikerentals.com<br />
            Phone: +91 92590 33669<br />
            Address: 123 Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001</p>

            <h2>Updates to Privacy Policy</h2>
            <p>We may update this privacy policy periodically. The latest version will be posted on our website with the effective date.</p>

            <p className="text-sm text-gray-600 mt-8">Last updated: March 15, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;