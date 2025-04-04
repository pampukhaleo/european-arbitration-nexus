
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Cookie, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Show the consent popup after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <Sheet open={showConsent} onOpenChange={setShowConsent}>
      <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-lg">
        <SheetHeader className="flex-row items-center gap-4">
          <Cookie className="h-6 w-6 text-eac-dark" />
          <SheetTitle>Cookie Consent</SheetTitle>
        </SheetHeader>
        <SheetDescription className="py-4">
          This website uses cookies to ensure you get the best experience on our website. 
          By continuing to use this site, you consent to our use of cookies.
        </SheetDescription>
        <div className="flex items-center gap-2 py-2">
          <Info className="h-4 w-4 text-eac-dark" />
          <span className="text-sm">
            Learn more in our{" "}
            <Link 
              to="/cookies" 
              className="text-blue-600 hover:underline font-medium"
              onClick={() => setShowConsent(false)}
            >
              Cookies Policy
            </Link>
          </span>
        </div>
        <SheetFooter className="mt-4 sm:justify-start gap-4">
          <Button onClick={acceptCookies} className="bg-eac-blue hover:bg-eac-blue/90">
            Accept All Cookies
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowConsent(false)}
            className="border-eac-dark text-eac-dark hover:bg-gray-100"
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CookieConsent;
