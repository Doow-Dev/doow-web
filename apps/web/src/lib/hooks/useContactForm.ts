"use client";

import { useState } from "react";

import type { ContactFormData } from "@/app/actions/contact";
import { submitContactForm } from "@/app/actions/contact";

export interface UseContactFormOptions {
  onSuccess?: () => void;
}

export interface UseContactFormReturn {
  loading: boolean;
  error: string | null;
  handleSubmit: (data: ContactFormData) => Promise<void>;
}

export function useContactForm({ onSuccess }: UseContactFormOptions = {}): UseContactFormReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: ContactFormData): Promise<void> {
    const { name, email, company, message } = data;

    if (!name.trim() || !email.trim() || !company.trim() || !message.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await submitContactForm(data);

    setLoading(false);

    if (result.ok) {
      onSuccess?.();
    } else {
      setError(result.error);
    }
  }

  return { loading, error, handleSubmit };
}
