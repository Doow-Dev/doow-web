"use client";

import type { ComponentPropsWithoutRef, FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useContactForm } from "@/lib/hooks/useContactForm";

export interface ContactUsDialogProps {
  triggerClassName?: string;
  triggerLabel?: string;
}

type ContactInputProps = ComponentPropsWithoutRef<typeof Input> & {
  label: string;
};

function ContactInput({ className, id, label, ...props }: ContactInputProps) {
  return (
    <label className="contact-dialog__field" htmlFor={id}>
      <span className="contact-dialog__label">{label}</span>
      <Input id={id} className={cn("contact-dialog__input", className)} {...props} />
    </label>
  );
}

export function ContactUsDialog({ triggerClassName, triggerLabel = "Contact" }: ContactUsDialogProps) {
  const [open, setOpen] = useState(false);

  const { loading, error, handleSubmit } = useContactForm({
    onSuccess() {
      setOpen(false);
      toast.success("Thanks! Someone from our team will reach out to you shortly.");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    void handleSubmit({
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      company: (formData.get("company") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={cn("site-footer__link site-footer__link-button", triggerClassName)} type="button">
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="contact-dialog" aria-describedby="contact-us-dialog-description" showClose={false}>
        <DialogHeader className="contact-dialog__header">
          <DialogTitle className="contact-dialog__title">Contact Us</DialogTitle>
          <DialogDescription className="contact-dialog__description" id="contact-us-dialog-description">
            Provide your additional details and drop us a message anytime
          </DialogDescription>
        </DialogHeader>

        <form className="contact-dialog__form" onSubmit={onSubmit}>
          <ContactInput autoComplete="name" id="contact-name" label="Name" name="name" placeholder="Enter your name" />
          <ContactInput
            autoComplete="email"
            id="contact-email"
            label="Work Email"
            name="email"
            placeholder="Enter work email"
            type="email"
          />
          <ContactInput
            autoComplete="organization"
            id="contact-company"
            label="Company"
            name="company"
            placeholder="Enter company name"
          />

          <label className="contact-dialog__field" htmlFor="contact-message">
            <span className="contact-dialog__label">
              Comment
            </span>
            <textarea
              className="field-shell field-input contact-dialog__input contact-dialog__textarea"
              id="contact-message"
              name="message"
              placeholder="Enter message"
              rows={4}
            />
          </label>

          {error ? (
            <p className="contact-dialog__error" role="alert">
              {error}
            </p>
          ) : null}

          <Button className="contact-dialog__submit" disabled={loading} size="base" type="submit" variant="primary">
            {loading ? "Sending…" : "Send message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
