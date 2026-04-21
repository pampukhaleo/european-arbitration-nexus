import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="European Arbitration Chamber"
            className="h-10 w-auto"
          />
        </Link>
        <a
          href="tel:+3228087754"
          className="hidden sm:inline-flex items-center text-sm font-medium text-eac-primary hover:underline"
        >
          +32 2 808 77 54
        </a>
      </div>
    </header>
  );
}
