import { Phone, MessageCircle } from "lucide-react";

export default function StickyContactBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2">
        <a
          href="tel:+3228087754"
          // TODO: pixel — track CTA click (Meta Pixel / GA event)
          className="flex items-center justify-center gap-2 py-3 text-eac-primary font-semibold border-r"
        >
          <Phone className="h-5 w-5" />
          Подзвонити
        </a>
        <a
          href="https://wa.me/3228087754"
          target="_blank"
          rel="noopener noreferrer"
          // TODO: pixel — track CTA click (Meta Pixel / GA event)
          className="flex items-center justify-center gap-2 py-3 text-[#25D366] font-semibold"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
