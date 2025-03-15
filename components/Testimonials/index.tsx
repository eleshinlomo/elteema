import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Afonso Ogbebor",
    role: "Happy Customer",
    comment: "This store has the best products! I have never been disappointed with my purchases. Highly recommended!",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Frequent Shopper",
    comment: "The customer service is amazing, and the delivery is always on time. I love shopping here!",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Tunde Bakare",
    role: "Satisfied Buyer",
    comment: "Great quality products at affordable prices. This is my go-to store for all my needs!",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

// Animation variants for Framer Motion
const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const TestimonialsPage = () => {
  return (
    <div className="py-8 bg-gradient-to-br from-purple-100 to-blue-100 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12 font-sans">
          What Our Customers Say
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-2"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={cardVariants}
            >
              <div className="flex items-center space-x-6 mb-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-200"
                  width={64}
                  height={64}
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 font-sans">
                    {testimonial.name}
                  </h2>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-lg leading-relaxed">
                &quot;{testimonial.comment}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;