
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SendIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

// Replace with your actual Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; // You should store this securely
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE"; // You should store this securely

export default function ContactForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Format message for Telegram
      const telegramMessage = `
📨 New Contact Form Submission
        
👤 Name: ${data.name}
📧 Email: ${data.email}
📝 Subject: ${data.subject}
        
✉️ Message:
${data.message}
      `;

      // For security reasons, it's better to use a backend API or serverless function
      // to send the message to Telegram. This is a simplified example.
      const telegramAPI = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(telegramAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: t('contacts.success') || "Message Sent!",
        description: t('contacts.successMessage') || "Your message has been sent successfully. We will get back to you soon.",
      });

      // Reset the form after successful submission
      form.reset();

    } catch (error) {
      console.error("Error sending message:", error);
      
      toast({
        title: t('contacts.error') || "Error",
        description: t('contacts.errorMessage') || "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contacts.name') || "Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contacts.namePlaceholder') || "Your name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contacts.email') || "Email"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contacts.emailPlaceholder') || "your.email@example.com"} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contacts.subject') || "Subject"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contacts.subjectPlaceholder') || "What is this about?"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contacts.message') || "Message"}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t('contacts.messagePlaceholder') || "Your message here..."}
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('contacts.sending') || "Sending..."}
                </>
              ) : (
                <>
                  <SendIcon className="mr-2" size={16} />
                  {t('contacts.send') || "Send Message"}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
