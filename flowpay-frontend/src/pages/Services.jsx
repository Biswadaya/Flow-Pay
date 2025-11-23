export default function Services() {
  return (
    <div className="min-h-screen bg-dark-900 text-text py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Services
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <div className="glass p-6">
          <h3 className="text-2xl font-semibold mb-2 text-brand-purple">
            Batch Payroll
          </h3>
          <p className="text-gray-400">
            Pay multiple team members in a single transaction with reduced fees.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-2xl font-semibold mb-2 text-brand-green">
            Gift Cards
          </h3>
          <p className="text-gray-400">
            Generate crypto gift cards using Stylus-based secure mapping.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-2xl font-semibold mb-2 text-brand-purple">
            Secure Hash Linking
          </h3>
          <p className="text-gray-400">
            Code-based claim system ensures user-specific one-time redemption.
          </p>
        </div>

      </div>
    </div>
  );
}
