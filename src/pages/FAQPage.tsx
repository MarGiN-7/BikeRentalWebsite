import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  useEffect(() => {
    document.title = 'FAQ - Dehradun Bike Rentals';
  }, []);

  const [openSection, setOpenSection] = useState<string | null>('rental');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqSections = {
    rental: {
      title: 'Rental Process',
      questions: [
        {
          q: 'What documents do I need to rent a bike?',
          a: 'You need a valid driving license, government-issued ID (Aadhar/Passport/Voter ID), and a security deposit. For international customers, an international driving permit is required.'
        },
        {
          q: 'How does the security deposit work?',
          a: 'We collect a refundable security deposit of ₹2,000 before the rental. It\'s fully refunded within 3-5 business days after returning the bike in good condition.'
        },
        {
          q: 'Can I book a bike in advance?',
          a: 'Yes, you can book bikes up to 30 days in advance through our website or by calling us. We recommend advance booking during peak tourist seasons.'
        },
        {
          q: 'What is the minimum rental period?',
          a: 'The minimum rental period is 4 hours. We offer hourly, daily, weekly, and monthly rental plans to suit your needs.'
        }
      ]
    },
    payment: {
      title: 'Payments & Pricing',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept credit/debit cards, UPI payments, and cash. Online payments require a valid Indian mobile number for OTP verification.'
        },
        {
          q: 'Are fuel charges included?',
          a: 'No, fuel charges are not included in the rental price. Bikes are provided with a full tank, and you should return them with a full tank.'
        },
        {
          q: 'What is your cancellation policy?',
          a: 'Free cancellation up to 24 hours before pickup. Cancellations within 24 hours incur a 50% charge. No refunds for no-shows.'
        },
        {
          q: 'Are there any additional charges?',
          a: 'Additional charges may apply for late returns, damage repairs, traffic violations, or fuel refilling if not returned with a full tank.'
        }
      ]
    },
    insurance: {
      title: 'Insurance & Safety',
      questions: [
        {
          q: 'What does the insurance cover?',
          a: 'Our insurance covers third-party liability and personal accident protection. It does not cover intentional damage or violations of rental terms.'
        },
        {
          q: 'What happens if the bike breaks down?',
          a: 'We provide 24/7 roadside assistance. Call our emergency number, and we\'ll either repair the bike or provide a replacement.'
        },
        {
          q: 'Are helmets provided?',
          a: 'Yes, we provide DOT-certified helmets for all riders. You can also bring your own helmet if you prefer.'
        },
        {
          q: 'What safety measures do you take?',
          a: 'All bikes undergo regular maintenance checks. We sanitize bikes between rentals and provide basic tools and first-aid kits.'
        }
      ]
    },
    rules: {
      title: 'Rules & Restrictions',
      questions: [
        {
          q: 'Can I take the bike outside Dehradun?',
          a: 'Yes, but you must inform us in advance. Some areas may be restricted due to terrain or permit requirements.'
        },
        {
          q: 'Who can ride the rented bike?',
          a: 'Only the person who signed the rental agreement can ride the bike. Additional riders must be registered and approved.'
        },
        {
          q: 'What happens if I return the bike late?',
          a: 'Late returns incur additional hourly charges. Please inform us if you need to extend your rental period.'
        },
        {
          q: 'Are there mileage restrictions?',
          a: 'No mileage restrictions on standard rentals. However, excessive mileage on long-term rentals may incur additional charges.'
        }
      ]
    }
  };

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
            <HelpCircle size={48} className="text-white mx-auto mb-6" />
            <h1 className="heading-xl text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-primary-100">
              Find answers to common questions about our bike rental service.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(faqSections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setOpenSection(key)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  openSection === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {Object.entries(faqSections).map(([key, section]) => (
              <div
                key={key}
                className={`transition-all duration-300 ${
                  openSection === key ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                
                <div className="divide-y">
                  {section.questions.map((item, index) => (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === `${key}-${index}` ? null : `${key}-${index}`)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <span className="font-semibold text-lg">{item.q}</span>
                        {openQuestion === `${key}-${index}` ? (
                          <ChevronUp className="flex-shrink-0 text-gray-500" />
                        ) : (
                          <ChevronDown className="flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      
                      <div className={`mt-2 text-gray-600 transition-all duration-300 ${
                        openQuestion === `${key}-${index}` ? 'block' : 'hidden'
                      }`}>
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="heading-md mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919259033669" className="btn btn-primary">
                Call Us
              </a>
              <a href="/contact" className="btn btn-outline">
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;