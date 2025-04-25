import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Quote, Star, Leaf } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Afonso Ogbebor",
    role: "Happy Customer",
    comment: "This store has transformed my shopping experience! The quality of African products is unmatched and delivery is lightning fast. I'm a customer for life!",
    image: "/images/testimonials/1.jpg", // Replace with actual image URL
    rating: 5
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Frequent Shopper",
    comment: "The customer service is exceptional. They helped me choose perfect gifts for my family back home. Everything arrived in perfect condition!",
    image: "/images/testimonials/2.jpg", // Replace with actual image URL
    rating: 5
  },
  {
    id: 3,
    name: "Tunde Bakare",
    role: "Satisfied Buyer",
    comment: "Finally an e-commerce platform that truly understands African quality standards. The attention to detail in packaging and product selection is remarkable.",
    image: "/images/testimonials/3.jpg", // Replace with actual image URL
    rating: 4
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-green-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <Leaf className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Voices of Satisfaction
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our cherished customers about their experiences with our authentic African marketplace
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="p-8">
                <div className="flex justify-start mb-4">
                  <Quote className="h-8 w-8 text-green-200 rotate-180" />
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {testimonial.comment}
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-green-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-400"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to experience the difference?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for authentic African products
            </p>
            <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-all shadow-md hover:shadow-lg">
              Shop Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;