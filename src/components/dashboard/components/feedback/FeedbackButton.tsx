import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquarePlus } from "lucide-react";
import { FeedbackForm } from "./FeedbackForm";

export const FeedbackButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (email: string, message: string): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.alignify.net/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error sending feedback:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="feedback-button fixed h-12 w-12 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700"
        >
          <MessageSquarePlus className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            Help us improve Alignify by sharing your thoughts and suggestions.
          </DialogDescription>
        </DialogHeader>
        <FeedbackForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
};