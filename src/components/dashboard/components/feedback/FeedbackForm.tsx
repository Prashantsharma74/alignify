import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FeedbackFormProps {
  onSubmit: (email: string, message: string) => Promise<boolean>;
  isSubmitting: boolean;
}

export const FeedbackForm = ({ onSubmit, isSubmitting }: FeedbackFormProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(email, message);
    if (success) {
      toast.success("Feedback submitted successfully!");
      setEmail("");
      setMessage("");
    } else {
      toast.error("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Feedback"}
      </Button>
    </form>
  );
};