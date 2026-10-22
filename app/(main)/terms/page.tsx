export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose prose-neutral dark:prose-invert">
      <h1>Terms of service</h1>
      <p>
        EcomStore is a demonstration e-commerce front end. Products, prices, checkout, and payments
        are simulated and not binding.
      </p>
      <h2>Mock checkout</h2>
      <p>
        Placing an order does not charge your card or create a real shipment. Orders appear in your
        dashboard for demo purposes only.
      </p>
      <h2>Accounts</h2>
      <p>
        Sign-in accepts any email and password in demo mode. Do not use real credentials you rely on
        elsewhere.
      </p>
    </div>
  );
}
