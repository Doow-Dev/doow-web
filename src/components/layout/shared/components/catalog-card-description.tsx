"use client";

import { useEffect, useRef, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface CatalogCardDescriptionProps {
  className: string;
  description: string;
}

function isElementClipped(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1;
}

export function CatalogCardDescription({ className, description }: CatalogCardDescriptionProps) {
  const descriptionRef = useRef<HTMLSpanElement>(null);
  const [isClipped, setIsClipped] = useState(false);
  const descriptionElement = (
    <span className={className} ref={descriptionRef}>
      {description}
    </span>
  );

  useEffect(() => {
    const descriptionNode = descriptionRef.current;

    if (!descriptionNode) {
      return;
    }

    function updateClippedState() {
      if (descriptionRef.current) {
        setIsClipped(isElementClipped(descriptionRef.current));
      }
    }

    updateClippedState();

    const resizeObserver = new ResizeObserver(updateClippedState);

    resizeObserver.observe(descriptionNode);

    return () => {
      resizeObserver.disconnect();
    };
  }, [description]);

  if (!isClipped) {
    return descriptionElement;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{descriptionElement}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
