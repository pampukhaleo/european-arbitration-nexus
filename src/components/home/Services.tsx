
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gavel, Lightbulb, Palette, BookOpen } from "lucide-react";

export default function Services() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-eac-dark mb-2">Dispute Resolution Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The European Arbitration Chamber offers comprehensive dispute resolution services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition">
            <CardHeader className="bg-eac-light/50 pb-4">
              <div className="w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">ARBITRATION</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-gray-600 text-base mb-6">
                Efficient resolution of commercial disputes by experienced arbitrators. Our arbitration process is designed to provide a fast, fair, and cost-effective alternative to litigation.
              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/arbitration">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition">
            <CardHeader className="bg-eac-light/50 pb-4">
              <div className="w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">SUBMIT ARBITRATION REQUEST</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-gray-600 text-base mb-6">
                Everything you need to know before initiating arbitration proceedings at the International Commercial Arbitration Court (ICAC). We'll guide you through the process step by step.
              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/arbitration/request">Submit Request</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition">
            <CardHeader className="bg-eac-light/50 pb-4">
              <div className="w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">EXPERTISE</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-gray-600 text-base mb-6">
                Independent expert studies conducted by specialists in various fields. Our experts provide objective analyses and opinions to help resolve complex technical or specialized disputes.
              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/expertise">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition">
            <CardHeader className="bg-eac-light/50 pb-4">
              <div className="w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">ART EXPERTISE</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-gray-600 text-base mb-6">
                Authentication, valuation, and art passport issuance services provided by experienced art professionals. Our art experts use the latest techniques and methods to ensure accurate results.
              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/art-expertise">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
