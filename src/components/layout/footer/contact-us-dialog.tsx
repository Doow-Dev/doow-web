"use client";

import type { ComponentPropsWithoutRef } from "react";

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
  return (
    <Dialog>
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

        <form className="contact-dialog__form" onSubmit={(event) => event.preventDefault()}>
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

          <Button className="contact-dialog__submit" size="base" type="submit" variant="primary">
            Send message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
