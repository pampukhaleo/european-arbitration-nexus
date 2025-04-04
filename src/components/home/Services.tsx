
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gavel, Lightbulb, Palette, BookOpen } from "lucide-react";

export default function Services() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-eac-dark mb-2">Dispute Resolution & Expertise</h2>
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
                Efficient resolution of commercial disputes by experienced arbitrators. ICAC arbitration procedure is designed to offer a prompt, impartial, and cost-efficient alternative to litigation.              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/arbitration/icac">Learn More</Link>
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
                Expert examinations by qualified specialists to provide accurate and reliable insights. Our expertise ensures thorough analysis and objective opinions to assist in resolving complex technical or specialized disputes.              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/expertise/icje">Learn More</Link>
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
                Expert examination, authentication, and valuation of works of art conducted by experienced professionals. Reliable and accurate assessments for collectors, galleries, and institutions.              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/art-expertise/authentication">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition">
            <CardHeader className="bg-eac-light/50 pb-4">
              <div className="w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">MEMBERSHIP</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-gray-600 text-base mb-6">
                Become a member of the European Arbitration Chamber as an arbitrator, expert, or business partner. We unite specialists from diverse fields across the globe, providing access to valuable opportunities and a global network.              </CardDescription>
              <Button asChild variant="outline" className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white">
                <Link to="/membership/benefits">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
