
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <img 
        src="/lovable-uploads/logo.jpg" 
        alt="European Arbitration Chamber Logo" 
        className="h-12 w-auto" 
        style={{ maxWidth: '100%' }}
      />
    </Link>
  );
}
