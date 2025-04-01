
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative bg-eac-primary">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            European Arbitration Chamber
          </h1>
          <p className="mt-6 text-xl text-white/90">
            An international institution for commercial dispute resolution founded on the initiative of the European Union
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button 
              asChild 
              className="bg-white text-eac-primary hover:bg-gray-100 rounded-full"
            >
              <Link to="/arbitration/request">
                Submit Arbitration Request
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-full"
            >
              <Link to="/eac/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
