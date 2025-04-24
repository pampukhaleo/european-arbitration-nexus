import { useState } from "react";
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

  const renderAvatar = (size: string) => (
    <div className={`aspect-[3/4] ${size} rounded-lg overflow-hidden bg-transparent`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-contain object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl bg-eac-light text-eac-primary">
          {initials}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 lg:w-1/4 flex justify-center p-4">
            {renderAvatar("w-full max-w-[160px]")}
          </div>

          <div className="flex-1 p-6">
            <h3 className="text-xl font-semibold text-eac-dark">{name}</h3>
            <p className="text-sm text-eac-gray mt-1">{position}</p>
            <p className="text-gray-600 mt-3 line-clamp-3">{description}</p>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] max-w-md sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-eac-primary">
              {name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 items-center">
            {renderAvatar("w-60")}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-eac-dark mb-2">
                {position}
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
