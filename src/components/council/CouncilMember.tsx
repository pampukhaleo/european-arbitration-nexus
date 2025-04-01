
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CouncilMemberProps {
  name: string;
  position: string;
  description: string;
  imageSrc?: string;
}

export default function CouncilMember({ name, position, description, imageSrc }: CouncilMemberProps) {
  const [open, setOpen] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <div 
        className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
        onClick={() => setOpen(true)}
      >
        <Avatar className="w-32 h-32 mb-4">
          {imageSrc ? (
            <AvatarImage src={imageSrc} alt={name} />
          ) : (
            <AvatarFallback className="text-3xl bg-eac-light text-eac-primary">{initials}</AvatarFallback>
          )}
        </Avatar>
        <h3 className="text-xl font-semibold text-eac-dark">{name}</h3>
        <p className="text-sm text-eac-gray text-center mt-1">{position}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-eac-primary">{name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-40 h-40 rounded-lg">
              {imageSrc ? (
                <AvatarImage src={imageSrc} alt={name} className="rounded-lg" />
              ) : (
                <AvatarFallback className="text-4xl rounded-lg bg-eac-light text-eac-primary">{initials}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-eac-dark mb-2">{position}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
