'use client'
import { ChevronDown, HelpCircle, Truck, CreditCard, ShieldCheck, Mail, Phone, SearchIcon } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<any>(null);
  const [isMatched, setIsMatched] = useState(false);
  const questionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollToQuestion = (id: string) => {
    const element = questionRefs.current[id];
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Find and open the corresponding accordion
      faqCategories.forEach((cat, catIndex) => {
        cat.questions.forEach((q, qIndex) => {
          if (q.id === id) {
            setActiveIndex(catIndex * 10 + qIndex);
          }
        });
      });
    }
  };

  const faqCategories = [
    {
      title: "Orders & Shipping",
      icon: <Truck className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "How long does delivery take?",
          answer: "Delivery typically takes 3-7 business days for domestic orders. International orders may take 15-30 business days depending on the destination and the store."
        },
        {
          question: "Can I track my order?",
          answer: "Tracking may be possible for some orders depending on the store you are purchasing from."
        },
        {
          question: "What are your shipping options?",
          answer: "Most stores on Elteema offer standard (3-5 days), expedited (2-3 days), and express (1-2 days) shipping options. International shipping rates and times vary by country."
        },
        {
          question:"How do I change or cancel my order?", 
          answer: 'Go to your dashboard and you will see all your orders. You can cancel the selected one.',
          id: 'cancel-order'
        },
        { 
          question: "Do you offer international shipping?", 
          answer: 'Most stores on Elteema offer international shipping. However, you will have to confirm with the store directly.',
          id: 'international-shipping'
        },
        {
          question: "What should I do if my product arrives damaged?", 
          answer: 'You should not accept any product that is damaged or not looking as described. If you reject a delivery, you must raise a dispute within 24hrs.',
          id: 'damaged-product'
        },
        {
          question: "How do I use my discount code?", 
          answer: 'We will post information regarding this once we have a discount code promo',
          id: 'discount-code'
        },
        {
          question: "Where is my order confirmation email?", 
          answer: 'You will get an order confirmation immediately after placing an order. You will also get follow-up emails to show your order status until it has been completed.',
          id: 'confirmation-email'
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
      title: "Email & Contact",
      icon: <CreditCard className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "What is your email?",
          answer: "We advise that you should first reach out to the store before escalating matters to our team. You can message us on support@elteema.com."
        },
      ]
    },
    {
      title: "Selling on Elteema",
      icon: <CreditCard className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "How do I sell on Elteema?",
          answer: "To sell on Elteema, you only need to open an account. All registered users on Elteema will automatically have their own store."
        },
        {
          question: "Who handles delivery?",
          answer: "Every store handles their own deliveries. Plans are on the way to have Elteema community members pick-up orders for deliveries."
        },
        {
          question: "Does Elteema own a store?",
          answer: "No! Elteema is an ecommerce project that provides online platform for anyone to sell their products across Nigeria and globally.",
          id: "elteema-owns-store"
        }
      ]
    },
    {
      title: "Returns & Refunds",
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
      questions: [
        {
          question: "What is your return policy?",
          answer: "Please inspect all delivered product before accepting. Returns are handled by sellers but not Elteema. We can help mitigate disputes with any order."
        },
        {
          question: "How do I initiate a refund?",
          answer: "If you have rejected an item delivered to you or cancelled your pending order, you will need to also cancel the order online and your fund will be refunded within 5-7 business days."
        },
        {
          question: "How long do refunds take to process?",
          answer: "Once we receive your request, refunds are processed within 5-7 business days. It may take additional time for your bank to post the credit."
        }
      ]
    }
  ];

  const popularQuestions = [
    {q: "Does Elteema own a store?", id: "elteema-owns-store"},
    {q:"How do I change or cancel my order?", id: 'cancel-order'},
    {q: "Do you offer international shipping?", id: 'international-shipping'},
    {q: "What should I do if my product arrives damaged?", id: 'damaged-product'},
    {q: "How do I use my discount code?", id: 'discount-code'},
    {q: "Where is my order confirmation email?", id: 'confirmation-email'}
  ];

  const searchForWords = (searchTerm: string) => {
    if (!searchTerm.trim()) return null;
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    const matchingCategory = faqCategories.find(category => {
      if (category.title.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }
      
      return category.questions.some(q => 
        q.question.toLowerCase().includes(lowerCaseSearch) || 
        q.answer.toLowerCase().includes(lowerCaseSearch)
      );
    });
    
    return matchingCategory || null;
  };

  useEffect(() => {
    const matchingCategory: any = searchForWords(question);
    setCategory(matchingCategory);
    setIsMatched(true);
  }, [question]);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
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
          <a href='/'>
            <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
              Continue shopping
            </button>
          </a>
          
          {/* Search Bar */}
          <div className="mt-2 max-w-md mx-auto relative">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <SearchIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      
        {category ? (
          <div className="divide-y divide-gray-100">
            {category?.questions.map((item: any, index: any) => (
              <div 
                key={index} 
                className="px-6 py-4"
                ref={el => {
                  if (item.id) {
                    questionRefs.current[item.id] = el;
                  }
                }}
              >
                <button
                  onClick={() => toggleAccordion(index * 10 + index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span id={item.id} className="text-lg font-medium text-gray-800">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${activeIndex === index * 10 + index ? 'transform rotate-180' : ''}`} />
                </button>
                {activeIndex === index * 10 + index && (
                  <div className="mt-3 text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Popular Questions */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Questions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularQuestions.map((question, index) => (
                  <button 
                    key={index} 
                    onClick={() => scrollToQuestion(question.id)}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-green-300 text-left"
                  >
                    <p className="text-gray-800 font-medium">{question.q}</p>
                  </button>
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
                  
                  <div className="divide-y divide-gray-100 faq-item">
                    {category.questions.map((item, index) => (
                      <div 
                        key={index} 
                        className="px-6 py-4"
                        ref={el => {
                          if (item.id) {
                            questionRefs.current[item.id] = el;
                          }
                        }}
                        id={item.id}
                      >
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
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contactpage" 
              className="flex items-center justify-center bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-800 font-medium"
            >
              <Mail className="w-5 h-5 mr-2 text-green-600" />
              Send us a message
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