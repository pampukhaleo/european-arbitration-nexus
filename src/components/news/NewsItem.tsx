
import { useState } from "react";
import { Calendar } from "lucide-react";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface NewsItemProps {
  title: string;
  date: string;
  description: string;
  fullContent?: string;
}

export default function NewsItem({ title, date, description, fullContent }: NewsItemProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Card 
        className="hover:shadow-lg transition-shadow cursor-pointer" 
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="text-xl font-bold text-eac-primary">{title}</CardTitle>
          <div className="flex items-center gap-1 text-eac-gray text-sm mt-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description.substring(0, 150)}...</p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-eac-primary">{title}</DialogTitle>
            <div className="flex items-center gap-1 text-eac-gray text-sm mt-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
          </DialogHeader>
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap">
              {fullContent || description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
