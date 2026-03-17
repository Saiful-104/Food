import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="py-20">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title text-center mb-8">Privacy Policy</h1>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mb-12">
            Last updated: March 15, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Welcome to FoodExpress. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have 
                grouped together as follows:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                <li><span className="font-medium">Identity Data:</span> includes first name, last name, username or similar identifier.</li>
                <li><span className="font-medium">Contact Data:</span> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><span className="font-medium">Financial Data:</span> includes payment card details.</li>
                <li><span className="font-medium">Transaction Data:</span> includes details about payments to and from you and other details of products you have purchased from us.</li>
                <li><span className="font-medium">Technical Data:</span> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your 
                personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                <li>To register you as a new customer</li>
                <li>To process and deliver your order</li>
                <li>To manage our relationship with you</li>
                <li>To improve our website, products and services</li>
                <li>To recommend products or services which may be of interest to you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being 
                accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, 
                we limit access to your personal data to those employees, agents, contractors and other third 
                parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Legal Rights</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your 
                personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <p className="font-medium">FoodExpress</p>
                <p>123 Food Street</p>
                <p>New York, NY 10001</p>
                <p>Email: privacy@foodexpress.com</p>
                <p>Phone: +1 (234) 567-890</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;