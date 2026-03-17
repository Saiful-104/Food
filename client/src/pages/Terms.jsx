import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="py-20">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title text-center mb-8">Terms & Conditions</h1>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mb-12">
            Last updated: March 15, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                By accessing or using the FoodExpress service, you agree to be bound by these Terms. If you 
                disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                FoodExpress provides an online platform that connects users with local restaurants for food 
                delivery and pickup. We act as an intermediary between you and the restaurants, facilitating 
                the ordering and delivery process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Accounts</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding the password and for all activities under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Orders and Payment</h2>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>Prices are displayed in USD and include applicable taxes</li>
                <li>Payment must be made at the time of ordering</li>
                <li>We accept major credit cards, debit cards, and digital wallets</li>
                <li>Delivery fees are calculated based on distance and restaurant policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cancellations and Refunds</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                You may cancel an order within 5 minutes of placing it for a full refund. After that, the 
                restaurant may have already started preparing your order. Refunds are processed within 5-7 
                business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Delivery</h2>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                <li>Estimated delivery times are provided by restaurants and are not guaranteed</li>
                <li>We are not responsible for delays caused by weather, traffic, or other factors</li>
                <li>You must provide accurate delivery address and contact information</li>
                <li>Failed delivery attempts may result in additional fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                <li>Use the service for any illegal purpose</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                To the maximum extent permitted by law, FoodExpress shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material 
                changes via email or through the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <p className="font-medium">FoodExpress Legal Department</p>
                <p>123 Food Street</p>
                <p>New York, NY 10001</p>
                <p>Email: legal@foodexpress.com</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;