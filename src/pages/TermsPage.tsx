import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions - Dehradun Bike Rentals';
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
            <FileText size={48} className="text-white mx-auto mb-6" />
            <h1 className="heading-xl text-white mb-6">Terms & Conditions</h1>
            <p className="text-lg text-primary-100">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <h2>1. Rental Agreement</h2>
            <p>By renting a bike from Dehradun Bike Rentals, you agree to the following terms:</p>
            <ul>
              <li>You must be at least 18 years old</li>
              <li>Possess a valid driving license</li>
              <li>Provide valid government-issued identification</li>
              <li>Pay the rental fee and security deposit</li>
              <li>Follow all traffic rules and regulations</li>
            </ul>

            <h2>2. Security Deposit</h2>
            <p>A refundable security deposit of ₹2,000 is required for all rentals:</p>
            <ul>
              <li>Fully refundable if the bike is returned in original condition</li>
              <li>May be partially withheld for damages or violations</li>
              <li>Processed within 3-5 business days after return</li>
            </ul>

            <h2>3. Rental Duration & Charges</h2>
            <ul>
              <li>Minimum rental period: 4 hours</li>
              <li>Late returns incur additional charges</li>
              <li>Cancellation policy applies for pre-bookings</li>
              <li>Fuel charges are not included</li>
            </ul>

            <h2>4. Vehicle Usage</h2>
            <p>The rented vehicle must be:</p>
            <ul>
              <li>Used only within designated areas</li>
              <li>Not used for commercial purposes</li>
              <li>Not modified or altered</li>
              <li>Not used for racing or stunts</li>
              <li>Operated by the registered renter only</li>
            </ul>

            <h2>5. Damages & Liability</h2>
            <p>Renters are responsible for:</p>
            <ul>
              <li>Any damage during the rental period</li>
              <li>Traffic violations and fines</li>
              <li>Theft or loss of the vehicle</li>
              <li>Third-party damages</li>
            </ul>

            <h2>6. Insurance Coverage</h2>
            <p>Our rental insurance includes:</p>
            <ul>
              <li>Third-party liability coverage</li>
              <li>Personal accident coverage</li>
              <li>Vehicle damage protection (with deductible)</li>
            </ul>

            <h2>7. Maintenance & Breakdowns</h2>
            <ul>
              <li>24/7 roadside assistance provided</li>
              <li>Regular maintenance is our responsibility</li>
              <li>Report any issues immediately</li>
              <li>Follow provided maintenance guidelines</li>
            </ul>

            <h2>8. Cancellation Policy</h2>
            <ul>
              <li>Free cancellation up to 24 hours before pickup</li>
              <li>50% refund for cancellations within 24 hours</li>
              <li>No refund for no-shows</li>
            </ul>

            <h2>9. Privacy & Data</h2>
            <ul>
              <li>We collect and store rental information</li>
              <li>GPS tracking for safety purposes</li>
              <li>Data handling as per privacy policy</li>
            </ul>

            <h2>10. Termination</h2>
            <p>We reserve the right to:</p>
            <ul>
              <li>Terminate rentals for violations</li>
              <li>Blacklist users for misconduct</li>
              <li>Modify terms with notice</li>
            </ul>

            <h2>11. Governing Law</h2>
            <p>These terms are governed by Indian law. Any disputes will be subject to the exclusive jurisdiction of courts in Dehradun, Uttarakhand.</p>

            <p className="text-sm text-gray-600 mt-8">Last updated: March 15, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;