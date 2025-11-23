import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 pt-28">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold neon-text mb-6"
        >
          About FlowPay
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-300 leading-relaxed mb-10"
        >
          FlowPay is a next-gen on-chain payment solution built for instant mass
          payouts, frictionless gifting, and automated token-based transactions.
          Designed for hackathons, startups, and enterprises, FlowPay lets you
          move value as easily as sending a message.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Mission */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-300">
              To simplify Web3 payments by making them fast, scalable, and
              human-friendly — even for non-technical users.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-300">
              Become the global standard for decentralized payments and
              micro-value transfer across chains.
            </p>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-6 neon-text">Meet the Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Aadit", "DevOps Partner", "UI/UX Partner"].map((member, i) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i }}
                className="glass-card p-6 rounded-xl text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-blue-500 mb-4 shadow-xl" />
                <h3 className="text-xl font-semibold">{member}</h3>
                <p className="text-gray-400 text-sm">
                  Core Contributor • FlowPay Project
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
