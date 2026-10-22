export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose prose-neutral dark:prose-invert">
      <h1>Privacy policy</h1>
      <p>
        This is placeholder content for the EcomStore demo. No real personal data is collected
        beyond what you store locally in your browser (cart, login mock state, and preferences).
      </p>
      <h2>Local storage</h2>
      <p>
        Redux Persist saves demo cart, auth, orders, and theme settings in localStorage on your
        device only.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Use the contact page or dashboard support chat (simulated responses).
      </p>
    </div>
  );
}
