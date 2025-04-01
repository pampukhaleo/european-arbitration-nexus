
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarIcon } from "lucide-react";

// Sample news data
const news = [
  {
    id: 1,
    title: "European Arbitration Chamber Signs MOU with Asian International Arbitration Centre",
    date: "April 28, 2023",
    excerpt: "The European Arbitration Chamber and the Asian International Arbitration Centre have entered into a memorandum of understanding to promote international arbitration.",
    link: "/eac/news/1",
  },
  {
    id: 2,
    title: "New Arbitration Rules Take Effect from January 2023",
    date: "December 15, 2022",
    excerpt: "The European Arbitration Chamber announces the implementation of new arbitration rules effective from January 1, 2023.",
    link: "/eac/news/2",
  },
  {
    id: 3,
    title: "Annual Conference on International Commercial Arbitration",
    date: "November 5, 2022",
    excerpt: "The EAC hosted its annual conference on international commercial arbitration in Brussels, attended by leading practitioners from across Europe.",
    link: "/eac/news/3",
  },
];

export default function NewsPreview() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-eac-dark">Latest News</h2>
          <Button asChild variant="ghost" className="text-eac-primary hover:text-eac-primary hover:bg-eac-light">
            <Link to="/eac/news">View All News</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-gray-200 rounded-2xl hover:shadow-md transition">
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.date}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">{item.excerpt}</CardDescription>
                <Button asChild variant="link" className="p-0 text-eac-primary hover:text-eac-primary/80">
                  <Link to={item.link}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
