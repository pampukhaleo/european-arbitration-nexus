import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPreview() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-eac-dark mb-6">About European Arbitration Chamber</h2>
            <div className="prose text-gray-600 max-w-none">
              <p className="mb-4">
                The European Arbitration Chamber was founded on the initiative of the European Union with the main goal of unifying and developing international arbitration in Eastern and Western Europe.
              </p>
              <p className="mb-4">
                Professionals with long-term experience in the field of Alternative Dispute Resolution (ADR) and international arbitration from Belgium, France, and Ukraine have teamed up to establish the European Arbitration Chamber.
              </p>
              <p className="mb-6">
                The international nonprofit association European Arbitration Chamber has been registered by the Belgian Ministry of Justice (Direction Générale de la législation, Royaume de Belgique Service Public Fédéral Justice # 6/SN/15.677/S).
              </p>
            </div>
            <Button asChild className="bg-eac-primary hover:bg-eac-primary/90 text-white rounded-full">
              <Link to="/eac/about">More About EAC</Link>
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 -translate-x-4 -translate-y-4 bg-eac-primary/20 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&auto=format&fit=crop&q=80" 
                alt="Business meeting" 
                className="rounded-3xl relative z-10 w-full h-auto shadow-xl" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
