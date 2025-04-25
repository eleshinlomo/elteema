'use client'
import { ChevronDown, HelpCircle, Truck, CreditCard, ShieldCheck, Mail, Phone, SearchIcon } from 'lucide-react';
import { useState } from 'react';

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      title: "Orders & Shipping",
      icon: <Truck className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "How long does delivery take?",
          answer: "Delivery typically takes 3-5 business days for domestic orders. International orders may take 15-30 business days depending on the destination."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email that you can use to monitor your package's journey."
        },
        {
          question: "What are your shipping options?",
          answer: "We offer standard (3-5 days), expedited (2-3 days), and express (1-2 days) shipping options. International shipping rates and times vary by country."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      icon: <CreditCard className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Moniepoint, Opay and Google Pay."
        },
        {
          question: "Do you offer installment payments?",
          answer: "No. We do not offer installment payments at the moment."
        },
        {
          question: "Why was I charged more than the product price?",
          answer: "Additional charges may include taxes based on your location or shipping fees for expedited delivery options."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be unused, in original packaging with tags attached. Some exclusions apply."
        },
        {
          question: "How do I initiate a return?",
          answer: "Visit our Returns Center in your account dashboard or contact our support team. We'll provide a return label and instructions."
        },
        {
          question: "How long do refunds take to process?",
          answer: "Once we receive your return, refunds are processed within 3-5 business days. It may take additional time for your bank to post the credit."
        }
      ]
    }
  ];

  const popularQuestions = [
    "How do I change or cancel my order?",
    "Do you offer international shipping?",
    "What should I do if my product arrives damaged?",
    "How do I use my discount code?",
    "Where is my order confirmation email?"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-4">
            <HelpCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">How can we help you?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <SearchIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Popular Questions */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularQuestions.map((question, index) => (
              <a 
                key={index} 
                href="#faq-section"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-green-300"
              >
                <p className="text-gray-800 font-medium">{question}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div id="faq-section" className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="flex items-center bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="mr-3">{category.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {category.questions.map((item, index) => (
                  <div key={index} className="px-6 py-4">
                    <button
                      onClick={() => toggleAccordion(categoryIndex * 10 + index)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <span className="text-lg font-medium text-gray-800">{item.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${activeIndex === categoryIndex * 10 + index ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeIndex === categoryIndex * 10 + index && (
                      <div className="mt-3 text-gray-600">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:support@elteema.com" 
              className="flex items-center justify-center bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-800 font-medium"
            >
              <Mail className="w-5 h-5 mr-2 text-green-600" />
              Email Us
            </a>
            <a 
              href="tel:+1234567890" 
              className="flex items-center justify-center bg-green-600 px-6 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-green-700 transition-all text-white font-medium"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;