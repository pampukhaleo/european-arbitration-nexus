
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

// Sample events data
const events = [
  {
    id: 1,
    title: "Arbitrator Training Program",
    date: "June 15-17, 2023",
    location: "Brussels, Belgium",
    description: "A comprehensive three-day training for aspiring arbitrators covering procedural and substantive aspects of international commercial arbitration.",
    link: "/eac/events/1",
  },
  {
    id: 2,
    title: "Webinar: New Developments in International Arbitration",
    date: "July 8, 2023",
    location: "Online Event",
    description: "Join leading experts for a discussion on recent developments and future trends in international arbitration.",
    link: "/eac/events/2",
  },
  {
    id: 3,
    title: "Art Authentication and Valuation Workshop",
    date: "August 22, 2023",
    location: "Paris, France",
    description: "A specialized workshop on methods and standards for art authentication and valuation for art experts and professionals.",
    link: "/eac/events/3",
  },
];

export default function EventCalendar() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-eac-dark">Upcoming Events</h2>
          <Button asChild variant="ghost" className="text-eac-primary hover:text-eac-primary hover:bg-eac-light">
            <Link to="/eac/events">View Full Calendar</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden border border-gray-200 rounded-2xl hover:shadow-md transition">
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">{event.description}</CardDescription>
                <Button asChild variant="link" className="p-0 text-eac-primary hover:text-eac-primary/80">
                  <Link to={event.link}>Event Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
