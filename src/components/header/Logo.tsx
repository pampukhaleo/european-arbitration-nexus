
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <img 
        src="/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
        alt="European Arbitration Chamber Logo" 
        className="h-12 w-auto" 
        style={{ maxWidth: '100%' }}
      />
    </Link>
  );
}
